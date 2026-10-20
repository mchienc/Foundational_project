// controllers/dictationController.js
// Bộ trích xuất phụ đề YouTube tự động (InnerTube API) & phân tích câu học thuật cho Xưởng Chép Chính Tả (/dictation)

const { getLiveApiKey } = require('./ankiAiController');

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
    const cleanText = decodeHtmlEntities(seg.text || '')
      .replace(/\[.*?\]/g, '') // Bỏ [Music], [Applause]
      .replace(/\((?:Laughter|Applause|Music|Cheering|Sighs|inaudible)[^)]*\)/gi, '')
      .replace(/♪/g, '')
      .trim();

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

    // Ưu tiên ngắt đúng dấu kết câu (. ? !) khi câu đủ độ dài (>= 4 từ),
    // hoặc ngắt tại dấu phẩy khi câu đã dài (>= 14 từ), hoặc ngắt cưỡng bức khi >= 22 từ
    if (
      (endsWithSentencePunct && wordCount >= 4) ||
      (endsWithClausePunct && wordCount >= 14) ||
      wordCount >= 22 ||
      duration >= 12
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

  // Giới hạn tối đa 25 câu đầu tiên để bài luyện tập trung
  return sentences.slice(0, 25);
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
      const playerRes = await fetch('https://www.youtube.com/youtubei/v1/player?prettyPrint=false', {
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

      const xmlRes = await fetch(enTrack.baseUrl, {
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
    const res = await fetch(oembedUrl);
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
    const prompt = `Bạn là chuyên gia biên soạn học liệu nghe chép chính tả IELTS/Academic English.
Người học vừa nhập một video YouTube có tiêu đề: "${title}" của kênh "${channel}".
Hãy tạo 6 câu tiếng Anh học thuật (độ dài 8-15 từ mỗi câu) sát với chủ đề của video này kèm mốc thời gian hợp lý và nghĩa tiếng Việt.

Trả về ĐÚNG MỘT MẢNG JSON (không bọc trong markdown):
[
  {
    "id": 1,
    "start": 5,
    "end": 11,
    "text": "Câu tiếng Anh học thuật 1.",
    "translationVi": "Bản dịch tiếng Việt tương ứng."
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
            temperature: 0.2,
            maxOutputTokens: 1000,
            responseMimeType: 'application/json',
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (raw) {
          const parsed = JSON.parse(raw.trim());
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('[Dictation] AI smart sentence fallback warning:', e.message);
    }
  }

  return [
    {
      id: 1,
      start: 5,
      end: 12,
      text: 'Welcome to this academic session, where we explore key concepts and critical perspectives.',
      translationVi: 'Chào mừng bạn đến với buổi học thuật này, nơi chúng ta khám phá các khái niệm cốt lõi và góc nhìn phản biện.',
    },
    {
      id: 2,
      start: 13,
      end: 21,
      text: 'Researchers have long investigated how environmental factors influence human behavior over time.',
      translationVi: 'Các nhà nghiên cứu từ lâu đã tìm hiểu cách các yếu tố môi trường ảnh hưởng đến hành vi con người theo thời gian.',
    },
    {
      id: 3,
      start: 22,
      end: 30,
      text: 'By analyzing empirical evidence, scientists can formulate accurate models to predict future trends.',
      translationVi: 'Bằng cách phân tích bằng chứng thực nghiệm, các nhà khoa học có thể xây dựng mô hình chính xác để dự đoán xu hướng tương lai.',
    },
    {
      id: 4,
      start: 31,
      end: 39,
      text: 'However, implementing sustainable solutions requires collaboration across multiple international institutions.',
      translationVi: 'Tuy nhiên, việc triển khai các giải pháp bền vững đòi hỏi sự hợp tác giữa nhiều tổ chức quốc tế.',
    },
    {
      id: 5,
      start: 40,
      end: 48,
      text: 'Ultimately, continuous innovation remains the cornerstone of modern scientific and economic progress.',
      translationVi: 'Cuối cùng, sự đổi mới liên tục vẫn là nền tảng của tiến bộ khoa học và kinh tế hiện đại.',
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
    const { sentences: realCaptions, videoDetails, trackType } =
      await fetchYoutubeCaptionsAndDetails(cleanId);

    const meta = videoDetails?.title
      ? videoDetails
      : await fetchYoutubeMetadata(cleanId);

    if (realCaptions && realCaptions.length > 0) {
      return res.json({
        videoId: cleanId,
        title: meta.title,
        channel: meta.channel,
        sourceType: trackType || 'youtube_captions',
        sentences: realCaptions,
      });
    }

    // Nếu video không có phụ đề công khai, dùng AI tạo kịch bản mẫu
    const aiSentences = await generateSmartSentencesWithAi(meta.title, meta.channel);
    return res.json({
      videoId: cleanId,
      title: meta.title,
      channel: meta.channel,
      sourceType: 'ai_heuristic',
      sentences: aiSentences,
    });
  } catch (err) {
    console.error('[Dictation] extractYoutubeTranscript error:', err);
    return res.status(500).json({ error: 'Lỗi máy chủ khi trích xuất dữ liệu YouTube.' });
  }
};
