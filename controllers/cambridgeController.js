// controllers/cambridgeController.js
// Quản lý nghiệp vụ khảo thí Cambridge IELTS (Reading, Listening, Dictation, Anki SRS) từ CSDL MySQL

const db = require('../config/db');

// In-memory fallback lưu lịch sử làm bài theo userId khi MySQL offline: userId -> TestAttempt[]
const memoryUserAttempts = new Map();

// Canonical IELTS Academic Reading Band Scale (0-40 questions)
function calculateAcademicReadingBand(correctCount) {
  const c = Math.max(0, Math.min(40, Math.round(Number(correctCount) || 0)));
  if (c >= 39) return 9.0;
  if (c >= 37) return 8.5;
  if (c >= 35) return 8.0;
  if (c >= 33) return 7.5;
  if (c >= 30) return 7.0;
  if (c >= 27) return 6.5;
  if (c >= 23) return 6.0;
  if (c >= 19) return 5.5;
  if (c >= 15) return 5.0;
  if (c >= 13) return 4.5;
  if (c >= 10) return 4.0;
  if (c >= 8) return 3.5;
  if (c >= 6) return 3.0;
  if (c >= 4) return 2.5;
  if (c >= 1) return 2.0;
  return 0.0;
}

// Band calculator for single passage or partial reading test (scaled proportionally to 40)
function calculateEstimatedReadingBand(correct, total) {
  if (!total || total <= 0) return 0.0;
  if (total === 40) return calculateAcademicReadingBand(correct);
  const scaledCorrect = Math.round((correct / total) * 40);
  return calculateAcademicReadingBand(scaledCorrect);
}

// Helper hàm chuẩn hóa câu trả lời (trim, collapse whitespace, lowercase)
function normalizeReadingAnswer(str) {
  return String(str || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

// ==================== 1. CAMBRIDGE READING ====================

// Lấy danh sách toàn bộ bài đọc kèm số lượng câu hỏi và từ vựng
exports.getReadingPassages = async (req, res) => {
  try {
    const [passages] = await db.query(`
      SELECT 
        p.id, p.title, p.subtitle, p.source, p.topic, p.difficulty, 
        p.estimated_minutes AS estimatedMinutes, p.word_count AS wordCount,
        p.created_at AS createdAt,
        COUNT(DISTINCT q.id) AS questionCount,
        COUNT(DISTINCT tw.id) AS targetWordCount
      FROM cambridge_reading_passages p
      LEFT JOIN cambridge_reading_questions q ON p.id = q.passage_id
      LEFT JOIN cambridge_target_words tw ON p.id = tw.passage_id
      GROUP BY p.id
      ORDER BY p.source ASC, p.id ASC
    `);

    res.json({
      success: true,
      count: passages.length,
      data: passages
    });
  } catch (error) {
    console.error('Lỗi getReadingPassages:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy danh sách bài đọc.' });
  }
};

// Lấy chi tiết bài đọc (gồm các đoạn văn, 13-14 câu hỏi, từ vựng C1-C2)
exports.getReadingPassageById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[passage]] = await db.query(
      'SELECT * FROM cambridge_reading_passages WHERE id = ?',
      [id]
    );

    if (!passage) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài đọc.' });
    }

    // Lấy câu hỏi
    const [questions] = await db.query(
      'SELECT * FROM cambridge_reading_questions WHERE passage_id = ? ORDER BY question_number ASC',
      [id]
    );

    // Lấy từ vựng mục tiêu
    const [targetWords] = await db.query(
      'SELECT * FROM cambridge_target_words WHERE passage_id = ?',
      [id]
    );

    // Format dữ liệu khớp với Interface của Frontend
    const formattedPassage = {
      id: passage.id,
      title: passage.title,
      subtitle: passage.subtitle,
      source: passage.source,
      topic: passage.topic,
      difficulty: passage.difficulty,
      estimatedMinutes: passage.estimated_minutes,
      wordCount: passage.word_count,
      paragraphs: typeof passage.paragraphs === 'string' ? JSON.parse(passage.paragraphs) : passage.paragraphs,
      questions: questions.map((q) => ({
        id: q.id,
        number: q.question_number,
        type: q.type,
        groupHeader: q.group_header,
        groupInstruction: q.group_instruction,
        prompt: q.prompt,
        options: q.options ? (typeof q.options === 'string' ? JSON.parse(q.options) : q.options) : undefined,
        correctAnswer: q.correct_answer,
        acceptableAnswers: q.acceptable_answers ? (typeof q.acceptable_answers === 'string' ? JSON.parse(q.acceptable_answers) : q.acceptable_answers) : undefined,
        academicExplanation: q.academic_explanation,
        paragraphRef: q.paragraph_ref
      })),
      targetWords: targetWords.map((tw) => ({
        id: tw.id,
        word: tw.word,
        partOfSpeech: tw.part_of_speech,
        ipa: tw.ipa,
        meaningEn: tw.meaning_en,
        meaningVi: tw.meaning_vi,
        contextSentence: tw.context_sentence,
        audioUrl: tw.audio_url
      }))
    };

    res.json({
      success: true,
      data: formattedPassage
    });
  } catch (error) {
    console.error('Lỗi getReadingPassageById:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy chi tiết bài đọc.' });
  }
};

// Chấm điểm bài thi ngầm ở server (Bảo mật, lưu kết quả CSDL)
exports.submitExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { userAnswers = {}, timeTakenSeconds = 0 } = req.body;
    const sessionUserId = (req.session && req.session.user && req.session.user.id) || (req.session && req.session.userId) || null;

    const [questions] = await db.query(
      'SELECT * FROM cambridge_reading_questions WHERE passage_id = ? ORDER BY question_number ASC',
      [id]
    );

    if (questions.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi cho bài thi này.' });
    }

    let correctCount = 0;
    const evaluatedQuestions = questions.map((q) => {
      const userNorm = normalizeReadingAnswer(userAnswers[q.id]);
      let isCorrect = false;

      if (userNorm) {
        const acceptable = [
          normalizeReadingAnswer(q.correct_answer),
          ...(q.acceptable_answers ? (typeof q.acceptable_answers === 'string' ? JSON.parse(q.acceptable_answers) : q.acceptable_answers).map(normalizeReadingAnswer) : [])
        ].filter(Boolean);

        if (acceptable.includes(userNorm)) {
          isCorrect = true;
          correctCount++;
        }
      }

      return {
        id: q.id,
        number: q.question_number,
        userAnswer: userAnswers[q.id] || '',
        correctAnswer: q.correct_answer,
        isCorrect,
        academicExplanation: q.academic_explanation,
        paragraphRef: q.paragraph_ref
      };
    });

    const totalCount = questions.length;
    const bandScore = calculateEstimatedReadingBand(correctCount, totalCount);
    const percentage = Math.round((correctCount / totalCount) * 100);
    const xpEarned = Math.max(30, correctCount * 10);

    // P1-04: Lưu kết quả vào CSDL nếu người dùng đã đăng nhập (không gán bừa vào user_id = 1)
    if (sessionUserId) {
      try {
        await db.query(
          `INSERT INTO user_cambridge_exam_results
            (passage_id, user_id, correct_count, total_count, band_score, percentage, time_taken_seconds, user_answers, xp_earned)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            id,
            sessionUserId,
            correctCount,
            totalCount,
            bandScore,
            percentage,
            timeTakenSeconds,
            JSON.stringify(userAnswers),
            xpEarned
          ]
        );
      } catch (saveErr) {
        console.warn('Lưu kết quả user_cambridge_exam_results thất bại:', saveErr.message);
      }
    }

    res.json({
      success: true,
      data: {
        correctCount,
        totalCount,
        bandScore,
        percentage,
        xpEarned,
        evaluatedQuestions
      }
    });
  } catch (error) {
    console.error('Lỗi submitExam:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi chấm bài thi.' });
  }
};

// Chấm điểm Full Test Reading (40 câu, nhiều Passage) trực tiếp trên server
exports.submitReadingFullTest = async (req, res) => {
  try {
    const sessionUserId = req.session && req.session.user && req.session.user.id;
    const { testId, passageIds = [], userAnswers = {}, timeTakenSeconds = 0, attemptId } = req.body;

    if (!passageIds || !Array.isArray(passageIds) || passageIds.length === 0) {
      return res.status(400).json({ success: false, message: 'Thiếu danh sách passageIds cho Full Test.' });
    }

    // Lấy toàn bộ câu hỏi của các passage thuộc test
    const [questions] = await db.query(
      'SELECT * FROM cambridge_reading_questions WHERE passage_id IN (?) ORDER BY passage_id ASC, question_number ASC',
      [passageIds]
    );

    if (questions.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi cho các bài đọc đã chọn.' });
    }

    let correctCount = 0;
    const evaluatedQuestions = questions.map((q) => {
      const rawUserAns = userAnswers[q.id] || '';
      const userNorm = normalizeReadingAnswer(rawUserAns);
      let isCorrect = false;

      if (userNorm.length > 0) {
        const correctNorm = normalizeReadingAnswer(q.correct_answer);
        let acceptableList = [];
        if (q.acceptable_answers) {
          try {
            acceptableList = (typeof q.acceptable_answers === 'string' ? JSON.parse(q.acceptable_answers) : q.acceptable_answers)
              .map(normalizeReadingAnswer)
              .filter(Boolean);
          } catch (e) {}
        }
        const validAnswers = [correctNorm, ...acceptableList].filter(Boolean);
        if (validAnswers.includes(userNorm)) {
          isCorrect = true;
          correctCount++;
        }
      }

      return {
        id: q.id,
        passageId: q.passage_id,
        number: q.question_number,
        userAnswer: rawUserAns,
        correctAnswer: q.correct_answer,
        isCorrect,
        academicExplanation: q.academic_explanation,
        paragraphRef: q.paragraph_ref
      };
    });

    const totalCount = questions.length;
    const bandScore = totalCount === 40 
      ? calculateAcademicReadingBand(correctCount)
      : calculateEstimatedReadingBand(correctCount, totalCount);
    const percentage = Math.round((correctCount / totalCount) * 100);
    const xpEarned = Math.max(50, correctCount * 10);

    const verifiedAttemptId = attemptId || `full-reading-${Date.now()}`;

    // Lưu kết quả nếu user đã đăng nhập
    if (sessionUserId) {
      try {
        await db.query(
          `INSERT INTO user_cambridge_exam_results
            (passage_id, user_id, correct_count, total_count, band_score, percentage, time_taken_seconds, user_answers, xp_earned)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            passageIds[0],
            String(sessionUserId),
            correctCount,
            totalCount,
            bandScore,
            percentage,
            timeTakenSeconds,
            JSON.stringify(userAnswers),
            xpEarned
          ]
        );
      } catch (dbErr) {
        console.warn('MySQL submitReadingFullTest warning:', dbErr.message);
      }
    }

    return res.json({
      success: true,
      data: {
        attemptId: verifiedAttemptId,
        testId: testId || 'cambridge-full-reading',
        correctCount,
        totalCount,
        bandScore,
        percentage,
        xpEarned,
        evaluatedQuestions
      }
    });
  } catch (error) {
    console.error('Lỗi submitReadingFullTest:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi chấm bài Full Test.' });
  }
};

// ==================== 2. CAMBRIDGE LISTENING ====================

// Lấy danh sách toàn bộ bài nghe
exports.getListeningTests = async (req, res) => {
  try {
    const [tests] = await db.query(`
      SELECT 
        lt.id, lt.title, lt.source, lt.part, lt.speaker_accent AS speakerAccent,
        lt.wpm, lt.estimated_minutes AS estimatedMinutes, lt.audio_url AS audioUrl,
        lt.instructions, lt.created_at AS createdAt,
        COUNT(ds.id) AS sentenceCount
      FROM cambridge_listening_tests lt
      LEFT JOIN cambridge_dictation_sentences ds ON lt.id = ds.test_id
      GROUP BY lt.id
      ORDER BY lt.source ASC, lt.part ASC
    `);

    res.json({
      success: true,
      count: tests.length,
      data: tests
    });
  } catch (error) {
    console.error('Lỗi getListeningTests:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy danh sách bài nghe.' });
  }
};

// Lấy chi tiết bài nghe kèm các câu Dictation Audio Slicing
exports.getListeningTestById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[test]] = await db.query(
      'SELECT * FROM cambridge_listening_tests WHERE id = ?',
      [id]
    );

    if (!test) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài nghe.' });
    }

    const [sentences] = await db.query(
      'SELECT * FROM cambridge_dictation_sentences WHERE test_id = ? ORDER BY sentence_order ASC',
      [id]
    );

    const formattedTest = {
      id: test.id,
      title: test.title,
      source: test.source,
      part: test.part,
      speakerAccent: test.speaker_accent,
      wpm: test.wpm,
      estimatedMinutes: test.estimated_minutes,
      audioUrl: test.audio_url,
      instructions: test.instructions,
      sentences: sentences.map((s) => ({
        id: s.id,
        order: s.sentence_order,
        startTimeMs: s.start_time_ms,
        endTimeMs: s.end_time_ms,
        textEn: s.text_en,
        translationVi: s.translation_vi,
        audioUrl: s.audio_url,
        connectedSpeechNotes: s.connected_speech_notes,
        targetWords: s.target_words ? (typeof s.target_words === 'string' ? JSON.parse(s.target_words) : s.target_words) : []
      }))
    };

    res.json({
      success: true,
      data: formattedTest
    });
  } catch (error) {
    console.error('Lỗi getListeningTestById:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy chi tiết bài nghe.' });
  }
};

// ==================== 3. ANKI FLASHCARDS & SRS ====================

// Lấy danh sách bộ bài Anki Decks
exports.getAnkiDecks = async (req, res) => {
  try {
    const [decks] = await db.query(`
      SELECT 
        d.id, d.name, d.description, d.badge, d.color,
        COUNT(c.id) AS totalCards,
        SUM(CASE WHEN c.due_date <= NOW() THEN 1 ELSE 0 END) AS dueCount,
        SUM(CASE WHEN c.stage = 'learning' THEN 1 ELSE 0 END) AS learningCount,
        SUM(CASE WHEN c.stage = 'mastered' THEN 1 ELSE 0 END) AS masteredCount
      FROM anki_decks d
      LEFT JOIN anki_cards c ON d.id = c.deck_id
      GROUP BY d.id
      ORDER BY d.created_at ASC
    `);

    res.json({
      success: true,
      data: decks
    });
  } catch (error) {
    console.error('Lỗi getAnkiDecks:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy bộ bài Anki.' });
  }
};

// Lấy danh sách thẻ từ vựng theo bộ bài
exports.getAnkiCards = async (req, res) => {
  try {
    const { deckId } = req.query;
    let query = 'SELECT * FROM anki_cards';
    const params = [];

    if (deckId) {
      query += ' WHERE deck_id = ?';
      params.push(deckId);
    }
    query += ' ORDER BY due_date ASC';

    const [cards] = await db.query(query, params);

    const formattedCards = cards.map((c) => ({
      id: c.id,
      deckId: c.deck_id,
      word: c.word,
      partOfSpeech: c.part_of_speech,
      ipa: c.ipa,
      meaningEn: c.meaning_en,
      meaningVi: c.meaning_vi,
      clozeSentence: c.cloze_sentence,
      fullSentence: c.full_sentence,
      source: c.source,
      audioUrl: c.audio_url,
      stage: c.stage,
      interval: c.interval_days,
      repetition: c.repetition_count,
      easeFactor: c.ease_factor,
      dueDate: c.due_date,
      lastReviewedAt: c.last_reviewed_at
    }));

    res.json({
      success: true,
      count: formattedCards.length,
      data: formattedCards
    });
  } catch (error) {
    console.error('Lỗi getAnkiCards:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy thẻ Anki.' });
  }
};

// Thêm thẻ mới vào Deck Cá Nhân (1-Click Save từ Reading/Listening)
exports.createAnkiCard = async (req, res) => {
  try {
    const {
      word,
      partOfSpeech = 'vocabulary',
      ipa = '',
      meaningEn = '',
      meaningVi = '',
      contextSentence = '',
      source = 'eng4u Cambridge',
      deckId = 'deck-personal'
    } = req.body;

    if (!word) {
      return res.status(400).json({ success: false, message: 'Từ vựng không được để trống.' });
    }

    const cardId = `card-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const clozeSentence = contextSentence ? contextSentence.replace(new RegExp(`\\b${word}\\b`, 'gi'), '[ ________ ]') : `Definition of [ ________ ]: ${meaningVi}`;
    const fullSentence = contextSentence || `${word}: ${meaningVi}`;

    await db.query(
      `INSERT INTO anki_cards 
        (id, deck_id, word, part_of_speech, ipa, meaning_en, meaning_vi, cloze_sentence, full_sentence, source, stage, interval_days, repetition_count, ease_factor, due_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', 0, 0, 2.5, NOW())`,
      [cardId, deckId, word, partOfSpeech, ipa, meaningEn, meaningVi, clozeSentence, fullSentence, source]
    );

    res.status(201).json({
      success: true,
      message: `Đã lưu từ "${word}" vào Deck Anki!`,
      data: {
        id: cardId,
        word,
        deckId
      }
    });
  } catch (error) {
    console.error('Lỗi createAnkiCard:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lưu thẻ Anki.' });
  }
};

// Cập nhật thông số thuật toán SuperMemo SM-2 sau khi ôn tập
exports.reviewAnkiCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body; // 1: Again, 2: Hard, 3: Good, 4: Easy

    const [[card]] = await db.query('SELECT * FROM anki_cards WHERE id = ?', [id]);
    if (!card) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thẻ Anki.' });
    }

    let interval = card.interval_days;
    let repetition = card.repetition_count;
    let easeFactor = card.ease_factor;
    let stage = card.stage;

    // Thuật toán SuperMemo SM-2 chuẩn
    if (rating === 1) { // Again
      repetition = 0;
      interval = 1;
      stage = 'learning';
    } else {
      if (repetition === 0) {
        interval = 1;
      } else if (repetition === 1) {
        interval = rating === 2 ? 3 : 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetition += 1;
      stage = interval >= 21 ? 'mastered' : 'review';
    }

    // Điều chỉnh Ease Factor
    // q = rating (1 -> 2, 2 -> 3, 3 -> 4, 4 -> 5)
    const q = rating + 1;
    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));

    // Tính ngày ôn tập tiếp theo
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + interval);

    await db.query(
      `UPDATE anki_cards 
       SET interval_days = ?, repetition_count = ?, ease_factor = ?, stage = ?, due_date = ?, last_reviewed_at = NOW()
       WHERE id = ?`,
      [interval, repetition, easeFactor, stage, nextDueDate, id]
    );

    res.json({
      success: true,
      message: 'Đã cập nhật tiến độ Spaced Repetition thành công!',
      data: {
        id,
        interval,
        repetition,
        easeFactor,
        stage,
        dueDate: nextDueDate
      }
    });
  } catch (error) {
    console.error('Lỗi reviewAnkiCard:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi cập nhật thẻ Anki.' });
  }
};

// ==================== 4. LỊCH SỬ LÀM BÀI CỦA TỪNG USER (BẢO MẬT & CÁCH LY) ====================

// Lấy lịch sử làm bài thi của chính người dùng hiện tại (Session-enforced, SEC-01)
exports.getUserTestHistory = async (req, res) => {
  try {
    const sessionUserId = (req.session && req.session.user && req.session.user.id) || (req.session && req.session.userId);

    // SEC-01: Chặn truy cập lịch sử của người khác - KHÔNG dùng req.query.userId
    if (!sessionUserId) {
      return res.status(401).json({
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Vui lòng đăng nhập để xem lịch sử làm bài thi cá nhân.'
      });
    }

    const userId = String(sessionUserId);

    try {
      const [rows] = await db.query(
        'SELECT id, book, test_number AS testNumber, skill, band_score AS bandScore, correct_count AS correctCount, total_questions AS totalQuestions, completed_at AS completedAt, is_verified AS isVerified, client_reported AS clientReported FROM user_cambridge_test_attempts WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
      return res.json({ success: true, count: rows.length, data: rows });
    } catch (dbErr) {
      console.warn('MySQL getUserTestHistory warning, fallback to memory:', dbErr.message);
    }

    const mem = memoryUserAttempts.get(userId) || [];
    return res.json({ success: true, count: mem.length, data: mem });
  } catch (error) {
    console.error('Lỗi getUserTestHistory:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lấy lịch sử làm bài.' });
  }
};

// Lưu lịch sử làm bài thi cho người dùng đã xác thực (SEC-01 & SEC-03)
exports.saveUserTestAttempt = async (req, res) => {
  try {
    const sessionUserId = (req.session && req.session.user && req.session.user.id) || (req.session && req.session.userId);

    // SEC-01: Chỉ chấp nhận userId từ session xác thực, không tin cậy body.userId
    if (!sessionUserId) {
      return res.status(401).json({
        success: false,
        errorCode: 'UNAUTHORIZED',
        message: 'Vui lòng đăng nhập để lưu kết quả bài thi.'
      });
    }

    const userId = String(sessionUserId);
    const { attemptId, book, testNumber, skill, bandScore, correctCount, totalQuestions, completedAt } = req.body;

    if (!book || !testNumber || !skill) {
      return res.status(400).json({ success: false, message: 'Thiếu thông tin bài thi (book, testNumber, skill).' });
    }

    const cleanBook = book.trim();
    const cleanSkill = skill.toLowerCase();
    // P1-06: Server-owned identity. Attempt ID is strictly scoped to the authenticated session userId.
    // Client cannot forge or claim an attempt ID belonging to another user.
    const clientProvidedSuffix = attemptId ? String(attemptId).trim().replace(/^[a-zA-Z0-9_\.-]+_/, '') : null;
    const safeAttemptId = clientProvidedSuffix
      ? `${userId}_${clientProvidedSuffix}`
      : `${userId}_${cleanBook.toLowerCase().replace(/\s+/g, '-')}-t${testNumber}-${cleanSkill}-${Date.now()}`;
    const cleanCompletedAt = completedAt || new Date().toLocaleDateString('vi-VN');

    // SEC-03: Đánh dấu kết quả do client gửi (chưa qua server verification)
    const attempt = {
      id: safeAttemptId,
      book: cleanBook,
      testNumber: Number(testNumber),
      skill: cleanSkill,
      bandScore: Number(bandScore) || 0,
      correctCount: Number(correctCount) || 0,
      totalQuestions: Number(totalQuestions) || 40,
      completedAt: cleanCompletedAt,
      isVerified: false,
      clientReported: true
    };

    try {
      await db.query(
        `INSERT INTO user_cambridge_test_attempts 
          (id, user_id, book, test_number, skill, band_score, correct_count, total_questions, completed_at, is_verified, client_reported)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          band_score = IF(is_verified = 1 OR user_id != VALUES(user_id), band_score, VALUES(band_score)),
          correct_count = IF(is_verified = 1 OR user_id != VALUES(user_id), correct_count, VALUES(correct_count)),
          total_questions = IF(is_verified = 1 OR user_id != VALUES(user_id), total_questions, VALUES(total_questions)),
          completed_at = IF(is_verified = 1 OR user_id != VALUES(user_id), completed_at, VALUES(completed_at)),
          client_reported = IF(is_verified = 1 OR user_id != VALUES(user_id), client_reported, 1)`,
        [
          safeAttemptId,
          userId,
          cleanBook,
          Number(testNumber),
          cleanSkill,
          attempt.bandScore,
          attempt.correctCount,
          attempt.totalQuestions,
          cleanCompletedAt,
          0,
          1
        ]
      );
    } catch (dbErr) {
      console.warn('MySQL saveUserTestAttempt warning, using in-memory store:', dbErr.message);
    }

    // Cập nhật in-memory store
    const list = memoryUserAttempts.get(userId) || [];
    const existingIdx = list.findIndex(a => a.id === safeAttemptId || (a.book === cleanBook && a.testNumber === Number(testNumber) && a.skill === cleanSkill));
    if (existingIdx >= 0) {
      if (!list[existingIdx].isVerified) {
        list[existingIdx] = attempt;
      }
    } else {
      list.unshift(attempt);
    }
    memoryUserAttempts.set(userId, list);

    return res.json({ success: true, message: 'Đã lưu lịch sử làm bài thành công!', data: attempt });
  } catch (error) {
    console.error('Lỗi saveUserTestAttempt:', error);
    res.status(500).json({ success: false, message: 'Lỗi máy chủ khi lưu kết quả bài thi.' });
  }
};

// Exports helper dùng chung cho unit tests và controllers khác
exports.calculateAcademicReadingBand = calculateAcademicReadingBand;
exports.calculateEstimatedReadingBand = calculateEstimatedReadingBand;
exports.normalizeReadingAnswer = normalizeReadingAnswer;
exports._getMemoryAttempts = () => memoryUserAttempts;
