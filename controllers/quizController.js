// controllers/quizController.js
// Xử lý: hiển thị bài kiểm tra, chấm điểm khi nộp bài, xem kết quả, xem lịch sử.

const db = require('../config/db');

// Hiển thị trang làm bài kiểm tra
async function showQuiz(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params; // quiz id

    // Lấy thông tin quiz + bài học + khóa học chứa nó
    const [quizzes] = await db.query(
      `SELECT q.*, l.title AS lesson_title, l.course_id
       FROM quizzes q
       JOIN lessons l ON l.id = q.lesson_id
       WHERE q.id = ?`,
      [id]
    );
    if (quizzes.length === 0) {
      return res.status(404).send('Không tìm thấy bài kiểm tra.');
    }
    const quiz = quizzes[0];

    // Chỉ cho làm bài nếu học viên đã đăng ký khóa học chứa bài kiểm tra này
    const [enrollments] = await db.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, quiz.course_id]
    );
    if (enrollments.length === 0) {
      return res.status(403).send('Bạn cần đăng ký khóa học này trước khi làm bài kiểm tra.');
    }

    // Lấy toàn bộ câu hỏi + đáp án của quiz này
    const [questions] = await db.query(
      'SELECT * FROM questions WHERE quiz_id = ?',
      [id]
    );

    for (const q of questions) {
      const [answers] = await db.query(
        'SELECT id, answer_text FROM answers WHERE question_id = ?', // KHÔNG lấy is_correct để tránh lộ đáp án ra HTML
        [q.id]
      );
      q.answers = answers;
    }

    res.render('student/quiz', { quiz, questions });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải bài kiểm tra.');
  }
}

// Xử lý khi học viên nộp bài -> chấm điểm -> lưu kết quả
async function submitQuiz(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params; // quiz id
    const submittedAnswers = req.body; // dạng { q_12: '45', q_13: '48', ... }

    // Lấy toàn bộ câu hỏi của quiz kèm đáp án đúng
    const [questions] = await db.query('SELECT id FROM questions WHERE quiz_id = ?', [id]);

    let correctCount = 0;
    const detailRows = []; // sẽ lưu vào quiz_result_details sau khi có quiz_result_id

    for (const q of questions) {
      const selectedAnswerId = submittedAnswers[`q_${q.id}`] || null;

      let isCorrect = false;
      if (selectedAnswerId) {
        const [answers] = await db.query(
          'SELECT is_correct FROM answers WHERE id = ? AND question_id = ?',
          [selectedAnswerId, q.id]
        );
        if (answers.length > 0 && answers[0].is_correct) {
          isCorrect = true;
          correctCount++;
        }
      }

      detailRows.push({ questionId: q.id, selectedAnswerId, isCorrect });
    }

    const totalQuestions = questions.length;
    const score = totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 10 * 100) / 100 // thang điểm 10, làm tròn 2 số thập phân
      : 0;

    // Lưu kết quả tổng
    const [resultInsert] = await db.query(
      'INSERT INTO quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)',
      [userId, id, score]
    );
    const quizResultId = resultInsert.insertId;

    // Lưu chi tiết từng câu
    for (const row of detailRows) {
      await db.query(
        'INSERT INTO quiz_result_details (quiz_result_id, question_id, selected_answer_id, is_correct) VALUES (?, ?, ?, ?)',
        [quizResultId, row.questionId, row.selectedAnswerId, row.isCorrect]
      );
    }

    res.redirect(`/results/${quizResultId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi nộp bài.');
  }
}

// Hiển thị trang kết quả chi tiết của 1 lần làm bài
async function showResult(req, res) {
  try {
    const userId = req.session.user.id;
    const { resultId } = req.params;

    const [results] = await db.query(
      `SELECT r.*, q.title AS quiz_title, q.lesson_id, l.course_id
       FROM quiz_results r
       JOIN quizzes q ON q.id = r.quiz_id
       JOIN lessons l ON l.id = q.lesson_id
       WHERE r.id = ?`,
      [resultId]
    );
    if (results.length === 0) {
      return res.status(404).send('Không tìm thấy kết quả.');
    }
    const result = results[0];

    // Bảo vệ: chỉ chính chủ mới xem được kết quả của mình
    if (result.user_id !== userId) {
      return res.status(403).send('Bạn không có quyền xem kết quả này.');
    }

    // Lấy chi tiết từng câu: câu hỏi, đáp án đã chọn, đáp án đúng
    const [details] = await db.query(
      `SELECT qrd.*, q.question_text
       FROM quiz_result_details qrd
       JOIN questions q ON q.id = qrd.question_id
       WHERE qrd.quiz_result_id = ?`,
      [resultId]
    );

    for (const d of details) {
      const [answers] = await db.query('SELECT id, answer_text, is_correct FROM answers WHERE question_id = ?', [d.question_id]);
      d.answers = answers;
    }

    res.render('student/quiz_result', { result, details });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Trang lịch sử: liệt kê tất cả lần làm bài của học viên đang đăng nhập
async function myResults(req, res) {
  try {
    const userId = req.session.user.id;
    const [results] = await db.query(
      `SELECT r.*, q.title AS quiz_title
       FROM quiz_results r
       JOIN quizzes q ON q.id = r.quiz_id
       WHERE r.user_id = ?
       ORDER BY r.taken_at DESC`,
      [userId]
    );
    res.render('student/my_results', { results });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải lịch sử kết quả.');
  }
}

module.exports = { showQuiz, submitQuiz, showResult, myResults };
