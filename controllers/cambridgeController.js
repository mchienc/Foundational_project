// controllers/cambridgeController.js
// Quản lý nghiệp vụ khảo thí Cambridge IELTS (Reading, Listening, Dictation, Anki SRS) từ CSDL MySQL

const db = require('../config/db');

// Tính IELTS Band Score chuẩn Cambridge Reading
function calculateIeltsBand(correct, total) {
  const ratio = correct / total;
  if (ratio >= 0.92) return 9.0;
  if (ratio >= 0.84) return 8.5;
  if (ratio >= 0.76) return 8.0;
  if (ratio >= 0.68) return 7.5;
  if (ratio >= 0.60) return 7.0;
  if (ratio >= 0.52) return 6.5;
  if (ratio >= 0.44) return 6.0;
  if (ratio >= 0.36) return 5.5;
  if (ratio >= 0.28) return 5.0;
  return 4.5;
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
    const { userAnswers = {}, timeTakenSeconds = 0, userId = 1 } = req.body;

    const [questions] = await db.query(
      'SELECT * FROM cambridge_reading_questions WHERE passage_id = ? ORDER BY question_number ASC',
      [id]
    );

    if (questions.length === 0) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy câu hỏi cho bài thi này.' });
    }

    let correctCount = 0;
    const evaluatedQuestions = questions.map((q) => {
      const userAns = (userAnswers[q.id] || '').trim().toLowerCase();
      let isCorrect = false;

      const acceptable = [
        q.correct_answer.toLowerCase(),
        ...(q.acceptable_answers ? (typeof q.acceptable_answers === 'string' ? JSON.parse(q.acceptable_answers) : q.acceptable_answers).map(a => a.toLowerCase()) : [])
      ];

      if (userAns && acceptable.includes(userAns)) {
        isCorrect = true;
        correctCount++;
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
    const bandScore = calculateIeltsBand(correctCount, totalCount);
    const percentage = Math.round((correctCount / totalCount) * 100);
    const xpEarned = Math.max(30, correctCount * 10);

    // Lưu vào bảng user_cambridge_exam_results
    await db.query(
      `INSERT INTO user_cambridge_exam_results
        (passage_id, user_id, correct_count, total_count, band_score, percentage, time_taken_seconds, user_answers, xp_earned)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        correctCount,
        totalCount,
        bandScore,
        percentage,
        timeTakenSeconds,
        JSON.stringify(userAnswers),
        xpEarned
      ]
    );

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
      source = 'EduFlow Cambridge',
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
