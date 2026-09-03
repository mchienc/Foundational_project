// controllers/adminQuizController.js
// Xử lý các thao tác Quản trị Bài kiểm tra trắc nghiệm (Quiz & Question Builder)

const db = require('../config/db');

// Hiển thị trang Quiz & Question Builder của một bài học
async function showQuiz(req, res) {
  try {
    const { courseId, lessonId } = req.params;

    // Lấy thông tin khóa học và bài học
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [lessonId]);

    if (courses.length === 0 || lessons.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học hoặc bài học.');
    }

    // Lấy quiz của bài học (nếu có)
    const [quizzes] = await db.query('SELECT * FROM quizzes WHERE lesson_id = ?', [lessonId]);
    const quiz = quizzes.length > 0 ? quizzes[0] : null;

    let questions = [];
    if (quiz) {
      // Lấy danh sách câu hỏi
      const [qRows] = await db.query(
        'SELECT * FROM questions WHERE quiz_id = ? ORDER BY id ASC',
        [quiz.id]
      );

      if (qRows.length > 0) {
        const questionIds = qRows.map(q => q.id);
        // Lấy toàn bộ đáp án của các câu hỏi
        const [aRows] = await db.query(
          'SELECT * FROM answers WHERE question_id IN (?) ORDER BY id ASC',
          [questionIds]
        );

        // Gắn đáp án vào từng câu hỏi
        questions = qRows.map(q => {
          return {
            ...q,
            answers: aRows.filter(a => a.question_id === q.id)
          };
        });
      }
    }

    res.render('admin/quizzes/builder', {
      course: courses[0],
      lesson: lessons[0],
      quiz,
      questions,
      error: req.query.error || null,
      success: req.query.success || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải Quiz Builder.');
  }
}

// Tạo mới hoặc cập nhật tiêu đề bài kiểm tra
async function saveQuiz(req, res) {
  try {
    const { courseId, lessonId } = req.params;
    const { title } = req.body;

    if (!title || title.trim() === '') {
      return res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?error=Vui+lòng+nhập+tiêu+đề+bài+kiểm+tra.`);
    }

    const [existing] = await db.query('SELECT id FROM quizzes WHERE lesson_id = ?', [lessonId]);
    if (existing.length > 0) {
      await db.query('UPDATE quizzes SET title = ? WHERE id = ?', [title.trim(), existing[0].id]);
    } else {
      await db.query('INSERT INTO quizzes (lesson_id, title) VALUES (?, ?)', [lessonId, title.trim()]);
    }

    res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?success=Đã+lưu+tiêu+đề+bài+kiểm+tra+thành+công.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi lưu bài kiểm tra.');
  }
}

// Thêm câu hỏi mới kèm 4 đáp án (A, B, C, D) và đánh dấu đáp án đúng
async function addQuestion(req, res) {
  try {
    const { courseId, lessonId } = req.params;
    const { question_text, answer_a, answer_b, answer_c, answer_d, correct_answer } = req.body;

    if (!question_text || !question_text.trim()) {
      return res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?error=Vui+lòng+nhập+nội+dung+câu+hỏi.`);
    }

    if (!answer_a || !answer_b || !answer_c || !answer_d) {
      return res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?error=Vui+lòng+nhập+đầy+đủ+4+đáp+án+lựa+chọn.`);
    }

    if (!['a', 'b', 'c', 'd'].includes(correct_answer)) {
      return res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?error=Vui+lòng+chọn+đáp+án+đúng.`);
    }

    // Đảm bảo bài quiz đã tồn tại
    let [quizzes] = await db.query('SELECT id FROM quizzes WHERE lesson_id = ?', [lessonId]);
    let quizId;
    if (quizzes.length === 0) {
      const [lessons] = await db.query('SELECT title FROM lessons WHERE id = ?', [lessonId]);
      const defaultTitle = `Kiểm tra: ${lessons[0]?.title || 'Bài học'}`;
      const [createRes] = await db.query('INSERT INTO quizzes (lesson_id, title) VALUES (?, ?)', [lessonId, defaultTitle]);
      quizId = createRes.insertId;
    } else {
      quizId = quizzes[0].id;
    }

    // Thêm câu hỏi vào bảng questions
    const [qRes] = await db.query(
      'INSERT INTO questions (quiz_id, question_text, question_type) VALUES (?, ?, ?)',
      [quizId, question_text.trim(), 'single_choice']
    );
    const questionId = qRes.insertId;

    // Thêm 4 đáp án vào bảng answers
    const answersList = [
      { text: answer_a.trim(), isCorrect: correct_answer === 'a' ? 1 : 0 },
      { text: answer_b.trim(), isCorrect: correct_answer === 'b' ? 1 : 0 },
      { text: answer_c.trim(), isCorrect: correct_answer === 'c' ? 1 : 0 },
      { text: answer_d.trim(), isCorrect: correct_answer === 'd' ? 1 : 0 }
    ];

    for (const ans of answersList) {
      await db.query(
        'INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)',
        [questionId, ans.text, ans.isCorrect]
      );
    }

    res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?success=Đã+thêm+câu+hỏi+mới+thành+công.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi thêm câu hỏi.');
  }
}

// Xóa một câu hỏi
async function deleteQuestion(req, res) {
  try {
    const { courseId, lessonId, questionId } = req.params;

    // Do có ON DELETE CASCADE, câu hỏi bị xóa sẽ tự động kéo theo các đáp án
    await db.query('DELETE FROM questions WHERE id = ?', [questionId]);

    res.redirect(`/admin/courses/${courseId}/lessons/${lessonId}/quiz?success=Đã+xóa+câu+hỏi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa câu hỏi.');
  }
}

// Xóa toàn bộ bài kiểm tra của bài học
async function deleteQuiz(req, res) {
  try {
    const { courseId, lessonId } = req.params;

    await db.query('DELETE FROM quizzes WHERE lesson_id = ?', [lessonId]);

    res.redirect(`/admin/courses/${courseId}/lessons?success=Đã+xóa+bài+kiểm+tra.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa bài kiểm tra.');
  }
}

module.exports = { showQuiz, saveQuiz, addQuestion, deleteQuestion, deleteQuiz };
