// controllers/dictationController.js
// Bộ trích xuất phụ đề YouTube tự động (InnerTube API) & phân tích câu học thuật cho Xưởng Chép Chính Tả (/dictation)

const { getLiveApiKey } = require('./ankiAiController');
let YoutubeTranscriptModule = null;
try {
  YoutubeTranscriptModule = require('youtube-transcript').YoutubeTranscript;
} catch (e) {
  console.warn('[Dictation] youtube-transcript package not available, using InnerTube fallback.');
}

let curatedVault = {};
try {
  curatedVault = require('./curatedDictationVault');
} catch (e) {
  console.warn('[Dictation] curatedDictationVault not loaded:', e.message);
}

// Hỗ trợ cấu hình Residential Proxy qua biến môi trường YOUTUBE_PROXY (cho môi trường Render/Cloud)
let UndiciProxyAgent = null;
let undiciFetchFn = null;
try {
  const undici = require('undici');
  UndiciProxyAgent = undici.ProxyAgent;
  undiciFetchFn = undici.fetch;
} catch (e) {
  console.warn('[Dictation] undici package not available for proxy agent.');
}

function getYoutubeProxyUrl() {
  const raw = process.env.YOUTUBE_PROXY || process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
  if (!raw || typeof raw !== 'string') return null;
  // Tự động gỡ bỏ dấu nháy đơn hoặc nháy kép nếu người dùng nhập '...' hoặc "..." trên Render
  const clean = raw.replace(/^['"]|['"]$/g, '').trim().replace(/\/$/, '');
  return clean || null;
}

function getProxyDispatcher() {
  const proxyUrl = getYoutubeProxyUrl();
  if (!proxyUrl || !UndiciProxyAgent) return null;
  try {
    return new UndiciProxyAgent(proxyUrl);
  } catch (err) {
    console.warn('[Dictation] Error creating ProxyAgent:', err.message);
    return null;
  }
}

async function proxyFetch(url, options = {}) {
  const dispatcher = getProxyDispatcher();
  if (dispatcher && undiciFetchFn) {
    try {
      return await undiciFetchFn(url, { ...options, dispatcher });
    } catch (err) {
      console.warn('[Dictation] Proxy request failed, falling back to direct fetch:', err.message);
    }
  }
  return fetch(url, options);
}

// Giải mã các ký tự HTML entities trong phụ đề YouTube (hỗ trợ cả double-escaped entities)
function decodeHtmlEntities(str = '') {
  let decoded = str;
  for (let pass = 0; pass < 2; pass++) {
    decoded = decoded
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
  }
  return decoded.replace(/\s+/g, ' ').trim();
}

// Gom các mảnh caption rời rạc của YouTube thành từng câu hoàn chỉnh có start, end khớp chính xác với giọng đọc
function mergeCaptionsIntoSentences(rawSegments) {
  if (!Array.isArray(rawSegments) || rawSegments.length === 0) return [];

  // Chuẩn hóa và chặn tràn thời gian (overlap) sang câu kế tiếp
  const cleanedSegments = [];
  for (let i = 0; i < rawSegments.length; i++) {
    const seg = rawSegments[i];
    let cleanText = decodeHtmlEntities(seg.text || '')
      .replace(/\[.*?\]/g, '') // Bỏ [Music], [Applause]
      .replace(/\((?:Laughter|Applause|Music|Cheering|Sighs|inaudible)[^)]*\)/gi, '')
      .replace(/♪/g, '');

    // Loại bỏ các đoạn tín chỉ dịch thuật / kiểm duyệt ở đầu video YouTube (Transcriber, Reviewer)
    if (/^(?:Transcriber|Reviewer|Translated by|Subtitles by|Captions by)/i.test(cleanText)) {
      cleanText = cleanText
        .replace(/(?:Transcriber|Reviewer|Translated by|Subtitles by|Captions by):?[^\n\r]+/gi, '')
        .trim();
    }

    cleanText = cleanText.trim();
    if (!cleanText) continue;

    const start = Number(seg.start);
    const rawEnd = start + Number(seg.dur || 2.5);
    const nextSeg = rawSegments[i + 1];
    const clampedEnd =
      nextSeg && Number(nextSeg.start) > start
        ? Math.min(rawEnd, Number(nextSeg.start))
        : rawEnd;

    cleanedSegments.push({
      start: Number(start.toFixed(2)),
      end: Number(Math.max(clampedEnd, start + 0.8).toFixed(2)),
      text: cleanText,
    });
  }

  const sentences = [];
  let currentText = '';
  let currentStart = null;
  let currentEnd = null;

  for (let i = 0; i < cleanedSegments.length; i++) {
    const seg = cleanedSegments[i];

    if (currentStart === null) {
      currentStart = seg.start;
    }
    currentEnd = seg.end;
    currentText = currentText ? `${currentText} ${seg.text}` : seg.text;

    const wordCount = currentText.split(/\s+/).length;
    const endsWithSentencePunct = /[.?!]["']?$/.test(seg.text);
    const endsWithClausePunct = /[,;:—–-]["']?$/.test(seg.text);
    const duration = currentEnd - currentStart;

    // Ưu tiên ngắt đúng dấu kết câu (. ? !) khi câu đủ dài (>= 12 từ và >= 5.5 giây),
    // hoặc ngắt tại dấu phẩy khi câu đã dài (>= 22 từ), hoặc ngắt cưỡng bức khi >= 28 từ / 15 giây
    if (
      (endsWithSentencePunct && wordCount >= 12 && duration >= 5.5) ||
      (endsWithClausePunct && wordCount >= 22) ||
      wordCount >= 28 ||
      duration >= 15
    ) {
      sentences.push({
        id: sentences.length + 1,
        start: Number(currentStart.toFixed(1)),
        end: Number(Math.max(currentEnd, currentStart + 1.5).toFixed(1)),
        text: currentText.replace(/\s+/g, ' ').trim(),
      });
      currentText = '';
      currentStart = null;
      currentEnd = null;
    }
  }

  if (currentText && currentStart !== null) {
    sentences.push({
      id: sentences.length + 1,
      start: Number(currentStart.toFixed(1)),
      end: Number(Math.max(currentEnd || currentStart + 2.5, currentStart + 1.5).toFixed(1)),
      text: currentText.replace(/\s+/g, ' ').trim(),
    });
  }

  // Hỗ trợ tối đa 40 đoạn câu dài cho mỗi bài luyện (bao phủ trọn vẹn video 4-6 phút)
  return sentences.slice(0, 40);
}

// Bóc tách XML timedtext (Hỗ trợ cả format="3" <p t="ms" d="ms"> và format="1" <text start="s" dur="s">)
function parseYoutubeCaptionXml(xml = '') {
  if (!xml || !xml.trim()) return [];
  const rawSegments = [];

  // Format 3: <p t="7315" d="5881">...</p>
  const pRegex = /<p\s+[^>]*?\bt="(\d+)"[^>]*?\bd="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = pRegex.exec(xml)) !== null) {
    const startSec = Number(m[1]) / 1000;
    const durSec = Number(m[2]) / 1000;
    const innerText = m[3].replace(/<[^>]+>/g, '');
    if (innerText.trim()) {
      rawSegments.push({
        start: startSec,
        dur: durSec,
        text: innerText,
      });
    }
  }

  if (rawSegments.length > 0) {
    return rawSegments;
  }

  // Format 1: <text start="7.315" dur="5.881">...</text>
  const textRegex = /<text\s+[^>]*?\bstart="([\d.]+)"[^>]*?\bdur="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g;
  while ((m = textRegex.exec(xml)) !== null) {
    const startSec = parseFloat(m[1]);
    const durSec = parseFloat(m[2]);
    const innerText = m[3].replace(/<[^>]+>/g, '');
    if (innerText.trim()) {
      rawSegments.push({
        start: startSec,
        dur: durSec,
        text: innerText,
      });
    }
  }

  return rawSegments;
}

// Lấy phụ đề tiếng Anh & thông tin video trực tiếp qua YouTube InnerTube Player API (ANDROID / IOS client)
async function fetchYoutubeCaptionsAndDetails(videoId) {
  const innertubeClients = [
    {
      clientName: 'ANDROID',
      clientVersion: '20.10.38',
      userAgent: 'com.google.android.youtube/20.10.38 (Linux; U; Android 14) gzip',
    },
    {
      clientName: 'IOS',
      clientVersion: '20.10.4',
      userAgent: 'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 17_5_1 like Mac OS X;)',
    },
  ];

  let videoDetails = null;

  for (const client of innertubeClients) {
    try {
      const playerRes = await proxyFetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': client.userAgent,
          'Accept-Language': 'en-US,en;q=0.9',
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: client.clientName,
              clientVersion: client.clientVersion,
              hl: 'en',
              gl: 'US',
            },
          },
          videoId,
        }),
      });

      if (!playerRes.ok) continue;
      const data = await playerRes.json();

      if (data?.videoDetails && !videoDetails) {
        videoDetails = {
          title: data.videoDetails.title,
          channel: data.videoDetails.author,
          lengthSeconds: Number(data.videoDetails.lengthSeconds || 0),
        };
      }

      const tracks = data?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
      if (!Array.isArray(tracks) || tracks.length === 0) continue;

      // Ưu tiên phụ đề tiếng Anh chuẩn (manual) trước, sau đó tới tiếng Anh tự động (asr)
      const enTrack =
        tracks.find((t) => t.languageCode?.startsWith('en') && t.kind !== 'asr') ||
        tracks.find((t) => t.languageCode?.startsWith('en')) ||
        tracks[0];

      if (!enTrack || !enTrack.baseUrl) continue;

      const xmlRes = await proxyFetch(enTrack.baseUrl, {
        headers: {
          'User-Agent': client.userAgent,
        },
      });

      if (xmlRes.ok) {
        const xml = await xmlRes.text();
        const rawSegments = parseYoutubeCaptionXml(xml);
        const merged = mergeCaptionsIntoSentences(rawSegments);
        if (merged.length >= 2) {
          return {
            sentences: merged,
            videoDetails,
            trackType: enTrack.kind === 'asr' ? 'youtube_auto_captions' : 'youtube_official_captions',
          };
        }
      }
    } catch (err) {
      console.warn(`[Dictation] InnerTube (${client.clientName}) warning:`, err.message);
    }
  }

  return { sentences: null, videoDetails, trackType: null };
}

// Lấy thông tin Tiêu đề & Kênh từ YouTube oEmbed (Fallback)
async function fetchYoutubeMetadata(videoId) {
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const res = await proxyFetch(oembedUrl);
    if (res.ok) {
      const data = await res.json();
      return {
        title: data.title || `YouTube Academic Video (${videoId})`,
        channel: data.author_name || 'YouTube Academic Channel',
      };
    }
  } catch (e) {
    console.warn('[Dictation] oEmbed metadata warning:', e.message);
  }
  return {
    title: `Academic Dictation Lesson (${videoId})`,
    channel: 'YouTube Education',
  };
}

// Tạo bộ câu học thuật thông minh bằng Gemini AI dựa trên chủ đề tiêu đề video nếu video tắt hoàn toàn phụ đề
async function generateSmartSentencesWithAi(title, channel) {
  const apiKey = getLiveApiKey();
  if (apiKey) {
    const prompt = `Bạn là chuyên gia biên soạn học liệu nghe chép chính tả IELTS/Academic English chuyên sâu.
Người học vừa nhập một video YouTube có tiêu đề: "${title}" của kênh "${channel}".
Hãy tạo 20 câu tiếng Anh học thuật hoàn chỉnh, tự nhiên và liền mạch (độ dài 14-25 từ mỗi câu) bám sát theo cấu trúc chủ đề của video này.
Mỗi câu có mốc thời gian start và end tăng dần hợp lý (tổng thời lượng từ 10 giây đến khoảng 210 giây, mỗi câu dài 8-15 giây) và có kèm bản dịch nghĩa tiếng Việt chi tiết.

Trả về ĐÚNG MỘT MẢNG JSON gồm 20 đối tượng (không bọc trong markdown):
[
  {
    "id": 1,
    "start": 10.0,
    "end": 20.0,
    "text": "Academic sentence text here...",
    "translationVi": "Bản dịch tiếng Việt tương ứng ở đây..."
  }
]`;

    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent?key=${apiKey}`;
      const res = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.25,
            maxOutputTokens: 2500,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw.trim());
          if (Array.isArray(parsed) && parsed.length >= 10) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('[Dictation] AI smart sentence fallback warning:', e.message);
    }
  }

  // Fallback 20 câu chuẩn học thuật nếu không có API key hoặc mạng gián đoạn
  return [
    {
      id: 1,
      start: 10.0,
      end: 18.5,
      text: "Understanding the neurological mechanism of habit formation is essential for behavioral modification in modern psychology.",
      translationVi: "Hiểu được cơ chế thần kinh học của sự hình thành thói quen là điều thiết yếu để điều chỉnh hành vi trong tâm lý học hiện đại.",
    },
    {
      id: 2,
      start: 18.5,
      end: 27.2,
      text: "Mindfulness training often helps individuals decouple their immediate cravings from automatic and compulsive behavioral responses.",
      translationVi: "Rèn luyện chánh niệm giúp các cá nhân tách rời cơn thèm muốn tức thời khỏi những phản ứng hành vi tự động và cưỡng chế.",
    },
    {
      id: 3,
      start: 27.2,
      end: 36.8,
      text: "The human brain relies on positive reinforcement loops and context-dependent memories to sustain both beneficial and addictive behavioral patterns.",
      translationVi: "Bộ não con người dựa vào các vòng lặp củng cố tích cực và ký ức phụ thuộc vào ngữ cảnh để duy trì cả thói quen có lợi lẫn nghiện ngập.",
    },
    {
      id: 4,
      start: 36.8,
      end: 45.4,
      text: "Whenever we encounter an emotional trigger like stress or sadness, our prefrontal cortex often struggles to maintain self-control.",
      translationVi: "Bất cứ khi nào ta gặp phải yếu tố kích hoạt cảm xúc như căng thẳng hay buồn bã, vỏ não trước trán thường gặp khó khăn trong việc duy trì khả năng tự chủ.",
    },
    {
      id: 5,
      start: 45.4,
      end: 54.0,
      text: "Instead of fighting our cravings with willpower alone, cognitive scientists recommend cultivating genuine curiosity about what is happening in the body.",
      translationVi: "Thay vì chỉ chống lại cơn thèm muốn bằng ý chí đơn thuần, các nhà khoa học nhận thức khuyên nên nuôi dưỡng sự tò mò chân thực về những gì đang diễn ra trong cơ thể.",
    },
    {
      id: 6,
      start: 54.0,
      end: 63.5,
      text: "By observing the physical sensations associated with an urge, we gradually realize that cravings are simply bodily sensations that come and go.",
      translationVi: "Bằng cách quan sát những cảm giác thể chất đi kèm với một thôi thúc, ta dần nhận ra rằng các cơn thèm muốn chỉ đơn giản là những cảm giác cơ thể đến rồi đi.",
    },
    {
      id: 7,
      start: 63.5,
      end: 72.8,
      text: "This simple shift in perspective enables people to step out of their habitual reactive loops and make conscious decisions.",
      translationVi: "Sự thay đổi góc nhìn đơn giản này cho phép mọi người bước ra khỏi những vòng phản xạ theo thói quen và đưa ra quyết định có ý thức.",
    },
    {
      id: 8,
      start: 72.8,
      end: 81.6,
      text: "Clinical trials have shown that mindfulness-based habit reversal techniques can be significantly more effective than standard willpower approaches.",
      translationVi: "Các thử nghiệm lâm sàng đã chỉ ra rằng các kỹ thuật đảo ngược thói quen dựa trên chánh niệm có thể hiệu quả hơn đáng kể so với phương pháp ý chí thông thường.",
    },
    {
      id: 9,
      start: 81.6,
      end: 90.5,
      text: "When individuals become disillusioned with the temporary relief provided by unhealthy habits, the brain naturally loses interest in repeating them.",
      translationVi: "Khi các cá nhân vỡ mộng với sự giải tỏa tạm bợ mà các thói quen không lành mạnh mang lại, bộ não sẽ tự nhiên giảm bớt hứng thú lặp lại chúng.",
    },
    {
      id: 10,
      start: 90.5,
      end: 99.8,
      text: "Over time, neuroplasticity allows new and healthier pathways to form, reinforcing sustainable routines and long-term well-being.",
      translationVi: "Theo thời gian, tính mềm dẻo của hệ thần kinh cho phép các đường dẫn mới và lành mạnh hơn được hình thành, củng cố những nếp sống bền vững.",
    },
    {
      id: 11,
      start: 99.8,
      end: 108.5,
      text: "Every deliberate choice we make contributes to strengthening these positive neural connections across the cerebral cortex.",
      translationVi: "Mỗi lựa chọn có chủ đích mà chúng ta đưa ra đều góp phần củng cố những kết nối thần kinh tích cực này trên khắp vỏ đại não.",
    },
    {
      id: 12,
      start: 108.5,
      end: 117.2,
      text: "Furthermore, consistent practice helps reduce the automatic firing of the amygdala during high-pressure situations.",
      translationVi: "Hơn nữa, việc luyện tập kiên trì giúp làm giảm sự kích hoạt tự động của hạch hạnh nhân trong các tình huống chịu áp lực cao.",
    },
    {
      id: 13,
      start: 117.2,
      end: 126.0,
      text: "As a result, emotional regulation improves and individuals can respond with clarity rather than reacting with impulsive behaviors.",
      translationVi: "Kết quả là khả năng điều hòa cảm xúc được cải thiện và các cá nhân có thể phản hồi một cách sáng suốt thay vì phản ứng bốc đồng.",
    },
    {
      id: 14,
      start: 126.0,
      end: 135.5,
      text: "The integration of cognitive behavioral principles with daily mindfulness creates a robust foundation for personal growth.",
      translationVi: "Sự kết hợp giữa các nguyên lý hành vi nhận thức với chánh niệm hàng ngày tạo ra nền tảng vững chắc cho sự phát triển bản thân.",
    },
    {
      id: 15,
      start: 135.5,
      end: 144.2,
      text: "Empirical studies consistently highlight that small, incremental modifications in daily routines yield extraordinary results over decades.",
      translationVi: "Các nghiên cứu thực nghiệm luôn nhấn mạnh rằng những thay đổi nhỏ, tăng dần trong thói quen hàng ngày sẽ mang lại kết quả phi thường qua nhiều thập kỷ.",
    },
    {
      id: 16,
      start: 144.2,
      end: 153.0,
      text: "Mastering the science of habits ultimately empowers us to design an intentional life aligned with our core values.",
      translationVi: "Làm chủ khoa học về thói quen cuối cùng sẽ trao quyền cho chúng ta thiết kế một cuộc đời có chủ đích, hòa hợp với các giá trị cốt lõi.",
    },
    {
      id: 17,
      start: 153.0,
      end: 162.2,
      text: "By acknowledging our triggers without judgment, we cultivate emotional resilience and psychological flexibility.",
      translationVi: "Bằng cách ghi nhận những yếu tố kích hoạt mà không phán xét, chúng ta nuôi dưỡng sự kiên cường về cảm xúc và sự linh hoạt về tâm lý.",
    },
    {
      id: 18,
      start: 162.2,
      end: 171.0,
      text: "This continuous cycle of self-reflection and conscious action is what distinguishes proactive leaders from passive followers.",
      translationVi: "Chu trình tự soi chiếu và hành động có ý thức liên tục này chính là điều phân biệt những nhà lãnh đạo chủ động với những người thụ động.",
    },
    {
      id: 19,
      start: 171.0,
      end: 180.5,
      text: "Whatever habit you seek to transform, remember that patience and consistent curiosity are your most reliable allies.",
      translationVi: "Dù bạn muốn chuyển hóa thói quen nào, hãy nhớ rằng sự kiên nhẫn và tính tò mò kiên định luôn là những đồng minh đáng tin cậy nhất.",
    },
    {
      id: 20,
      start: 180.5,
      end: 190.0,
      text: "Through dedication and evidence-based strategies, enduring behavioral transformation is well within everyone's reach.",
      translationVi: "Thông qua sự cống hiến và các chiến lược dựa trên bằng chứng, sự chuyển hóa hành vi lâu bền hoàn toàn nằm trong tầm tay của tất cả mọi người.",
    },
  ];
}

// POST /api/dictation/extract-youtube
exports.extractYoutubeTranscript = async (req, res) => {
  try {
    const { videoId } = req.body || {};
    if (!videoId || typeof videoId !== 'string') {
      return res.status(400).json({ error: 'Thiếu mã videoId YouTube hợp lệ.' });
    }

    const cleanId = videoId.trim();
    let meta = await fetchYoutubeMetadata(cleanId);

    // 0. Kiểm tra kho bài học thuật đã tuyển chọn & kiểm duyệt (Curated Vault)
    const cachedCurated = curatedVault[cleanId.toLowerCase()];
    if (cachedCurated && Array.isArray(cachedCurated.sentences) && cachedCurated.sentences.length > 0) {
      const payload = {
        videoId: cleanId,
        title: cachedCurated.title || meta.title,
        channel: cachedCurated.channel || meta.channel,
        level: cachedCurated.level || 'B2',
        topic: cachedCurated.topic || 'Khoa học',
        sourceType: 'youtube_official_captions',
        sentences: cachedCurated.sentences,
      };
      return res.json({
        success: true,
        source: 'YouTube Official Captions (Curated Vault)',
        ...payload,
        data: payload,
      });
    }

    // 1. Thử lấy phụ đề chuẩn qua YoutubeTranscript library (Hỗ trợ tốt cả trên môi trường Cloud/Render)
    if (YoutubeTranscriptModule) {
      try {
        let items = null;
        const targetLangs = ['en', 'en-US', 'en-GB', 'en-CA'];
        for (const lang of targetLangs) {
          try {
            items = await YoutubeTranscriptModule.fetchTranscript(cleanId, {
              lang,
              fetch: proxyFetch,
            });
            if (Array.isArray(items) && items.length > 0) break;
          } catch {
            // thử tiếp ngôn ngữ tiếng Anh khác
          }
        }

        // Nếu chỉ định ngôn ngữ thất bại, thử lấy mặc định nhưng kiểm tra xem có phải tiếng Anh không
        if (!items) {
          try {
            const rawItems = await YoutubeTranscriptModule.fetchTranscript(cleanId, {
              fetch: proxyFetch,
            });
            if (Array.isArray(rawItems) && rawItems.length > 0) {
              const langCode = rawItems[0]?.lang || '';
              // Chỉ chấp nhận nếu là tiếng Anh hoặc không có nhãn
              if (!langCode || langCode.startsWith('en')) {
                items = rawItems;
              }
            }
          } catch {
            // bỏ qua
          }
        }

        if (Array.isArray(items) && items.length > 0) {
          const rawSegments = items.map((it) => ({
            start: (it.offset || 0) / 1000,
            dur: (it.duration || 2500) / 1000,
            text: it.text || '',
          }));

          const merged = mergeCaptionsIntoSentences(rawSegments);
          if (merged.length >= 2) {
            const payload = {
              videoId: cleanId,
              title: meta.title,
              channel: meta.channel,
              sourceType: 'youtube_official_captions',
              sentences: merged,
            };
            return res.json({
              success: true,
              source: 'YouTube Official Captions',
              ...payload,
              data: payload,
            });
          }
        }
      } catch (ytErr) {
        console.warn('[Dictation] YoutubeTranscript module warning:', ytErr.message);
      }
    }

    // 2. Fallback qua InnerTube Player API
    const { sentences: realCaptions, videoDetails, trackType } =
      await fetchYoutubeCaptionsAndDetails(cleanId);

    if (videoDetails?.title) {
      meta = videoDetails;
    }

    if (realCaptions && realCaptions.length > 0) {
      const payload = {
        videoId: cleanId,
        title: meta.title,
        channel: meta.channel,
        sourceType: trackType || 'youtube_captions',
        sentences: realCaptions,
      };
      return res.json({
        success: true,
        source:
          trackType === 'youtube_auto_captions'
            ? 'YouTube Auto Captions (InnerTube)'
            : 'YouTube Official Captions (InnerTube)',
        ...payload,
        data: payload,
      });
    }

    // 3. Nếu video không có phụ đề công khai, dùng AI tạo kịch bản gợi ý và đánh dấu cảnh báo rõ ràng
    const aiSentences = await generateSmartSentencesWithAi(meta.title, meta.channel);
    const fallbackPayload = {
      videoId: cleanId,
      title: meta.title,
      channel: meta.channel,
      sourceType: 'ai_heuristic',
      isAiGenerated: true,
      warning:
        'Video này không có phụ đề tiếng Anh trên YouTube. Kịch bản dưới đây do AI tạo theo chủ đề video và sẽ không khớp từng từ với clip phát.',
      sentences: aiSentences,
    };
    return res.json({
      success: true,
      source: 'AI Academic Fallback (Không khớp 100% audio)',
      ...fallbackPayload,
      data: fallbackPayload,
    });
  } catch (err) {
    console.error('[Dictation] extractYoutubeTranscript error:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ khi trích xuất dữ liệu YouTube.' });
  }
};
