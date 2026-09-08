// controllers/englishController.js
// Xử lý toàn bộ logic nghiệp vụ API cho hệ thống học tiếng Anh tương tác:
// Flashcard SRS, Phát âm AI, Luyện nghe Karaoke/Dictation, Ghép câu & Gamification.

const db = require('../config/db');

// 1. Lấy danh sách Thẻ từ vựng Flashcard 3D (có hỗ trợ phân trang & lọc)
async function getFlashcards(req, res) {
  try {
    const { page = 1, limit = 20, topic = '', level = '', search = '', userId = 3 } = req.query;
    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    let whereClause = 'WHERE 1=1';
    const params = [userId];

    if (topic.trim()) {
      whereClause += ' AND f.topic = ?';
      params.push(topic.trim());
    }
    if (level.trim()) {
      whereClause += ' AND f.level = ?';
      params.push(level.trim());
    }
    if (search.trim()) {
      whereClause += ' AND (f.word LIKE ? OR f.meaning_vi LIKE ?)';
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    params.push(parseInt(limit, 10), offset);

    const [rows] = await db.query(
      `SELECT f.*, 
              COALESCE(p.srs_stage, 'new') AS srsStage,
              COALESCE(p.streak, 0) AS streak,
              p.next_review_at AS nextReviewAt
       FROM english_flashcards f
       LEFT JOIN user_srs_progress p ON p.card_id = f.id AND p.user_id = ?
       ${whereClause}
       ORDER BY f.id ASC
       LIMIT ? OFFSET ?`,
      params
    );

    // Chuẩn hóa định dạng trả về khớp với Frontend interface
    const cards = rows.map((r) => ({
      id: `fc-${r.id}`,
      dbId: r.id,
      word: r.word,
      partOfSpeech: r.part_of_speech,
      ipaUk: r.ipa_uk,
      ipaUs: r.ipa_us,
      meaningVi: r.meaning_vi,
      meaningEn: r.meaning_en,
      examples: typeof r.examples === 'string' ? JSON.parse(r.examples) : r.examples,
      collocations: typeof r.collocations === 'string' ? JSON.parse(r.collocations) : r.collocations || [],
      image: r.image_url,
      srsStage: r.srsStage,
      streak: r.streak,
      nextReviewAt: r.nextReviewAt,
    }));

    res.json({
      success: true,
      total: cards.length,
      page: parseInt(page, 10),
      data: cards,
    });
  } catch (err) {
    console.error('Lỗi getFlashcards:', err);
    res.status(500).json({ success: false, error: 'Không thể tải danh sách thẻ từ vựng.' });
  }
}

// 2. Ghi nhận đánh giá ôn tập Spaced Repetition (Again, Hard, Good, Easy)
async function reviewFlashcard(req, res) {
  try {
    const cardId = parseInt(req.params.id.replace('fc-', ''), 10);
    const { rating, userId = 3 } = req.body; // rating: 'again' | 'hard' | 'good' | 'easy'

    let intervalDays = 1;
    let srsStage = 'learning';
    let xpGain = 10;

    // Lấy thông tin SRS hiện tại của user cho thẻ này
    const [existing] = await db.query(
      'SELECT streak, interval_days, srs_stage FROM user_srs_progress WHERE user_id = ? AND card_id = ?',
      [userId, cardId]
    );

    let streak = existing.length > 0 ? existing[0].streak : 0;
    let currentInterval = existing.length > 0 ? existing[0].interval_days : 1;

    if (rating === 'again') {
      streak = 0;
      intervalDays = 1;
      srsStage = 'learning';
      xpGain = 5;
    } else if (rating === 'hard') {
      streak += 1;
      intervalDays = Math.max(1, Math.round(currentInterval * 1.2));
      srsStage = 'learning';
      xpGain = 10;
    } else if (rating === 'good') {
      streak += 1;
      intervalDays = Math.max(3, currentInterval * 2);
      srsStage = 'review';
      xpGain = 15;
    } else if (rating === 'easy') {
      streak += 1;
      intervalDays = Math.max(7, Math.round(currentInterval * 2.5));
      srsStage = 'mastered';
      xpGain = 20;
    }

    // Cập nhật hoặc thêm mới bản ghi tiến độ SRS
    await db.query(
      `INSERT INTO user_srs_progress 
       (user_id, card_id, srs_stage, streak, interval_days, next_review_at, last_reviewed_at, total_reviews)
       VALUES (?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), NOW(), 1)
       ON DUPLICATE KEY UPDATE 
         srs_stage = VALUES(srs_stage),
         streak = VALUES(streak),
         interval_days = VALUES(interval_days),
         next_review_at = DATE_ADD(NOW(), INTERVAL ? DAY),
         last_reviewed_at = NOW(),
         total_reviews = total_reviews + 1`,
      [userId, cardId, srsStage, streak, intervalDays, intervalDays, intervalDays]
    );

    // Cộng điểm XP vào thống kê học viên
    await db.query(
      `INSERT INTO user_english_stats (user_id, xp_total, xp_this_week, streak_days, last_active_date)
       VALUES (?, ?, ?, 1, CURDATE())
       ON DUPLICATE KEY UPDATE 
         xp_total = xp_total + VALUES(xp_total),
         xp_this_week = xp_this_week + VALUES(xp_this_week),
         last_active_date = CURDATE()`,
      [userId, xpGain, xpGain]
    );

    res.json({
      success: true,
      cardId,
      srsStage,
      streak,
      intervalDays,
      xpGained: xpGain,
      message: `Đã cập nhật lịch ôn tập sau ${intervalDays} ngày (+${xpGain} XP).`,
    });
  } catch (err) {
    console.error('Lỗi reviewFlashcard:', err);
    res.status(500).json({ success: false, error: 'Không thể lưu kết quả ôn tập SRS.' });
  }
}

// 3. Lấy danh sách Bài Luyện Phát Âm AI (Phoneme Speech Studio)
async function getSpeakingLessons(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM english_speaking_lessons ORDER BY id ASC');

    const lessons = rows.map((r) => ({
      id: `spk-${r.id}`,
      dbId: r.id,
      title: r.title,
      category: r.category,
      targetSentence: r.target_sentence,
      ipaFull: r.ipa_full,
      translationVi: r.translation_vi,
      difficulty: r.difficulty,
      tipsVi: r.tips_vi,
      audioDurationSeconds: r.audio_duration_seconds,
      words: typeof r.words === 'string' ? JSON.parse(r.words) : r.words,
    }));

    res.json({
      success: true,
      data: lessons,
    });
  } catch (err) {
    console.error('Lỗi getSpeakingLessons:', err);
    res.status(500).json({ success: false, error: 'Không thể tải bài luyện phát âm.' });
  }
}

// 4. Lưu kết quả chấm điểm phát âm AI
async function submitSpeakingEvaluation(req, res) {
  try {
    const lessonId = parseInt(req.params.id.replace('spk-', ''), 10);
    const { overallScore, userId = 3 } = req.body;

    const xpGain = overallScore >= 80 ? 25 : 15;

    // Cập nhật điểm phát âm trung bình và XP trong CSDL
    await db.query(
      `UPDATE user_english_stats 
       SET xp_total = xp_total + ?, 
           xp_this_week = xp_this_week + ?,
           speaking_accuracy_avg = ROUND((speaking_accuracy_avg * 4 + ?) / 5, 1)
       WHERE user_id = ?`,
      [xpGain, xpGain, overallScore, userId]
    );

    res.json({
      success: true,
      lessonId,
      overallScore,
      xpGained: xpGain,
      message: `Đã lưu kết quả phát âm ${overallScore}% (+${xpGain} XP).`,
    });
  } catch (err) {
    console.error('Lỗi submitSpeakingEvaluation:', err);
    res.status(500).json({ success: false, error: 'Không thể lưu kết quả phát âm.' });
  }
}

// 5. Lấy danh sách Bài Luyện Nghe & Karaoke Transcript / Dictation
async function getListeningLessons(req, res) {
  try {
    const [lessons] = await db.query('SELECT * FROM english_listening_lessons ORDER BY id ASC');

    const result = [];
    for (const l of lessons) {
      const [segments] = await db.query(
        'SELECT * FROM english_transcript_segments WHERE lesson_id = ? ORDER BY start_ms ASC',
        [l.id]
      );

      result.push({
        id: `lsn-${l.id}`,
        dbId: l.id,
        title: l.title,
        topic: l.topic,
        speakerName: l.speaker_name,
        speakerRole: l.speaker_role,
        level: l.level,
        audioDurationMs: l.audio_duration_ms,
        audioUrl: l.audio_url,
        segments: segments.map((s) => ({
          id: `seg-${s.id}`,
          startMs: s.start_ms,
          endMs: s.end_ms,
          speaker: s.speaker,
          textEn: s.text_en,
          textVi: s.text_vi,
          dictationBlanks: typeof s.dictation_blanks === 'string' ? JSON.parse(s.dictation_blanks) : s.dictation_blanks || [],
        })),
      });
    }

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error('Lỗi getListeningLessons:', err);
    res.status(500).json({ success: false, error: 'Không thể tải bài luyện nghe.' });
  }
}

// 6. Ghi nhận hoàn thành bài tập Dictation (Chép chính tả)
async function submitDictation(req, res) {
  try {
    const { correctCount, totalCount, userId = 3 } = req.body;
    const isPerfect = correctCount === totalCount && totalCount > 0;
    const xpGain = isPerfect ? 40 : 20;

    await db.query(
      `UPDATE user_english_stats 
       SET xp_total = xp_total + ?, 
           xp_this_week = xp_this_week + ?,
           listening_completed_count = listening_completed_count + 1
       WHERE user_id = ?`,
      [xpGain, xpGain, userId]
    );

    res.json({
      success: true,
      xpGained: xpGain,
      message: `Đã hoàn thành bài nghe chép chính tả (+${xpGain} XP).`,
    });
  } catch (err) {
    console.error('Lỗi submitDictation:', err);
    res.status(500).json({ success: false, error: 'Không thể lưu kết quả chép chính tả.' });
  }
}

// 7. Lấy danh sách Bài Tập Ghép Câu Ngữ Pháp (Sentence Builders)
async function getSentenceBuilders(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM english_sentence_builders ORDER BY id ASC');

    const exercises = rows.map((r) => ({
      id: `sb-${r.id}`,
      dbId: r.id,
      targetSentenceVi: r.target_sentence_vi,
      targetSentenceEn: r.target_sentence_en,
      correctWords: typeof r.correct_words === 'string' ? JSON.parse(r.correct_words) : r.correct_words,
      shuffledWords: typeof r.shuffled_words === 'string' ? JSON.parse(r.shuffled_words) : r.shuffled_words,
      explanationVi: r.explanation_vi,
      grammarTopic: r.grammar_topic,
      points: r.points,
      difficulty: r.difficulty,
    }));

    res.json({
      success: true,
      data: exercises,
    });
  } catch (err) {
    console.error('Lỗi getSentenceBuilders:', err);
    res.status(500).json({ success: false, error: 'Không thể tải bài tập ghép câu.' });
  }
}

// 8. Ghi nhận kết quả ghép câu chính xác
async function submitSentenceResult(req, res) {
  try {
    const exerciseId = parseInt(req.params.id.replace('sb-', ''), 10);
    const { points = 20, userId = 3 } = req.body;

    await db.query(
      `UPDATE user_english_stats 
       SET xp_total = xp_total + ?, 
           xp_this_week = xp_this_week + ?,
           grammar_mastered_count = grammar_mastered_count + 1
       WHERE user_id = ?`,
      [points, points, userId]
    );

    res.json({
      success: true,
      exerciseId,
      xpGained: points,
      message: `Ghép câu chính xác (+${points} XP).`,
    });
  } catch (err) {
    console.error('Lỗi submitSentenceResult:', err);
    res.status(500).json({ success: false, error: 'Không thể lưu kết quả ghép câu.' });
  }
}

// 9. Lấy Bảng Xếp Hạng Tuần (Weekly Leaderboard)
async function getLeaderboard(req, res) {
  try {
    const { userId = 3 } = req.query;

    const [rows] = await db.query(
      `SELECT u.id, u.full_name AS name, 
              COALESCE(s.xp_this_week, 0) AS xpThisWeek,
              COALESCE(s.streak_days, 0) AS streakDays,
              COALESCE(s.league, 'Bạch Kim') AS league
       FROM users u
       LEFT JOIN user_english_stats s ON s.user_id = u.id
       ORDER BY xpThisWeek DESC, streakDays DESC
       LIMIT 10`
    );

    const leaderboard = rows.map((r, idx) => ({
      rank: idx + 1,
      id: `user-${r.id}`,
      dbId: r.id,
      name: r.name,
      avatar: `https://images.unsplash.com/photo-${1535713875000 + r.id * 100}?w=120&auto=format&fit=crop&q=80`,
      xpThisWeek: r.xpThisWeek,
      streakDays: r.streakDays,
      league: r.league,
      isCurrentUser: r.id === parseInt(userId, 10),
    }));

    res.json({
      success: true,
      data: leaderboard,
    });
  } catch (err) {
    console.error('Lỗi getLeaderboard:', err);
    res.status(500).json({ success: false, error: 'Không thể tải bảng xếp hạng.' });
  }
}

// 10. Lấy thống kê cá nhân học viên (User Stats)
async function getUserStats(req, res) {
  try {
    const userId = parseInt(req.params.userId || 3, 10);

    const [rows] = await db.query(
      `SELECT s.*, u.full_name, u.email,
              (SELECT COUNT(*) FROM user_srs_progress WHERE user_id = ? AND srs_stage = 'mastered') AS masteredCount
       FROM user_english_stats s
       JOIN users u ON u.id = s.user_id
       WHERE s.user_id = ?`,
      [userId, userId]
    );

    if (rows.length === 0) {
      return res.json({
        success: true,
        data: {
          streakDays: 14,
          xpTotal: 2020,
          xpThisWeek: 2020,
          league: 'Bạch Kim',
          vocabLearned: 148,
          speakingAccuracy: 94.0,
          listeningCompleted: 32,
          grammarMastered: 28,
        },
      });
    }

    const s = rows[0];
    res.json({
      success: true,
      data: {
        userId: s.user_id,
        fullName: s.full_name,
        email: s.email,
        streakDays: s.streak_days,
        xpTotal: s.xp_total,
        xpThisWeek: s.xp_this_week,
        league: s.league,
        vocabLearned: s.vocab_learned_count,
        speakingAccuracy: s.speaking_accuracy_avg,
        listeningCompleted: s.listening_completed_count,
        grammarMastered: s.grammar_mastered_count,
      },
    });
  } catch (err) {
    console.error('Lỗi getUserStats:', err);
    res.status(500).json({ success: false, error: 'Không thể lấy thông tin thống kê người dùng.' });
  }
}

// ================= Phân Hệ AI Academic Writing Evaluator ================= //

const ACADEMIC_WORDS_SET = new Set([
  'accommodate', 'adjacent', 'advocate', 'aggregate', 'allocate', 'alter', 'alternative',
  'ambiguous', 'analogy', 'analyze', 'annual', 'anticipate', 'apparent', 'append',
  'appreciable', 'approach', 'appropriate', 'approximate', 'arbitrary', 'aspect', 'assemble',
  'assess', 'assign', 'assist', 'assume', 'assure', 'attain', 'attitude', 'attribute',
  'authoritative', 'automate', 'autonomous', 'capacity', 'category', 'cease', 'channel',
  'coherent', 'coincide', 'collapse', 'colleague', 'commence', 'compatible', 'compensate',
  'complement', 'complex', 'component', 'compound', 'comprehensive', 'comprise', 'compute',
  'conceive', 'conclude', 'concurrent', 'conduct', 'confer', 'confine', 'confirm',
  'conform', 'consent', 'consequent', 'considerable', 'consist', 'consistent', 'constant',
  'constitute', 'constrain', 'construct', 'consult', 'consume', 'contemporary', 'context',
  'contract', 'contradict', 'contrary', 'contrast', 'contribute', 'controversy', 'convene',
  'converse', 'convert', 'coordinate', 'core', 'corporate', 'correspond', 'crucial',
  'currency', 'cycle', 'debate', 'decade', 'decline', 'deduce', 'define', 'definite',
  'demonstrate', 'denote', 'deny', 'depress', 'derive', 'design', 'detect', 'deviate',
  'device', 'devote', 'differentiate', 'dimension', 'diminish', 'discrete', 'discriminate',
  'displace', 'display', 'dispose', 'distinct', 'distort', 'distribute', 'diverse',
  'document', 'domain', 'domestic', 'dominate', 'draft', 'drama', 'duration', 'dynamic',
  'economy', 'eliminate', 'emerge', 'emphasis', 'empirical', 'enable', 'encounter',
  'energy', 'enforce', 'enhance', 'enormous', 'ensure', 'entity', 'environment', 'equate',
  'equip', 'equivalent', 'erode', 'error', 'establish', 'estate', 'estimate', 'ethic',
  'ethnic', 'evaluate', 'eventual', 'evident', 'evolve', 'exceed', 'exclude', 'exhibit',
  'expand', 'expert', 'explicit', 'exploit', 'export', 'expose', 'external', 'extract',
  'facilitate', 'factor', 'feature', 'federal', 'fee', 'file', 'final', 'finance',
  'finite', 'flexible', 'fluctuate', 'focus', 'format', 'formula', 'forthcoming', 'foundation',
  'framework', 'function', 'fund', 'fundamental', 'furthermore', 'gender', 'generate',
  'generation', 'globe', 'goal', 'grade', 'grant', 'guarantee', 'guideline', 'hence',
  'hierarchy', 'highlight', 'hypothesis', 'identical', 'identify', 'ideology', 'ignore',
  'illustrate', 'image', 'immigrate', 'impact', 'implement', 'implicate', 'implicit',
  'imply', 'impose', 'incentive', 'incidence', 'incline', 'income', 'incorporate',
  'index', 'indicate', 'individual', 'induce', 'inevitable', 'infer', 'infrastructure',
  'inherent', 'inhibit', 'initial', 'initiate', 'injure', 'innovate', 'input', 'insert',
  'insight', 'inspect', 'instance', 'institute', 'instruct', 'integral', 'integrate',
  'integrity', 'intelligence', 'intense', 'interact', 'intermediate', 'internal',
  'interpret', 'interval', 'intervene', 'intrinsic', 'invest', 'investigate', 'invoke',
  'involve', 'isolate', 'issue', 'item', 'job', 'journal', 'justify', 'label', 'labor',
  'layer', 'lecture', 'legal', 'legislate', 'levy', 'liberal', 'license', 'likewise',
  'link', 'locate', 'logic', 'maintain', 'major', 'manipulate', 'manual', 'margin',
  'mature', 'maximize', 'mechanism', 'media', 'mediate', 'medical', 'medium', 'mental',
  'method', 'migrate', 'military', 'minimal', 'minimize', 'minimum', 'ministry', 'minor',
  'mode', 'modify', 'monitor', 'motive', 'mutual', 'negate', 'network', 'neutral',
  'nevertheless', 'nonetheless', 'norm', 'normal', 'notion', 'notwithstanding', 'nuclear',
  'objective', 'obtain', 'obvious', 'occupy', 'occur', 'odd', 'offset', 'ongoing',
  'option', 'orient', 'outcome', 'output', 'overall', 'overlap', 'overseas', 'panel',
  'paradigm', 'paragraph', 'parallel', 'parameter', 'participate', 'partner', 'passive',
  'perceive', 'percent', 'period', 'persist', 'perspective', 'phase', 'phenomenon',
  'philosophy', 'physical', 'plus', 'policy', 'portion', 'pose', 'positive', 'potential',
  'practitioner', 'precede', 'precise', 'predict', 'predominant', 'preliminary', 'presume',
  'previous', 'primary', 'prime', 'principal', 'principle', 'prior', 'priority', 'proceed',
  'process', 'professional', 'prohibit', 'project', 'promote', 'proportion', 'prospect',
  'protocol', 'psychology', 'publication', 'publish', 'purchase', 'pursue', 'qualitative',
  'quote', 'radical', 'random', 'range', 'ratio', 'rational', 'react', 'recover',
  'refine', 'regime', 'region', 'register', 'regulate', 'reinforce', 'reject', 'relax',
  'release', 'relevant', 'reluctance', 'rely', 'remove', 'require', 'research', 'reside',
  'resolve', 'resource', 'respond', 'restore', 'restrain', 'restrict', 'retain', 'reveal',
  'revenue', 'reverse', 'revise', 'revolution', 'rigid', 'role', 'route', 'scenario',
  'schedule', 'scheme', 'scope', 'section', 'sector', 'secure', 'seek', 'select',
  'sequence', 'series', 'shift', 'significant', 'similar', 'simulate', 'site', 'so-called',
  'sole', 'somewhat', 'source', 'specific', 'specify', 'sphere', 'stable', 'statistic',
  'status', 'straightforward', 'strategy', 'stress', 'structure', 'style', 'submit',
  'subordinate', 'subsequent', 'subsidy', 'substitute', 'successor', 'sufficient', 'sum',
  'summary', 'supplement', 'survey', 'survive', 'suspend', 'sustain', 'symbol', 'tape',
  'target', 'task', 'team', 'technical', 'technique', 'technology', 'temporary', 'tense',
  'terminate', 'text', 'theme', 'theory', 'thereby', 'thesis', 'topic', 'trace',
  'tradition', 'transfer', 'transform', 'transit', 'transmit', 'transport', 'trend',
  'trigger', 'ultimate', 'undergo', 'underlie', 'undertake', 'uniform', 'unify', 'unique',
  'utilize', 'valid', 'vary', 'vehicle', 'version', 'via', 'violate', 'virtual',
  'visible', 'vision', 'visual', 'volume', 'voluntary', 'welfare', 'whereas', 'whereby',
  'widespread', 'proliferation', 'precipitate', 'exacerbate', 'disparity', 'catalyze',
  'obsolete', 'obsolescence', 'vocations', 'empirical', 'multifaceted', 'supersede',
  'delineate', 'exponential', 'trajectory', 'conducive', 'articulate', 'socioeconomic',
  'counterbalance', 'profound', 'unprecedented', 'democratize', 'accommodate',
  'reconcile', 'holistic', 'interpersonal', 'spontaneous', 'collaborate', 'replicate',
  'supplement', 'autonomy', 'mitigate', 'substantiate', 'paramount'
]);

const COHESIVE_PATTERNS = [
  'furthermore', 'moreover', 'in addition', 'additionally', 'consequently',
  'as a consequence', 'as a result', 'conversely', 'on the other hand',
  'on the contrary', 'in contrast', 'nonetheless', 'nevertheless', 'therefore',
  'hence', 'thus', 'for instance', 'for example', 'specifically', 'in particular',
  'to illustrate', 'in conclusion', 'to summarize', 'in summary', 'overall',
  'on the one hand', 'first and foremost', 'subsequently'
];

const COLLOCATION_MAP = [
  { regex: /\bmake money\b/gi, suggestion: 'generate revenue / earn a livelihood', reason: 'Nâng cấp từ ngữ giao tiếp sang văn phong học thuật' },
  { regex: /\bgood thing\b/gi, suggestion: 'conducive catalyst / advantageous factor', reason: 'Thay thế tính từ đơn giản bằng cụm từ Band 7.5+' },
  { regex: /\bbad thing\b/gi, suggestion: 'detrimental impact / adverse consequence', reason: 'Diễn đạt chính xác và mang tính học thuật cao' },
  { regex: /\ba lot of\b/gi, suggestion: 'a substantial proportion of / an abundance of', reason: 'Tránh dùng "a lot of" trong bài viết học thuật' },
  { regex: /\bbig problem\b/gi, suggestion: 'pressing predicament / formidable challenge', reason: 'Tăng điểm tiêu chí Lexical Resource' },
  { regex: /\bkids\b/gi, suggestion: 'adolescents / offspring / juvenile demographics', reason: 'Sử dụng danh từ trang trọng chuẩn Cambridge' },
  { regex: /\bfix (the )?problem\b/gi, suggestion: 'rectify the issue / alleviate the crisis', reason: 'Collocation học thuật tự nhiên' },
  { regex: /\bvery important\b/gi, suggestion: 'of paramount importance / instrumental', reason: 'Cụm diễn đạt điểm cao cho IELTS Task 2' },
];

// 11. Lấy danh sách đề bài viết học thuật (prompts)
async function getWritingPrompts(req, res) {
  try {
    const { taskType = '' } = req.query;
    let query = 'SELECT * FROM english_writing_prompts';
    const params = [];

    if (taskType.trim()) {
      query += ' WHERE task_type = ?';
      params.push(taskType.trim());
    }
    query += ' ORDER BY id ASC';

    const [rows] = await db.query(query, params);

    const data = rows.map((r) => ({
      id: r.id,
      title: r.title,
      taskType: r.task_type,
      category: r.category,
      promptText: r.prompt_text,
      chartImageUrl: r.chart_image_url,
      targetBand: r.target_band,
      minWords: r.min_words,
      suggestedIdeas: typeof r.suggested_ideas === 'string' ? JSON.parse(r.suggested_ideas) : r.suggested_ideas || [],
      sampleBand8Essay: r.sample_band8_essay,
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error('Lỗi getWritingPrompts:', err);
    res.status(500).json({ success: false, error: 'Không thể tải danh sách đề thi viết.' });
  }
}

// 12. Chấm điểm & Phân tích bài luận học thuật theo 4 tiêu chuẩn Cambridge IELTS
async function evaluateWritingEssay(req, res) {
  try {
    const { promptId, essayText = '', timeSpentSeconds = 1200, userId = 3 } = req.body;

    if (!essayText.trim() || essayText.trim().length < 20) {
      return res.status(400).json({ success: false, error: 'Bài viết quá ngắn để phân tích học thuật.' });
    }

    // Lấy thông tin đề bài
    const [promptRows] = await db.query('SELECT * FROM english_writing_prompts WHERE id = ?', [promptId]);
    const prompt = promptRows[0] || {
      task_type: 'task_2',
      min_words: 250,
      title: 'Academic Writing Task',
    };

    const cleanText = essayText.trim();
    const words = cleanText.match(/\b[a-zA-Z'-]+\b/g) || [];
    const wordCount = words.length;

    // Phân tích các câu & đoạn văn
    const paragraphs = cleanText.split(/\n+/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;
    const sentences = cleanText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length || 1;

    // A. Phân tích Lexical Resource (AWL & C1/C2)
    const awlFoundSet = new Set();
    words.forEach((w) => {
      const lower = w.toLowerCase();
      if (ACADEMIC_WORDS_SET.has(lower)) {
        awlFoundSet.add(lower);
      }
    });
    const awlWordsUsed = Array.from(awlFoundSet);
    const awlRatio = wordCount > 0 ? (awlWordsUsed.length / wordCount) * 100 : 0;

    // Kiểm tra gợi ý Collocations
    const collocationSuggestions = [];
    for (const item of COLLOCATION_MAP) {
      if (item.regex.test(cleanText)) {
        collocationSuggestions.push({
          matched: item.regex.source.replace(/\\b/g, ''),
          suggestion: item.suggestion,
          reason: item.reason,
        });
      }
    }

    // B. Phân tích Coherence & Cohesion (CC)
    const cohesiveDevicesFound = [];
    const lowerEssay = cleanText.toLowerCase();
    for (const pattern of COHESIVE_PATTERNS) {
      if (lowerEssay.includes(pattern)) {
        cohesiveDevicesFound.push(pattern);
      }
    }

    // C. Chấm điểm 4 tiêu chuẩn Cambridge (Thang 1.0 - 9.0)
    let tr = 6.5;
    let cc = 6.5;
    let lr = 6.5;
    let gra = 6.5;

    // TR: Task Response
    const minWords = prompt.min_words || 250;
    if (wordCount < minWords * 0.6) {
      tr = 4.5;
    } else if (wordCount < minWords * 0.85) {
      tr = 5.5;
    } else if (wordCount >= minWords) {
      tr = paragraphCount >= 3 ? 7.5 : 6.5;
      if (wordCount >= minWords + 30 && paragraphCount >= 4) {
        tr = 8.0;
      }
    }

    // CC: Coherence & Cohesion
    if (cohesiveDevicesFound.length >= 6 && paragraphCount >= 4) {
      cc = 8.0;
    } else if (cohesiveDevicesFound.length >= 4 && paragraphCount >= 3) {
      cc = 7.5;
    } else if (cohesiveDevicesFound.length >= 2) {
      cc = 6.5;
    } else {
      cc = 5.5;
    }

    // LR: Lexical Resource
    if (awlWordsUsed.length >= 14 || awlRatio >= 6.0) {
      lr = 8.5;
    } else if (awlWordsUsed.length >= 8 || awlRatio >= 4.0) {
      lr = 7.5;
    } else if (awlWordsUsed.length >= 4) {
      lr = 6.5;
    } else {
      lr = 5.5;
    }

    // GRA: Grammatical Range & Accuracy
    const complexIndicators = ['although', 'while', 'whereas', 'despite', 'because', 'which', 'that', 'if', 'unless', 'provided'];
    let complexCount = 0;
    complexIndicators.forEach((ind) => {
      if (lowerEssay.includes(ind)) complexCount += 1;
    });

    if (complexCount >= 5 && sentenceCount >= 8) {
      gra = 8.0;
    } else if (complexCount >= 3) {
      gra = 7.0;
    } else {
      gra = 6.0;
    }

    // Overall Band Calculation (Standard IELTS rounding to 0.5)
    const rawAverage = (tr + cc + lr + gra) / 4;
    const bandOverall = Math.round(rawAverage * 2) / 2;

    // Quy đổi khung tham chiếu CEFR
    let cefrLevel = 'B2';
    if (bandOverall >= 8.5) cefrLevel = 'C2 Mastery';
    else if (bandOverall >= 7.0) cefrLevel = 'C1 Advanced';
    else if (bandOverall >= 5.5) cefrLevel = 'B2 Independent';
    else cefrLevel = 'B1 Threshold';

    // Tổng hợp nhận xét giám khảo AI
    const strengths = [];
    const improvements = [];

    if (wordCount >= minWords) {
      strengths.push(`Độ dài bài viết đạt chuẩn (${wordCount}/${minWords} từ), đáp ứng tốt yêu cầu định lượng của đề thi.`);
    } else {
      improvements.push(`Bài viết bị thiếu từ (${wordCount}/${minWords} từ). Trong kỳ thi thật, điều này sẽ bị trừ điểm tiêu chí Task Response.`);
    }

    if (awlWordsUsed.length >= 5) {
      strengths.push(`Sử dụng ấn tượng ${awlWordsUsed.length} từ vựng học thuật thuộc danh mục Academic Word List (AWL) như: "${awlWordsUsed.slice(0, 4).join('", "')}".`);
    } else {
      improvements.push(`Cần bổ sung thêm các danh từ và tính từ mang tính học thuật (AWL/C1) để nâng tiêu chí Lexical Resource lên Band 7.5+.`);
    }

    if (cohesiveDevicesFound.length >= 3) {
      strengths.push(`Tổ chức bài viết mạch lạc với các liên từ học thuật: "${cohesiveDevicesFound.slice(0, 3).join('", "')}".`);
    } else {
      improvements.push(`Nên đa dạng hóa các cấu trúc từ nối giữa các đoạn (ví dụ: Furthermore, Conversely, As a consequence).`);
    }

    if (paragraphCount >= 4) {
      strengths.push('Cấu trúc bố cục chuẩn 4 đoạn: Mở bài (Introduction), 2 Thân bài (Body Paragraphs) và Kết luận (Conclusion).');
    } else {
      improvements.push('Cần chia rõ thành 4 đoạn văn biệt lập để tăng tính mạch lạc.');
    }

    const evaluationDetails = {
      wordCount,
      paragraphCount,
      sentenceCount,
      awlWordsUsed,
      awlRatio: Math.round(awlRatio * 10) / 10,
      cohesiveDevicesFound,
      collocationSuggestions,
      strengths,
      improvements,
    };

    // Lưu vào MySQL
    const [subResult] = await db.query(
      `INSERT INTO english_writing_submissions 
       (user_id, prompt_id, essay_text, word_count, time_spent_seconds, band_overall, band_tr, band_cc, band_lr, band_gra, cefr_level, evaluation_details)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        promptId,
        cleanText,
        wordCount,
        timeSpentSeconds,
        bandOverall,
        tr,
        cc,
        lr,
        gra,
        cefrLevel,
        JSON.stringify(evaluationDetails),
      ]
    );

    // Thưởng 50 XP cho học viên vào user_english_stats
    const xpGained = 50;
    await db.query(
      `UPDATE user_english_stats 
       SET xp_total = xp_total + ?, xp_this_week = xp_this_week + ? 
       WHERE user_id = ?`,
      [xpGained, xpGained, userId]
    );

    res.json({
      success: true,
      data: {
        submissionId: subResult.insertId,
        bandOverall,
        bandTR: tr,
        bandCC: cc,
        bandLR: lr,
        bandGRA: gra,
        cefrLevel,
        xpGained,
        evaluationDetails,
        sampleBand8Essay: prompt.sample_band8_essay,
      },
    });
  } catch (err) {
    console.error('Lỗi evaluateWritingEssay:', err);
    res.status(500).json({ success: false, error: 'Lỗi trong quá trình phân tích bài luận AI.' });
  }
}

// 13. Lấy lịch sử bài viết của học viên
async function getWritingHistory(req, res) {
  try {
    const { userId = 3 } = req.query;

    const [rows] = await db.query(
      `SELECT s.id, s.prompt_id, s.word_count, s.time_spent_seconds, s.band_overall,
              s.band_tr, s.band_cc, s.band_lr, s.band_gra, s.cefr_level, s.created_at,
              p.title AS prompt_title, p.task_type AS prompt_task_type
       FROM english_writing_submissions s
       LEFT JOIN english_writing_prompts p ON p.id = s.prompt_id
       WHERE s.user_id = ?
       ORDER BY s.id DESC
       LIMIT 20`,
      [userId]
    );

    const history = rows.map((r) => ({
      id: r.id,
      promptId: r.prompt_id,
      promptTitle: r.prompt_title,
      taskType: r.prompt_task_type,
      wordCount: r.word_count,
      timeSpentSeconds: r.time_spent_seconds,
      bandOverall: Number(r.band_overall),
      bandTR: Number(r.band_tr),
      bandCC: Number(r.band_cc),
      bandLR: Number(r.band_lr),
      bandGRA: Number(r.band_gra),
      cefrLevel: r.cefr_level,
      createdAt: r.created_at,
    }));

    res.json({ success: true, data: history });
  } catch (err) {
    console.error('Lỗi getWritingHistory:', err);
    res.status(500).json({ success: false, error: 'Không thể lấy lịch sử bài viết.' });
  }
}

module.exports = {
  getFlashcards,
  reviewFlashcard,
  getSpeakingLessons,
  submitSpeakingEvaluation,
  getListeningLessons,
  submitDictation,
  getSentenceBuilders,
  submitSentenceResult,
  getLeaderboard,
  getUserStats,
  getWritingPrompts,
  evaluateWritingEssay,
  getWritingHistory,
};
