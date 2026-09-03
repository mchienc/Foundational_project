// controllers/studentController.js
// Xử lý các chức năng phía học viên: xem danh sách khóa học, xem chi tiết,
// đăng ký tham gia khóa học, xem nội dung bài học và theo dõi tiến độ hoàn thành.

const db = require('../config/db');

// Trang danh sách tất cả khóa học (ai đăng nhập cũng xem được)
async function listCourses(req, res) {
  try {
    const userId = req.session.user.id;
    const { search = '', filter = 'all' } = req.query;

    // Xây dựng điều kiện tìm kiếm và lọc động
    let whereClause = '';
    const queryParams = [userId];

    if (search.trim()) {
      whereClause += ' AND (c.title LIKE ? OR c.description LIKE ?)';
      queryParams.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }

    if (filter === 'enrolled') {
      whereClause += ' AND e.id IS NOT NULL';
    } else if (filter === 'not-enrolled') {
      whereClause += ' AND e.id IS NULL';
    } else if (filter === 'completed') {
      whereClause += ' AND e.progress = 100';
    } else if (filter === 'in-progress') {
      whereClause += ' AND e.id IS NOT NULL AND e.progress < 100';
    }

    const [courses] = await db.query(
      `SELECT c.*,
              e.id AS enrollment_id,
              e.progress
       FROM courses c
       LEFT JOIN enrollments e ON e.course_id = c.id AND e.user_id = ?
       WHERE 1=1 ${whereClause}
       ORDER BY c.created_at DESC`,
      queryParams
    );

    // Tổng khóa học không lọc (để hiển thị trên header)
    const [[{ totalCount }]] = await db.query('SELECT COUNT(*) AS totalCount FROM courses');

    res.render('student/courses', { courses, search, filter, totalCount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải danh sách khóa học.');
  }
}

// Trang chi tiết 1 khóa học: hiển thị danh sách bài học, tiến độ và trạng thái từng bài
async function courseDetail(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params;

    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }

    const [enrollments] = await db.query(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );
    const isEnrolled = enrollments.length > 0;
    const progress = isEnrolled ? (enrollments[0].progress || 0) : 0;

    const [lessons] = await db.query(
      'SELECT * FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
      [id]
    );

    // Lấy danh sách ID các bài học mà học viên đã hoàn thành
    let completedLessonIds = [];
    if (isEnrolled) {
      const [completions] = await db.query(
        'SELECT lesson_id FROM lesson_completions WHERE user_id = ? AND course_id = ?',
        [userId, id]
      );
      completedLessonIds = completions.map(c => c.lesson_id);
    }

    res.render('student/course_detail', {
      course: courses[0],
      lessons,
      isEnrolled,
      completedLessonIds,
      progress
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Xử lý đăng ký tham gia khóa học
async function enroll(req, res) {
  try {
    const userId = req.session.user.id;
    const { id } = req.params; // course id

    // Kiểm tra đã đăng ký chưa
    const [existing] = await db.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, id]
    );
    if (existing.length === 0) {
      await db.query(
        'INSERT INTO enrollments (user_id, course_id, progress) VALUES (?, ?, 0)',
        [userId, id]
      );
      return res.redirect(`/courses/${id}?success=Đăng+ký+khóa+học+thành+công!+Chúc+bạn+học+tốt.`);
    }

    res.redirect(`/courses/${id}?info=Bạn+đã+đăng+ký+khóa+học+này+rồi.`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi đăng ký khóa học.');
  }
}

// Trang xem nội dung 1 bài học cụ thể
async function lessonDetail(req, res) {
  try {
    const userId = req.session.user.id;
    const { courseId, lessonId } = req.params;

    const [enrollments] = await db.query(
      'SELECT id, progress FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    if (enrollments.length === 0) {
      return res.status(403).send('Bạn cần đăng ký khóa học này trước khi xem bài học.');
    }

    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    const [lessons] = await db.query('SELECT * FROM lessons WHERE id = ?', [lessonId]);
    if (courses.length === 0 || lessons.length === 0) {
      return res.status(404).send('Không tìm thấy nội dung.');
    }

    // Lấy danh sách tất cả bài học để hiển thị sidebar
    const [allLessons] = await db.query(
      'SELECT id, title, order_index FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
      [courseId]
    );

    // Lấy danh sách các bài học đã hoàn thành
    const [completions] = await db.query(
      'SELECT lesson_id FROM lesson_completions WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    const completedLessonIds = completions.map(c => c.lesson_id);
    const isCompleted = completedLessonIds.includes(Number(lessonId));

    // Tính % tiến độ
    const progress = allLessons.length > 0 
      ? Math.round((completedLessonIds.length / allLessons.length) * 100) 
      : 0;

    // Tìm bài trước và bài tiếp theo
    const currentIndex = allLessons.findIndex(l => l.id == lessonId);
    const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson = (currentIndex >= 0 && currentIndex < allLessons.length - 1) ? allLessons[currentIndex + 1] : null;

    // Kiểm tra bài kiểm tra trắc nghiệm đính kèm
    const [quizzes] = await db.query('SELECT id, title FROM quizzes WHERE lesson_id = ?', [lessonId]);

    // Xử lý link nhúng Video bài giảng (nếu có)
    const videoEmbedUrl = getEmbedVideoUrl(lessons[0].video_url);

    // Lấy danh sách bình luận / câu hỏi thảo luận của bài học
    const [comments] = await db.query(
      `SELECT lc.*, u.full_name, u.role
       FROM lesson_comments lc
       JOIN users u ON u.id = lc.user_id
       WHERE lc.lesson_id = ?
       ORDER BY lc.created_at ASC`,
      [lessonId]
    );

    res.render('student/lesson_detail', {
      course: courses[0],
      lesson: lessons[0],
      allLessons,
      completedLessonIds,
      isCompleted,
      progress,
      prevLesson,
      nextLesson,
      videoEmbedUrl,
      comments,
      quiz: quizzes.length > 0 ? quizzes[0] : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra.');
  }
}

// Hàm phân tích và chuyển đổi URL video thông thường sang định dạng nhúng (Embed)
function getEmbedVideoUrl(url) {
  if (!url) return null;
  url = url.trim();

  // YouTube: youtube.com/watch?v=ID hoặc youtu.be/ID
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return `https://player.vimeo.com/video/${vimeoMatch[3]}`;
  }

  return url;
}

// Thêm bình luận / câu hỏi thảo luận mới vào bài học
async function addComment(req, res) {
  try {
    const userId = req.session.user.id;
    const { courseId, lessonId } = req.params;
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.redirect(`/courses/${courseId}/lessons/${lessonId}#discussion`);
    }

    // Kiểm tra đã đăng ký (hoặc là admin)
    if (req.session.user.role !== 'admin') {
      const [enrollments] = await db.query(
        'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
        [userId, courseId]
      );
      if (enrollments.length === 0) {
        return res.status(403).send('Bạn cần đăng ký khóa học này trước khi thảo luận.');
      }
    }

    await db.query(
      'INSERT INTO lesson_comments (lesson_id, user_id, content) VALUES (?, ?, ?)',
      [lessonId, userId, content.trim()]
    );

    res.redirect(`/courses/${courseId}/lessons/${lessonId}#discussion`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi gửi bình luận.');
  }
}

// Xóa bình luận (chỉ tác giả hoặc Admin mới được quyền xóa)
async function deleteComment(req, res) {
  try {
    const userId = req.session.user.id;
    const userRole = req.session.user.role;
    const { courseId, lessonId, commentId } = req.params;

    const [comments] = await db.query('SELECT * FROM lesson_comments WHERE id = ?', [commentId]);
    if (comments.length === 0) {
      return res.redirect(`/courses/${courseId}/lessons/${lessonId}#discussion`);
    }

    // Kiểm tra quyền xóa: người gửi hoặc admin
    if (comments[0].user_id !== userId && userRole !== 'admin') {
      return res.status(403).send('Bạn không có quyền xóa bình luận này.');
    }

    await db.query('DELETE FROM lesson_comments WHERE id = ?', [commentId]);
    res.redirect(`/courses/${courseId}/lessons/${lessonId}#discussion`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi xóa bình luận.');
  }
}

// Xử lý Đánh dấu đã hoàn thành / Bỏ đánh dấu bài học
async function toggleLessonComplete(req, res) {
  try {
    const userId = req.session.user.id;
    const { courseId, lessonId } = req.params;
    const { next } = req.query; // Tham số chuyển sang bài tiếp theo nếu có

    // Kiểm tra đã đăng ký khóa học chưa
    const [enrollments] = await db.query(
      'SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );
    if (enrollments.length === 0) {
      return res.status(403).send('Bạn cần đăng ký khóa học này trước.');
    }

    // Kiểm tra trạng thái hoàn thành hiện tại
    const [existing] = await db.query(
      'SELECT id FROM lesson_completions WHERE user_id = ? AND lesson_id = ?',
      [userId, lessonId]
    );

    let wasAlreadyCompleted = false;
    if (existing.length > 0) {
      // Đã hoàn thành -> bấm lại là hủy đánh dấu
      await db.query(
        'DELETE FROM lesson_completions WHERE user_id = ? AND lesson_id = ?',
        [userId, lessonId]
      );
      wasAlreadyCompleted = true;
    } else {
      // Chưa hoàn thành -> ghi nhận hoàn thành
      await db.query(
        'INSERT INTO lesson_completions (user_id, course_id, lesson_id) VALUES (?, ?, ?)',
        [userId, courseId, lessonId]
      );
    }

    // Tính toán lại tiến độ (%) khóa học
    const [[{ totalLessons }]] = await db.query(
      'SELECT COUNT(*) AS totalLessons FROM lessons WHERE course_id = ?',
      [courseId]
    );
    const [[{ completedLessons }]] = await db.query(
      'SELECT COUNT(*) AS completedLessons FROM lesson_completions WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    await db.query(
      'UPDATE enrollments SET progress = ? WHERE user_id = ? AND course_id = ?',
      [progress, userId, courseId]
    );

    // Nếu vừa đánh dấu hoàn thành và có yêu cầu chuyển bài (next=1)
    if (next === '1' && !wasAlreadyCompleted) {
      const [allLessons] = await db.query(
        'SELECT id FROM lessons WHERE course_id = ? ORDER BY order_index ASC',
        [courseId]
      );
      const currentIndex = allLessons.findIndex(l => l.id == lessonId);
      if (currentIndex >= 0 && currentIndex < allLessons.length - 1) {
        return res.redirect(`/courses/${courseId}/lessons/${allLessons[currentIndex + 1].id}`);
      }
    }

    res.redirect(`/courses/${courseId}/lessons/${lessonId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi cập nhật tiến độ bài học.');
  }
}

// Trang chứng chỉ hoàn thành khóa học (chỉ hiện khi progress = 100)
async function certificate(req, res) {
  try {
    const userId = req.session.user.id;
    const { courseId } = req.params;

    // Kiểm tra khóa học tồn tại
    const [courses] = await db.query('SELECT * FROM courses WHERE id = ?', [courseId]);
    if (courses.length === 0) {
      return res.status(404).send('Không tìm thấy khóa học.');
    }

    // Kiểm tra đã hoàn thành 100% chưa
    const [enrollments] = await db.query(
      'SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?',
      [userId, courseId]
    );

    if (enrollments.length === 0 || enrollments[0].progress < 100) {
      return res.redirect(`/courses/${courseId}?error=Bạn+chưa+hoàn+thành+khóa+học+này.`);
    }

    const enrollment = enrollments[0];

    // Tổng số bài học của khóa
    const [[{ totalLessons }]] = await db.query(
      'SELECT COUNT(*) AS totalLessons FROM lessons WHERE course_id = ?',
      [courseId]
    );

    // Lấy thông tin học viên
    const [users] = await db.query('SELECT full_name, email FROM users WHERE id = ?', [userId]);

    res.render('student/certificate', {
      course: courses[0],
      user: users[0],
      enrollment,
      totalLessons,
      completedAt: enrollment.enrolled_at
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Có lỗi xảy ra khi tải chứng chỉ.');
  }
}

module.exports = { listCourses, courseDetail, enroll, lessonDetail, toggleLessonComplete, addComment, deleteComment, certificate };

