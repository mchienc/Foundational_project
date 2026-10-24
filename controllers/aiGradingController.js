// controllers/aiGradingController.js
// Giám khảo khảo thí IELTS Senior Examiner chuẩn quốc tế (Cambridge / British Council / IDP)
// Chấm điểm IELTS Writing & Speaking tự động chuyên sâu bằng Gemini AI
// Tích hợp: 4 tiêu chí 25%, Đối chiếu số liệu gốc Task 1, Thesis check Task 2, Inline Corrections (grammar/vocab/cohesion), Deep Analytics (Complexity, Overused Words) & Paragraph Audit

const { getLiveApiKey } = require('./ankiAiController');

// Bản đồ từ vựng cơ bản và gợi ý từ vựng học thuật C1/C2 (Academic Synonyms)
const ACADEMIC_WORDS_MAP = {
  important: ['crucial', 'vital', 'paramount', 'indispensable', 'pivotal'],
  good: ['beneficial', 'advantageous', 'favorable', 'commendable', 'salutary'],
  bad: ['detrimental', 'adverse', 'deleterious', 'injurious'],
  increase: ['escalate', 'proliferate', 'surge', 'witness an upward trajectory'],
  decrease: ['diminish', 'plummet', 'experience a downturn', 'dwindle'],
  people: ['individuals', 'citizens', 'the populace', 'inhabitants', 'cohorts'],
  many: ['a myriad of', 'a multitude of', 'numerous', 'copious'],
  big: ['substantial', 'considerable', 'monumental', 'extensive'],
  small: ['negligible', 'marginal', 'inconsequential', 'modest'],
  show: ['illustrate', 'demonstrate', 'depict', 'manifest', 'exemplify'],
  think: ['contend', 'advocate', 'posit', 'maintain', 'concur'],
  very: ['exceedingly', 'substantially', 'markedly', 'exceptionally']
};

// Hàm tính toán chỉ số học thuật chuyên sâu (Sentence Complexity, Overused Words, Paragraph Audit)
function computeWritingAnalytics(essayContent, taskType) {
  const text = essayContent || '';
  const words = text.toLowerCase().match(/\b[a-z'-]+\b/g) || [];
  const sentences = text.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 0);

  // 1. Phân loại cấu trúc câu (Sentence Complexity Meter)
  let complexCount = 0;
  let compoundCount = 0;
  let simpleCount = 0;

  const complexTriggers = /\b(although|even though|though|because|since|whereas|while|whilst|which|that|who|whom|whose|if|unless|provided that|despite|in spite of|in order that|so that)\b/i;
  const compoundTriggers = /\b(and|but|or|nor|for|yet|so|however|moreover|furthermore|nevertheless|consequently|in addition)\b/i;

  for (const s of sentences) {
    if (complexTriggers.test(s)) {
      complexCount++;
    } else if (compoundTriggers.test(s)) {
      compoundCount++;
    } else {
      simpleCount++;
    }
  }

  const totalSentences = sentences.length || 1;
  const complexPct = Math.round((complexCount / totalSentences) * 100);
  const compoundPct = Math.round((compoundCount / totalSentences) * 100);
  const simplePct = Math.round((simpleCount / totalSentences) * 100);

  let sentenceFeedback = '';
  if (complexPct >= 40) {
    sentenceFeedback = 'Ước lượng cơ học: Bài viết có tỷ lệ câu phức cao (' + complexPct + '%). Lưu ý: Giám khảo IELTS đánh giá chất lượng và độ chuẩn xác của câu thay vì chỉ đếm từ nối.';
  } else if (complexPct >= 20) {
    sentenceFeedback = 'Ước lượng cơ học: Bài viết có sự kết hợp giữa câu đơn và câu phức (' + complexPct + '%). Nên chú ý đa dạng hóa cấu trúc câu học thuật tự nhiên.';
  } else {
    sentenceFeedback = 'Ước lượng cơ học: Tỷ lệ câu đơn chiếm đa số (' + simplePct + '%). Nên sử dụng thêm các mệnh đề quan hệ và liên từ phụ thuộc để câu văn uyển chuyển hơn.';
  }

  // 2. Cảnh báo từ bị lặp quá nhiều & Gợi ý từ đồng nghĩa C1/C2
  const wordFreq = {};
  for (const w of words) {
    if (ACADEMIC_WORDS_MAP[w]) {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    }
  }

  const overusedWords = [];
  for (const [w, count] of Object.entries(wordFreq)) {
    if (count >= 2) {
      overusedWords.push({
        word: w,
        count: count,
        suggestedSynonyms: ACADEMIC_WORDS_MAP[w]
      });
    }
  }

  // 3. Phân tích cấu trúc từng đoạn văn (Paragraph Structure Audit)
  const rawParagraphs = text.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const paragraphAudit = rawParagraphs.map((para, idx) => {
    let paraType = '';
    let assessment = 'good';
    let comment = '';

    if (taskType === 'task1') {
      if (idx === 0) {
        paraType = 'Introduction (Mở bài)';
        const hasParaphrase = /\b(shows|illustrates|depicts|presents|compares|gives information|demonstrates)\b/i.test(para);
        assessment = hasParaphrase ? 'good' : 'warning';
        comment = hasParaphrase
          ? 'Đã mở bài bằng cách paraphrase đề bài tự nhiên.'
          : 'Nên dùng các động từ học thuật như "illustrates", "demonstrates" để giới thiệu biểu đồ.';
      } else if (idx === 1) {
        paraType = 'Overview (Tổng quan)';
        const hasOverview = /\b(overall|in general|it is noticeable|it is clear|notably)\b/i.test(para);
        assessment = hasOverview ? 'good' : 'warning';
        comment = hasOverview
          ? 'Đã có câu Overview khái quát xu hướng chính hoặc nhóm nổi bật.'
          : 'Thiếu liên từ nhận diện Overview ("Overall, it is clear that..."). Đây là yếu tố sống còn để vượt Band 5.0 Task Achievement!';
      } else {
        paraType = `Body Paragraph ${idx - 1} (Thân bài)`;
        const hasData = /\d+%?|\b(percent|rose|increased|decreased|dropped|higher|lower)\b/i.test(para);
        assessment = hasData ? 'good' : 'warning';
        comment = hasData
          ? 'Đã đưa số liệu minh họa và có cấu trúc so sánh tương quan.'
          : 'Cần bổ sung các mốc số liệu cụ thể hoặc phần trăm từ biểu đồ để chứng minh.';
      }
    } else {
      if (idx === 0) {
        paraType = 'Introduction (Mở bài)';
        const hasThesis = /\b(in my opinion|i believe|i agree|i disagree|this essay|i firmly contend|my view)\b/i.test(para);
        assessment = hasThesis ? 'good' : 'warning';
        comment = hasThesis
          ? 'Đã có câu Thesis Statement thể hiện quan điểm rõ ràng.'
          : 'Chưa thấy rõ câu Thesis Statement nêu lập trường cá nhân trong Mở bài.';
      } else if (idx === rawParagraphs.length - 1 && rawParagraphs.length > 2) {
        paraType = 'Conclusion (Kết luận)';
        const hasConcl = /\b(in conclusion|to conclude|to sum up|in summary)\b/i.test(para);
        assessment = hasConcl ? 'good' : 'warning';
        comment = hasConcl
          ? 'Có kết bài tóm tắt luận điểm và tái khẳng định quan điểm nhất quán.'
          : 'Cần mở đầu đoạn kết bằng liên từ chuẩn mực ("In conclusion, ...").';
      } else {
        paraType = `Body Paragraph ${idx} (Thân bài)`;
        const hasExample = /\b(for example|for instance|specifically|such as|evidence suggests|a case in point)\b/i.test(para);
        assessment = hasExample ? 'good' : 'warning';
        comment = hasExample
          ? 'Có dẫn chứng cụ thể hỗ trợ cho luận điểm.'
          : 'Nên bổ sung ví dụ thực tế ("For instance, ...") để luận điểm thuyết phục hơn.';
      }
    }

    return {
      paragraphIndex: idx + 1,
      paragraphType: paraType,
      wordCount: para.split(/\s+/).filter(Boolean).length,
      assessment,
      comment
    };
  });

  return {
    sentenceComplexity: {
      totalSentences,
      simpleCount,
      compoundCount,
      complexCount,
      simplePct,
      compoundPct,
      complexPct,
      feedback: sentenceFeedback
    },
    overusedWords,
    paragraphAudit
  };
}

// Hàm làm tròn điểm IELTS chính thức (IELTS Rounding Rule: làm tròn tới 0.5 gần nhất)
function roundIeltsBand(rawScore) {
  if (typeof rawScore !== 'number' || isNaN(rawScore)) return 6.0;
  const clamped = Math.max(0, Math.min(9.0, rawScore));
  const floorVal = Math.floor(clamped);
  const decimal = Number((clamped - floorVal).toFixed(3));
  if (decimal < 0.25) return floorVal;
  if (decimal < 0.75) return floorVal + 0.5;
  return floorVal + 1.0;
}

// Công thức điểm Writing tổng hợp từ hai Task:
// Writing Band = round_0.5((T1 + 2*T2) / 3)
function calculateCompositeWritingBand(task1Band, task2Band) {
  const t1 = parseFloat(task1Band);
  const t2 = parseFloat(task2Band);
  if (isNaN(t1) || isNaN(t2)) return null;
  const weighted = (t1 + 2 * t2) / 3;
  return roundIeltsBand(weighted);
}

// Hàm làm sạch chuỗi JSON trả về từ Gemini
function extractJsonFromText(rawText) {
  if (!rawText) return null;
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err) {
        return null;
      }
    }
    return null;
  }
}

// Fallback thông minh cho bài thi Writing khi ngoại tuyến
function generateWritingFallback(taskType, prompt, essayContent, chartType, chartDetails, essaySubtype) {
  const words = (essayContent || '').trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let overallBand = 6.5;
  if (wordCount >= 260) overallBand = 7.0;
  else if (wordCount >= 200) overallBand = 6.5;
  else if (wordCount >= 140) overallBand = 6.0;
  else overallBand = 5.5;

  const isTask1 = taskType === 'task1';

  const dataAccuracyCheck = isTask1 ? {
    status: "PASS",
    accuracyScore: 7.5,
    hasFactualErrors: false,
    summary: `Đối chiếu số liệu với dạng biểu đồ ${chartType || 'biểu đồ'}: Bạn đã trích xuất được xu hướng chính và các mốc số liệu tiêu biểu, không phát hiện số liệu bị sai lệch nghiêm trọng so với đề bài.`,
    verifications: [
      {
        claimInEssay: "Xu hướng chính và các nhóm số liệu được báo cáo trong bài",
        chartDataRef: "Dữ liệu đối chiếu từ đề bài",
        isAccurate: true,
        comment: "Số liệu được trích dẫn hợp lý, đã có sự so sánh giữa các mốc hoặc các hạng mục cao nhất/thấp nhất."
      }
    ]
  } : null;

  const essayStructureCheck = !isTask1 ? {
    detectedSubtype: essaySubtype || "Opinion / Discussion",
    hasClearThesis: true,
    thesisConsistency: "Nhất quán",
    argumentProgression: "Mạch lạc, có chia đoạn theo luận điểm",
    feedback: "Bài viết đã thể hiện lập trường rõ ràng từ phần Mở bài đến Kết bài. Mỗi đoạn thân bài tập trung vào một luận điểm chính và có ví dụ hỗ trợ."
  } : null;

  const sampleCorrections = [
    {
      original: isTask1 ? "The chart shows the number of people going up quickly." : "In the first place, people think that technology has bad effect on children.",
      corrected: isTask1 ? "The chart illustrates an exponential growth in the proportion of participants over the surveyed period." : "First and foremost, there is a widespread concern that digital technology exerts an adverse impact on children's cognitive development.",
      explanation: isTask1 ? "Nâng cấp cụm 'going up quickly' thành 'exponential growth' và dùng từ 'illustrates' chuẩn Academic." : "Nâng cấp cụm 'bad effect' thành collocation học thuật 'exerts an adverse impact on' và mở rộng mệnh đề tự nhiên hơn.",
      type: "vocabulary"
    },
    {
      original: isTask1 ? "France is bigger than Germany with 40%." : "Because of many reasons, education should be free for all students.",
      corrected: isTask1 ? "France surpassed Germany, accounting for approximately 40% of the aggregate total." : "For a multitude of socio-economic reasons, higher education should be publicly funded for all eligible students.",
      explanation: isTask1 ? "Sử dụng cấu trúc so sánh học thuật 'surpassed..., accounting for...' thay vì câu đơn 'is bigger than'." : "Thay thế 'many reasons' bằng 'a multitude of socio-economic reasons' và 'free' bằng 'publicly funded'.",
      type: "grammar"
    },
    {
      original: isTask1 ? "To conclude, the line was the highest in 2020." : "To sum up, both sides have good points and bad points.",
      corrected: isTask1 ? "Overall, it is evident that the figure reached its pinnacle in 2020 before plateauing." : "In conclusion, while both viewpoints present valid arguments, I firmly believe that the long-term benefits outweigh the potential drawbacks.",
      explanation: isTask1 ? "Dùng 'Overall, it is evident that...' và 'reached its pinnacle' chuẩn Band 8.0+ cho câu tổng quan." : "Tránh dùng từ ngữ informal 'good points and bad points' trong câu kết luận của IELTS Academic.",
      type: "cohesion"
    }
  ];

  const analytics = computeWritingAnalytics(essayContent, taskType);

  return {
    overallBand,
    criteria: {
      taskAchievement: {
        band: overallBand,
        feedback: isTask1
          ? (wordCount >= 150
            ? `Bài viết đáp ứng tốt yêu cầu Task 1 (${wordCount} từ). Đã cung cấp câu Overview khái quát xu hướng/đặc điểm nổi bật và chọn lọc số liệu trọng tâm từ biểu đồ.`
            : `Bài viết có ${wordCount} từ (chưa đạt tối thiểu 150 từ). Bạn cần báo cáo thêm các chi tiết so sánh giữa các nhóm số liệu.`)
          : (wordCount >= 250
            ? `Bài viết đáp ứng tốt yêu cầu Task 2 (${wordCount} từ). Luận điểm được phân tích có chiều sâu và giải quyết trọn vẹn câu hỏi của đề.`
            : `Bài viết hiện có ${wordCount} từ (dưới 250 từ). Cần mở rộng dẫn chứng và phân tích sâu hơn để tránh bị trừ điểm Task Response.`)
      },
      coherenceCohesion: {
        band: overallBand,
        feedback: "Bố cục bài viết mạch lạc, chia đoạn khoa học (Mở bài - Tổng quan/Luận điểm 1 - Thân bài chi tiết - Kết luận). Các liên từ chuyển ý (Moreover, In stark contrast, Consequently) được sử dụng tự nhiên."
      },
      lexicalResource: {
        band: overallBand,
        feedback: "Vốn từ vựng tương đối phong phú, xuất hiện các từ học thuật phù hợp ngữ cảnh. Cần hạn chế lặp từ cơ bản bằng cách áp dụng thêm các từ đồng nghĩa và collocation trình độ C1."
      },
      grammaticalRange: {
        band: overallBand,
        feedback: "Sử dụng kết hợp câu đơn, câu ghép và câu phức linh hoạt. Kiểm soát tốt thì ngữ pháp và cấu trúc câu bị động/mệnh đề quan hệ."
      }
    },
    dataAccuracyCheck,
    essayStructureCheck,
    academicAnalytics: analytics,
    paragraphAudit: analytics.paragraphAudit,
    overview: isTask1
      ? `Bài viết Task 1 đã truyền tải được bức tranh tổng thể của biểu đồ và phân tích số liệu tương đối chuẩn xác. Để đạt Band 7.5+, hãy sử dụng đa dạng hơn các cấu trúc báo cáo số liệu (proportions, figures, percentages) và kết nối các nhóm đối tượng logic hơn.`
      : `Bài viết Task 2 thể hiện tư duy phản biện tốt, lập luận có chiều sâu và bố cục chặt chẽ. Để bứt phá lên Band 8.0, hãy trau chuốt các liên kết ngầm giữa các ý và sử dụng cấu trúc đảo ngữ hoặc câu điều kiện hỗn hợp.`,
    sentenceCorrections: sampleCorrections,
    modelAnswer: isTask1
      ? "The provided chart illustrates significant shifts across the surveyed categories over the specified timeframe. Overall, it is readily apparent that the primary indicator experienced substantial upward momentum, whereas the remaining figures displayed moderate fluctuations. Notably, the leading category established a dominant margin toward the latter half of the period, underscoring a decisive structural transformation in the measured metrics."
      : "In contemporary discourse, the debate surrounding this issue remains highly contentious. While critics argue that prevailing conventions should be preserved, I advocate that progressive adaptations yield far superior societal advantages. On one hand, adherence to traditional frameworks provides stability; however, embracing innovation stimulates intellectual dynamism and equips future generations with indispensable analytical skills. Consequently, a balanced integration of both paradigms represents the optimal trajectory forward."
  };
}

// Fallback thông minh cho bài thi Speaking theo từng Part
function generateSpeakingFallback(part, topic, question, transcript, durationSeconds) {
  const words = (transcript || '').trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  let estimatedBand = 6.5;
  if (wordCount >= 90) estimatedBand = 7.0;
  else if (wordCount >= 40) estimatedBand = 6.5;
  else estimatedBand = 6.0;

  const partNum = parseInt(part, 10) || 1;
  let partAudit = {};

  if (partNum === 1) {
    partAudit = {
      partName: "Part 1 - Phỏng vấn cá nhân (Personal Interview)",
      focusEvaluation: "Phản xạ trả lời nhanh, câu trả lời tự nhiên, mở rộng ý vừa đủ (khoảng 3-4 câu/câu hỏi), không bị cụt lủn và không lan man.",
      keyStrengths: [
        "Phản xạ trả lời tức thì, trả lời thẳng vào trọng tâm câu hỏi mà giám khảo đưa ra.",
        "Mở rộng câu trả lời bằng cách nêu thêm cảm nghĩ hoặc thói quen cá nhân.",
        "Ngữ điệu tự nhiên, từ vựng giao tiếp đời sống gần gũi."
      ],
      keyWeaknesses: [
        "Có xu hướng ngập ngừng nhẹ khi chuyển ý.",
        "Nên bổ sung thêm các discourse markers tự nhiên như 'Well, to be honest', 'As a matter of fact'."
      ],
      timingFeedback: `Thời lượng nói ${durationSeconds}s là phù hợp cho câu hỏi Part 1.`
    };
  } else if (partNum === 2) {
    partAudit = {
      partName: "Part 2 - Long Turn (Bài nói dài theo Cue Card)",
      focusEvaluation: "Kiểm tra khả năng nói dài có tổ chức, phát triển toàn diện các gợi ý trên Cue Card, duy trì mạch lạc và độ trôi chảy xuyên suốt bài nói.",
      keyStrengths: [
        "Bao quát được các luận điểm chính yêu cầu trên Cue Card.",
        "Có cấu trúc rõ ràng: Giới thiệu bối cảnh -> Diễn biến câu chuyện -> Cảm nhận cá nhân.",
        "Duy trì luồng nói liên tục, không bị gián đoạn quá lâu."
      ],
      keyWeaknesses: [
        "Cần kiểm soát tốc độ nói đều đặn hơn giữa phần đầu và phần kết.",
        "Có thể khai thác thêm các chi tiết mô tả sống động (sensory details) để gây ấn tượng với giám khảo."
      ],
      timingFeedback: `Thời lượng thực tế: ${durationSeconds}s. Thời lượng là dữ liệu hỗ trợ theo dõi, giám khảo đánh giá chất lượng phát triển chủ đề và độ trôi chảy.`
    };
  } else {
    partAudit = {
      partName: "Part 3 - Thảo luận chuyên sâu (Two-way Discussion)",
      focusEvaluation: "Đánh giá khả năng phân tích vấn đề trừu tượng, tư duy phản biện, so sánh đa chiều và ứng biến linh hoạt trước các góc nhìn phức tạp.",
      keyStrengths: [
        "Tiếp cận câu hỏi từ góc nhìn xã hội vĩ mô, không bị bó hẹp trong phạm vi cá nhân.",
        "Có khả năng so sánh giữa quá khứ - hiện tại hoặc các nhóm đối tượng khác nhau.",
        "Sử dụng các cấu trúc lập luận học thuật như 'From a sociological perspective', 'It is widely acknowledged that'."
      ],
      keyWeaknesses: [
        "Cần đào sâu hơn phần nguyên nhân - hệ quả của hiện tượng.",
        "Nên sử dụng thêm các trạng từ chỉ mức độ (predominantly, substantially, arguably) để câu nói khách quan hơn."
      ],
      timingFeedback: `Thời lượng ${durationSeconds}s cho phép trình bày lập luận có chiều sâu.`
    };
  }

  return {
    estimatedBand,
    criteria: {
      fluencyCoherence: {
        band: estimatedBand,
        comment: "Tốc độ nói ổn định, mạch ý triển khai logic. Khả năng tự sửa lỗi tốt mà không làm đứt quãng dòng suy nghĩ quá lâu."
      },
      lexicalResource: {
        band: estimatedBand,
        comment: "Vốn từ vựng tương đối phong phú, diễn đạt được các ý niệm trừu tượng. Có thể bổ sung thêm các collocations và phrasal verbs tự nhiên."
      },
      grammaticalRange: {
        band: estimatedBand,
        comment: "Sử dụng được các cấu trúc câu ghép và câu phức. Cần lưu ý chia đúng thì quá khứ đơn trong các câu kể chuyện."
      },
      pronunciationFeedback: {
        comment: "Phát âm rõ ràng, người nghe dễ hiểu. Ngữ điệu câu (intonation) và trọng âm từ (word stress) ở mức tốt. Chú ý các âm đuôi /s/, /z/, /t/."
      }
    },
    partAudit,
    officialNote: "Speaking IELTS chính thức được đánh giá tổng thể qua cả bài phỏng vấn. Bảng nhận xét này tập trung đánh giá chuyên sâu cho Part hiện tại.",
    strengths: partAudit.keyStrengths,
    weaknesses: partAudit.keyWeaknesses,
    upgradedAnswer: `Well, speaking of ${topic || 'this matter'}, I would certainly argue that it plays a pivotal role in modern life. From my perspective, when individuals engage deeply with this subject, they not only broaden their horizons but also cultivate indispensable analytical skills. Looking ahead, I firmly believe that continued attention to this area will generate profound benefits for both individuals and the wider community.`,
    keyVocabulary: [
      {
        word: "pivotal role",
        ipa: "/ˈpɪv.ə.təl rəʊl/",
        meaning: "Vai trò then chốt, mang tính quyết định",
        exampleInAnswer: "plays a pivotal role in modern life"
      },
      {
        word: "broaden one's horizons",
        ipa: "/ˈbrɔː.dən wʌnz həˈraɪ.zənz/",
        meaning: "Mở rộng tầm hiểu biết và trải nghiệm",
        exampleInAnswer: "they not only broaden their horizons"
      },
      {
        word: "cultivate indispensable skills",
        ipa: "/ˈkʌl.tɪ.veɪt ˌɪn.dɪˈspen.sə.bəl skɪlz/",
        meaning: "Trau dồi những kỹ năng không thể thiếu",
        exampleInAnswer: "cultivate indispensable analytical skills"
      }
    ]
  };
}

// Controller chấm bài Writing
exports.gradeWriting = async (req, res) => {
  try {
    const {
      taskType,
      prompt,
      essayContent,
      chartType,
      chartDetails,
      essaySubtype,
      previousTaskBand
    } = req.body;

    if (!essayContent || essayContent.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "Bài viết quá ngắn. Vui lòng viết ít nhất một vài câu hoàn chỉnh để AI có thể đánh giá."
      });
    }

    const isTask1 = taskType === 'task1';
    const apiKey = (req.body.customApiKey || getLiveApiKey() || '').trim();

    // W-01: BỎ HOÀN TOÀN FAKE BAND KHI KHÔNG CÓ KẾT NỐI GEMINI / OFFLINE
    if (!apiKey || req.body.forceOffline) {
      const wordCount = (essayContent || '').trim().split(/\s+/).filter(Boolean).length;
      const analytics = computeWritingAnalytics(essayContent, taskType);
      return res.status(503).json({
        success: false,
        status: 'unavailable',
        errorCode: 'AI_GRADER_UNAVAILABLE',
        retryable: true,
        message: 'Chưa thể chấm bài bằng AI lúc này. Hệ thống không tạo điểm IELTS giả khi không có kết nối tới AI Examiner.',
        automatedDiagnostics: {
          wordCount,
          sentenceComplexity: analytics.sentenceComplexity,
          overusedWords: analytics.overusedWords,
          paragraphAudit: analytics.paragraphAudit
        }
      });
    }

    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash'
    ];

    let specificGuidelines = '';
    if (isTask1) {
      specificGuidelines = `
=== QUY CHUẨN CHUYÊN BIỆT CHO IELTS WRITING TASK 1 ===
1. TIÊU CHÍ CHẤM (Mỗi tiêu chí chiếm 25%):
   - Task Achievement: Trả lời đúng, đủ yêu cầu đề. Đã có câu Overview rõ ràng nêu xu hướng chính (trends) hoặc các đặc điểm nổi bật chưa? Các ý chính có được hỗ trợ bằng số liệu chọn lọc không?
   - Coherence & Cohesion: Bố cục 3-4 đoạn khoa học (Introduction -> Overview -> 2 Detail Paragraphs). Liên kết mạch lạc giữa các câu và đoạn.
   - Lexical Resource: Độ phong phú, chính xác, tự nhiên của từ vựng chỉ xu hướng, tỷ trọng, so sánh và đơn vị đo.
   - Grammatical Range & Accuracy: Đa dạng cấu trúc câu (chủ động, bị động, mệnh đề quan hệ, câu phức so sánh), độ chính xác ngữ pháp.

2. KIỂM TRA CHUYÊN BIỆT THEO TỪNG DẠNG ĐỀ (${chartType || 'Biểu đồ'}):
   - Line Graph: Phân tích xu hướng (tăng/giảm/dao động/ổn định), mốc điểm đầu, điểm cuối, đỉnh cao nhất, đáy thấp nhất, và so sánh tương quan giữa các đường.
   - Bar Chart: Nhóm lớn nhất/nhỏ nhất, khoảng cách chênh lệch số liệu và so sánh giữa các cột/hạng mục.
   - Pie Chart: Tỷ trọng, phần trăm từng lát cắt, nhóm chiếm đa số hoặc thiểu số nổi bật.
   - Table: Khả năng chọn lọc số liệu quan trọng, tránh liệt kê máy móc, so sánh chính xác số liệu theo hàng/cột.
   - Map: Sự biến đổi về vị trí, công năng, bố cục không gian theo thời gian (mở rộng, thu hẹp, thay thế, di dời).
   - Process: Các giai đoạn, thứ tự tuần tự của quy trình, điểm bắt đầu (input/nguyên liệu) và điểm kết thúc (output/thành phẩm).
   - Mixed Charts: Khả năng tổng hợp và liên kết thông tin đa chiều giữa nhiều biểu đồ khác nhau.

3. QUAN TRỌNG NHẤT - ĐỐI CHIẾU BÀI VIẾT VỚI DỮ LIỆU GỐC (Data Accuracy Check):
   - BẠN BẮT BUỘC PHẢI ĐỐI CHIẾU TỪNG SỐ LIỆU, MỐC THỜI GIAN, TỶ LỆ TRONG BÀI VIẾT CỦA HỌC VIÊN VỚI DỮ LIỆU ĐỀ BÀI ĐƯỢC CUNG CẤP DƯỚI ĐÂY.
   - Không được chỉ đọc lướt qua văn phong! Nếu học viên viết một số liệu bị sai (ví dụ: ghi tăng từ 20% lên 80% trong khi biểu đồ thực tế chỉ tăng lên 60%, hoặc nhầm lẫn giữa hai đối tượng), BẠN PHẢI BẮT LỖI RÕ RÀNG trong mục "dataAccuracyCheck".
   - Nếu có lỗi sai số liệu nghiêm trọng (hallucinated / inaccurate figures), điểm Task Achievement KHÔNG ĐƯỢC VƯỢT QUÁ Band 6.0!`;
    } else {
      specificGuidelines = `
=== QUY CHUẨN CHUYÊN BIỆT CHO IELTS WRITING TASK 2 ===
1. TIÊU CHÍ CHẤM (Mỗi tiêu chí chiếm 25%):
   - Task Response: Trả lời trọn vẹn mọi vế của câu hỏi đề bài. Lập trường rõ ràng và nhất quán xuyên suốt. Luận điểm có chiều sâu, được hỗ trợ bởi lập luận logic và ví dụ cụ thể.
   - Coherence & Cohesion: Bố cục 4 đoạn chuẩn mực (Introduction -> Body 1 -> Body 2 -> Conclusion). Ý tưởng tiến triển logic (progression), sử dụng liên từ và phương tiện liên kết tinh tế.
   - Lexical Resource: Sử dụng vốn từ vựng học thuật C1/C2 phong phú, collocation chuẩn xác, tự nhiên, ít lặp từ.
   - Grammatical Range & Accuracy: Kết hợp linh hoạt các cấu trúc ngữ pháp phức tạp (đảo ngữ, câu điều kiện, mệnh đề phân từ, câu bị động), kiểm soát lỗi ngữ pháp và dấu câu tốt.

2. KIỂM TRA CHUYÊN BIỆT THEO TỪNG DẠNG LẬP LUẬN (Dạng bài: ${essaySubtype || 'Tự nhận diện'}):
   - Phân loại rõ bài viết thuộc dạng nào: Opinion (Agree/Disagree), Discussion (Discuss both views and give your opinion), Advantages & Disadvantages, Problem & Solution, hoặc Two-part Questions.
   - Với dạng Opinion Essay: Xem người viết có lập trường rõ ràng (Clear Thesis Statement) ngay từ Mở bài và duy trì nhất quán xuyên suốt bài hay không. Tuyệt đối tránh lập trường mâu thuẫn giữa mở bài và kết bài.
   - Với dạng Discussion Essay: Xem cả hai quan điểm đối lập đã được phân tích đầy đủ, khách quan chưa, và người viết đã nêu rõ quan điểm cá nhân theo yêu cầu đề bài chưa.
   - Đánh giá cụ thể trong mục "essayStructureCheck".`;
    }

    const systemInstruction = `Bạn là một Giám Khảo Khảo Thí IELTS Academic Senior Examiner Quốc Tế chuẩn Cambridge / British Council / IDP.
Nhiệm vụ của bạn là chấm điểm bài viết IELTS Writing (${isTask1 ? 'Task 1: Academic Report' : 'Task 2: Academic Essay'}) dựa trên 4 tiêu chí chuẩn IELTS với tỷ trọng mỗi tiêu chí là 25%.
Điểm tổng bài thi Task được tính theo công thức làm tròn chuẩn IELTS: round_0.5( (TA + CC + LR + GRA) / 4 ).

${specificGuidelines}

Định dạng trả về: BẮT BUỘC LÀ MỘT ĐỐI TƯỢNG JSON DUY NHẤT (không có markdown ngoài lề) theo cấu trúc chính xác sau:
{
  "overallBand": 6.5,
  "criteria": {
    "taskAchievement": {
      "band": 6.5,
      "feedback": "Nhận xét chi tiết chuyên sâu bằng tiếng Việt, chỉ rõ ưu điểm và thiếu sót..."
    },
    "coherenceCohesion": {
      "band": 6.5,
      "feedback": "Nhận xét chi tiết bằng tiếng Việt về bố cục và cách nối ý..."
    },
    "lexicalResource": {
      "band": 6.5,
      "feedback": "Nhận xét chi tiết bằng tiếng Việt về vốn từ, collocations..."
    },
    "grammaticalRange": {
      "band": 6.5,
      "feedback": "Nhận xét chi tiết bằng tiếng Việt về cấu trúc câu và lỗi ngữ pháp..."
    }
  },
  ${isTask1 ? `
  "dataAccuracyCheck": {
    "status": "PASS" hoặc "WARNING" hoặc "FAIL",
    "accuracyScore": 7.5,
    "hasFactualErrors": false hoặc true,
    "summary": "Nhận xét tổng quát về mức độ chính xác khi học viên đọc và trích xuất số liệu biểu đồ...",
    "verifications": [
      {
        "claimInEssay": "Câu hoặc số liệu cụ thể học viên nêu trong bài",
        "chartDataRef": "Số liệu thực tế chính xác trong đề/biểu đồ",
        "isAccurate": true hoặc false,
        "comment": "Nhận xét đối chiếu: đúng hay bị nhầm lẫn số liệu/xu hướng"
      }
    ]
  },` : `
  "essayStructureCheck": {
    "detectedSubtype": "Opinion / Discussion / Advantages & Disadvantages / Problem & Solution / Two-part Questions",
    "hasClearThesis": true hoặc false,
    "thesisConsistency": "Nhất quán / Thiếu nhất quán / Chưa rõ ràng",
    "argumentProgression": "Nhận xét về mạch tiến triển lập luận và bằng chứng hỗ trợ",
    "feedback": "Đánh giá chi tiết về cấu trúc lập luận và tính thuyết phục của bài viết..."
  },`}
  "overview": "Tóm tắt ưu điểm nổi bật và điểm mấu chốt cần cải thiện để lên Band cao hơn (2-3 câu tiếng Việt súc tích).",
  "sentenceCorrections": [
    {
      "original": "Đoạn/câu trích NGUYÊN VĂN từ bài học viên (để hệ thống highlight chính xác)",
      "corrected": "Câu đã được nâng cấp theo chuẩn Band 8.0+",
      "explanation": "Giải thích ngắn gọn lý do sửa bằng tiếng Việt",
      "type": "grammar" (lỗi ngữ pháp/thì/giới từ) HOẶC "vocabulary" (từ vựng cơ bản/lặp từ) HOẶC "cohesion" (liên kết câu/từ nối)
    }
  ],
  "modelAnswer": "Bài viết mẫu hoàn chỉnh đạt Band 8.5+ cho đúng đề bài này bằng tiếng Anh học thuật mẫu mực."
}

Quy tắc:
- Hãy tìm ít nhất 3-5 câu cần cải thiện trong bài học viên để đưa vào sentenceCorrections. Mỗi câu trích NGUYÊN VĂN từ bài viết học viên để hệ thống có thể đối chiếu và thay thế trực tiếp.
- Chấm điểm công tâm, nghiêm túc, chuẩn theo IELTS Band Descriptors chính thức của Cambridge.`;

    const chartDetailsText = chartDetails
      ? (typeof chartDetails === 'object' ? JSON.stringify(chartDetails, null, 2) : String(chartDetails))
      : 'Không có thông số phụ kèm theo.';

    const userMessage = `=== ĐỀ BÀI (PROMPT) ===
${prompt || 'IELTS Writing Prompt'}

${isTask1 ? `=== THÔNG SỐ VÀ DỮ LIỆU BIỂU ĐỒ GỐC (DÙNG ĐỂ ĐỐI CHIẾU SỐ LIỆU) ===
Dạng biểu đồ: ${chartType || 'Standard Chart'}
Dữ liệu chi tiết:
${chartDetailsText}` : `=== DẠNG BÀI TASK 2 (NẾU CÓ) ===
Dạng bài định hướng: ${essaySubtype || 'Tự động nhận diện'}`}

=== BÀI VIẾT CỦA HỌC VIÊN (${taskType.toUpperCase()}) ===
${essayContent}`;

    const analytics = computeWritingAnalytics(essayContent, taskType);

    for (const model of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 14000);

        const apiResponse = await fetch(geminiUrl, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\n---\n${userMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.15,
              maxOutputTokens: 2500
            }
          })
        });

        clearTimeout(timeoutId);

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          const candidateText = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = extractJsonFromText(candidateText);
            if (parsed && parsed.criteria) {
              const taBand = parsed.criteria?.taskAchievement?.band;
              const ccBand = parsed.criteria?.coherenceCohesion?.band;
              const lrBand = parsed.criteria?.lexicalResource?.band;
              const graBand = parsed.criteria?.grammaticalRange?.band;

              // W-02: Bắt buộc cả 4 criteria đều phải là số hữu hạn trong [0, 9]
              const criteriaList = [taBand, ccBand, lrBand, graBand];
              const isValidCriteria = criteriaList.every(
                b => typeof b === 'number' && !isNaN(b) && b >= 0 && b <= 9
              );

              if (isValidCriteria) {
                const avg = (taBand + ccBand + lrBand + graBand) / 4;
                parsed.overallBand = roundIeltsBand(avg);

                // Gắn kết quả Deep Analytics & Paragraph Audit
                parsed.academicAnalytics = parsed.academicAnalytics || analytics;
                parsed.paragraphAudit = parsed.paragraphAudit || analytics.paragraphAudit;

                // Đảm bảo type phân loại lỗi ('grammar' | 'vocabulary' | 'cohesion')
                if (Array.isArray(parsed.sentenceCorrections)) {
                  parsed.sentenceCorrections = parsed.sentenceCorrections.map((sc, idx) => {
                    let t = sc.type;
                    if (!t || !['grammar', 'vocabulary', 'cohesion'].includes(t)) {
                      t = idx % 3 === 0 ? 'grammar' : idx % 3 === 1 ? 'vocabulary' : 'cohesion';
                    }
                    return { ...sc, type: t };
                  });
                }

                // Tính toán điểm Writing tổng hợp nếu có điểm của Task kia
                if (previousTaskBand) {
                  const ptBand = parseFloat(previousTaskBand);
                  if (!isNaN(ptBand) && ptBand >= 0 && ptBand <= 9) {
                    const t1 = isTask1 ? parsed.overallBand : ptBand;
                    const t2 = isTask1 ? ptBand : parsed.overallBand;
                    const composite = calculateCompositeWritingBand(t1, t2);
                    parsed.compositeScore = {
                      task1Band: t1,
                      task2Band: t2,
                      compositeBand: composite,
                      formula: "round_0.5((T1 + 2 * T2) / 3)"
                    };
                  }
                }

                return res.json({
                  success: true,
                  status: 'scored',
                  source: `Gemini AI Senior Examiner (${model})`,
                  data: parsed
                });
              }
            }
          }
        } else {
          console.warn(`[Gemini Writing] Model ${model} HTTP ${apiResponse.status}`);
        }
      } catch (callErr) {
        console.warn(`[Gemini Writing] Model ${model} failed:`, callErr.message);
      }
    }

    // W-01: BỎ HOÀN TOÀN FAKE BAND KHI GEMINI OFFLINE / LỖI
    const wordCount = (essayContent || '').trim().split(/\s+/).filter(Boolean).length;
    return res.status(503).json({
      success: false,
      status: 'unavailable',
      errorCode: 'AI_GRADER_UNAVAILABLE',
      retryable: true,
      message: 'Chưa thể chấm bài bằng AI lúc này. Hệ thống không tạo điểm IELTS giả khi không có kết nối tới AI Examiner.',
      automatedDiagnostics: {
        wordCount,
        sentenceComplexity: analytics.sentenceComplexity,
        overusedWords: analytics.overusedWords,
        paragraphAudit: analytics.paragraphAudit
      }
    });
  } catch (error) {
    console.error('[gradeWriting error]', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi chấm bài viết. Vui lòng thử lại.'
    });
  }
};

// Controller chấm bài Speaking chuyên sâu theo từng Part (S-01, S-02, S-03)
exports.gradeSpeaking = async (req, res) => {
  try {
    const { part, topic, question, transcript, durationSeconds, cueCardBullets, hasAudio, audioUrl } = req.body;

    if (!transcript || transcript.trim().length < 5) {
      return res.status(400).json({
        success: false,
        message: "Nội dung câu trả lời quá ngắn hoặc chưa nhận diện được giọng nói."
      });
    }

    const partNum = parseInt(part, 10) || 1;
    const apiKey = (req.body.customApiKey || getLiveApiKey() || '').trim();

    // S-01: Không tạo fake band khi không có kết nối AI
    if (!apiKey || req.body.forceOffline) {
      return res.status(503).json({
        success: false,
        status: 'unavailable',
        errorCode: 'AI_GRADER_UNAVAILABLE',
        retryable: true,
        message: 'Hệ thống AI chấm bài nói hiện chưa khả dụng. Không tạo điểm IELTS ước tính khi không có kết nối tới AI Examiner.'
      });
    }

    const candidateModels = [
      'gemini-flash-lite-latest',
      'gemini-2.5-flash-lite',
      'gemini-2.5-flash',
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash'
    ];

    let partSpecificPrompt = '';
    if (partNum === 1) {
      partSpecificPrompt = `
=== QUY CHUẨN ĐÁNH GIÁ SPEAKING PART 1: PHỎNG VẤN CÁ NHÂN ===
- Mục tiêu: Đánh giá phản xạ trả lời câu hỏi, mức độ tự nhiên, khả năng mở rộng ý vừa đủ (khoảng 2-4 câu phát triển tự nhiên), và sử dụng ngữ pháp, từ vựng đời sống phù hợp.
- Tránh câu trả lời quá ngắn dạng "Yes/No" cụt lủn hoặc học thuộc lòng gượng gạo.
- Đánh giá xem câu trả lời có thẳng vào trọng tâm câu hỏi không.`;
    } else if (partNum === 2) {
      partSpecificPrompt = `
=== QUY CHUẨN ĐÁNH GIÁ SPEAKING PART 2: LONG TURN (CUE CARD) ===
- Mục tiêu: Kiểm tra khả năng nói dài có tổ chức, phát triển chủ đề theo các gợi ý trên Cue Card, chuyển ý mạch lạc và duy trì độ trôi chảy xuyên suốt.
- LƯU Ý QUAN TRỌNG: Thời lượng nói (${durationSeconds || 0} giây) là dữ liệu hỗ trợ theo dõi, KHÔNG PHẢI điểm band trực tiếp. Tiêu chí cốt lõi là cấu trúc bài nói, khả năng kể chuyện/mô tả và phát triển đề.
- Đánh giá xem học viên có bao quát các ý gợi ý trên Cue Card không: ${cueCardBullets ? JSON.stringify(cueCardBullets) : 'Các gợi ý đề bài'}.`;
    } else {
      partSpecificPrompt = `
=== QUY CHUẨN ĐÁNH GIÁ SPEAKING PART 3: THẢO LUẬN CHUYÊN SÂU ===
- Mục tiêu: Đánh giá khả năng giải thích, phân tích vấn đề trừu tượng mang tính xã hội vĩ mô, so sánh đa chiều, suy luận logic và khả năng ứng biến trước các câu hỏi đào sâu tiếp theo của giám khảo.
- Đánh giá xem câu trả lời có mang tính khách quan, khái quát (không chỉ dừng lại ở trải nghiệm cá nhân) không.`;
    }

    const systemInstruction = `Bạn là một Giám Khảo Khảo Thí IELTS Speaking Quốc Tế chuẩn Cambridge.
Học viên vừa hoàn thành phần trả lời bài nói IELTS Speaking Part ${partNum}.
Dưới đây là bản gỡ băng (transcript) giọng nói của học viên qua microphone.

4 TIÊU CHÍ ĐÁNH GIÁ CHUẨN IELTS (Mỗi tiêu chí 25%):
1. Fluency & Coherence: Độ trôi chảy, ngập ngừng, tự sửa lỗi, phát triển và kết nối ý.
2. Lexical Resource: Từ vựng đa dạng, phù hợp chủ đề, khả năng diễn đạt lại (paraphrase).
3. Grammatical Range & Accuracy: Cấu trúc câu, độ chính xác ngữ pháp, khả năng dùng câu phức.
4. Pronunciation: Âm riêng lẻ, trọng âm từ/câu, ngữ điệu, nhịp điệu, mức độ dễ hiểu.

${partSpecificPrompt}

LƯU Ý QUY TẮC HIỂN THỊ:
Speaking IELTS chính thức được đánh giá tổng thể qua cả 3 phần phỏng vấn. Vì vậy, phản hồi dưới đây là feedback luyện tập chuyên sâu cho Part ${partNum}.

Định dạng trả về: BẮT BUỘC LÀ ĐỐI TƯỢNG JSON DUY NHẤT:
{
  "estimatedBand": 6.5,
  "criteria": {
    "fluencyCoherence": { "band": 6.5, "comment": "Nhận xét chi tiết tiếng Việt..." },
    "lexicalResource": { "band": 6.5, "comment": "Nhận xét chi tiết tiếng Việt..." },
    "grammaticalRange": { "band": 6.5, "comment": "Nhận xét chi tiết tiếng Việt..." },
    "pronunciationFeedback": { "comment": "Nhận xét về ngữ điệu, nhịp điệu và mức độ dễ hiểu..." }
  },
  "partAudit": {
    "partName": "${partNum === 1 ? 'Part 1 - Phỏng vấn cá nhân' : partNum === 2 ? 'Part 2 - Long Turn (Cue Card)' : 'Part 3 - Thảo luận chuyên sâu'}",
    "focusEvaluation": "Nhận xét chuyên biệt theo đúng tiêu chí của Part này...",
    "keyStrengths": ["Điểm sáng 1", "Điểm sáng 2"],
    "keyWeaknesses": ["Điểm cần sửa 1", "Điểm cần sửa 2"],
    "timingFeedback": "Nhận xét về thời lượng nói ${durationSeconds || 0}s..."
  },
  "officialNote": "Speaking IELTS chính thức được đánh giá tổng thể qua cả bài phỏng vấn. Bảng nhận xét này tập trung đánh giá chuyên sâu cho Part ${partNum}.",
  "strengths": ["Điểm sáng 1", "Điểm sáng 2"],
  "weaknesses": ["Điểm cần sửa 1", "Điểm cần sửa 2"],
  "upgradedAnswer": "Câu trả lời mẫu bằng tiếng Anh tự nhiên Band 8.0+ bám sát ý tưởng của học viên...",
  "keyVocabulary": [
    {
      "word": "từ vựng học thuật hoặc collocation",
      "ipa": "/phiên âm/",
      "meaning": "nghĩa tiếng Việt",
      "exampleInAnswer": "ngữ cảnh trong câu trả lời mẫu"
    }
  ]
}`;

    const userMessage = `THÔNG TIN BÀI NÓI:
Phần thi: IELTS Speaking Part ${partNum}
Chủ đề: ${topic || 'General Topic'}
Câu hỏi: ${question || 'Speaking prompt'}
Thời lượng nói thực tế: ${durationSeconds || 0} giây
${cueCardBullets && cueCardBullets.length > 0 ? `Các gợi ý Cue Card: ${cueCardBullets.join('; ')}` : ''}

BẢN GỠ BĂNG CÂU TRẢ LỜI CỦA HỌC VIÊN:
"${transcript}"`;

    for (const model of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 14000);

        const apiResponse = await fetch(geminiUrl, {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemInstruction}\n\n---\n${userMessage}` }]
              }
            ],
            generationConfig: {
              temperature: 0.15,
              maxOutputTokens: 2500
            }
          })
        });

        clearTimeout(timeoutId);

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          const candidateText = apiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = extractJsonFromText(candidateText);
            if (parsed && parsed.criteria) {
              const isAudioAvailable = Boolean(hasAudio || audioUrl);

              // S-01 & S-02: Khi chỉ có transcript (không có audio file)
              if (!isAudioAvailable) {
                parsed.status = 'partial';
                parsed.requiresAudioForOverallBand = true;
                parsed.estimatedBand = null;
                parsed.criteria.pronunciationFeedback = {
                  band: null,
                  comment: 'Không có dữ liệu âm thanh để đánh giá phát âm (Pronunciation: N/A). Để có điểm phát âm chính xác và Overall Speaking Band, cần tải lên hoặc thu âm file audio trực tiếp.'
                };
                parsed.officialNote = 'Speaking IELTS chính thức yêu cầu đánh giá âm thanh trực tiếp. Đánh giá dưới đây là nhận xét ngôn ngữ (Vocabulary & Grammar) dựa trên transcript.';
              } else {
                parsed.status = 'scored';
                if (parsed.estimatedBand) {
                  parsed.estimatedBand = roundIeltsBand(parsed.estimatedBand);
                }
              }

              return res.json({
                success: true,
                status: parsed.status,
                source: `Gemini AI Speaking Coach (${model})`,
                data: parsed
              });
            }
          }
        } else {
          console.warn(`[Gemini Speaking] Model ${model} HTTP ${apiResponse.status}`);
        }
      } catch (callErr) {
        console.warn(`[Gemini Speaking] Model ${model} failed:`, callErr.message);
      }
    }

    // S-01: Trả về trạng thái unavailable thay vì tạo điểm giả
    return res.status(503).json({
      success: false,
      status: 'unavailable',
      errorCode: 'AI_GRADER_UNAVAILABLE',
      retryable: true,
      message: 'Chưa thể kết nối tới dịch vụ AI Speaking Examiner. Không tạo điểm IELTS giả khi ngoại tuyến.'
    });
  } catch (error) {
    console.error('[gradeSpeaking error]', error);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra khi chấm bài nói. Vui lòng thử lại.'
    });
  }
};

// API tính điểm Writing tổng hợp (W-06)
exports.calculateCompositeBand = (req, res) => {
  try {
    const { task1Band, task2Band } = req.body;
    const t1 = parseFloat(task1Band);
    const t2 = parseFloat(task2Band);

    if (isNaN(t1) || isNaN(t2) || t1 < 0 || t1 > 9 || t2 < 0 || t2 > 9) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp cả Task 1 Band và Task 2 Band hợp lệ (trong khoảng từ 0.0 đến 9.0).'
      });
    }

    const compositeBand = calculateCompositeWritingBand(t1, t2);
    const rawWeighted = ((t1 + 2 * t2) / 3).toFixed(3);

    return res.json({
      success: true,
      data: {
        task1Band: t1,
        task2Band: t2,
        rawWeighted: parseFloat(rawWeighted),
        compositeBand,
        formula: "Writing Band = round_0.5((T1 + 2 * T2) / 3)",
        roundingExplanation: "Quy tắc làm tròn IELTS: Trọng số Task 2 gấp đôi Task 1. Kết quả làm tròn đến mốc 0.5 gần nhất."
      }
    });
  } catch (err) {
    console.error('[calculateCompositeBand error]', err);
    res.status(500).json({ success: false, message: 'Lỗi tính toán điểm tổng hợp.' });
  }
};

// Exports helper dùng chung cho unit tests và controllers khác
exports.calculateCompositeWritingBand = calculateCompositeWritingBand;
exports.roundIeltsBand = roundIeltsBand;
exports.computeWritingAnalytics = computeWritingAnalytics;
exports.generateWritingFallback = generateWritingFallback;
exports.generateSpeakingFallback = generateSpeakingFallback;
exports.extractJsonFromText = extractJsonFromText;
