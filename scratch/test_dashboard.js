// scratch/test_dashboard.js
const db = require('../config/db');

async function testDashboard() {
  try {
    console.log('--- Testing Dashboard Stats Queries ---');

    const [[{ totalCourses }]] = await db.query('SELECT COUNT(*) AS totalCourses FROM courses');
    const [[{ totalLessons }]] = await db.query('SELECT COUNT(*) AS totalLessons FROM lessons');
    const [[{ totalStudents }]] = await db.query("SELECT COUNT(*) AS totalStudents FROM users WHERE role = 'student'");
    const [[{ totalEnrollments }]] = await db.query('SELECT COUNT(*) AS totalEnrollments FROM enrollments');
    const [[{ totalQuizResults }]] = await db.query('SELECT COUNT(*) AS totalQuizResults FROM quiz_results');
    const [[{ totalComments }]] = await db.query('SELECT COUNT(*) AS totalComments FROM lesson_comments');
    const [[{ completedCount }]] = await db.query('SELECT COUNT(*) AS completedCount FROM enrollments WHERE progress = 100');
    const completionRate = totalEnrollments > 0 ? Math.round((completedCount / totalEnrollments) * 100) : 0;

    const [topCourses] = await db.query(
      'SELECT c.id, c.title, COUNT(e.id) AS enrollment_count, ROUND(AVG(e.progress), 0) AS avg_progress FROM courses c LEFT JOIN enrollments e ON e.course_id = c.id GROUP BY c.id, c.title ORDER BY enrollment_count DESC LIMIT 5'
    );

    const [userList] = await db.query(
      'SELECT u.id, u.full_name, u.email, u.role, u.created_at, COUNT(DISTINCT e.course_id) AS enrolled_courses FROM users u LEFT JOIN enrollments e ON e.user_id = u.id GROUP BY u.id, u.full_name, u.email, u.role, u.created_at ORDER BY u.created_at DESC'
    );

    console.log('=== SYSTEM STATS ===');
    console.log('  totalCourses:', totalCourses);
    console.log('  totalLessons:', totalLessons);
    console.log('  totalStudents:', totalStudents);
    console.log('  totalEnrollments:', totalEnrollments);
    console.log('  totalQuizResults:', totalQuizResults);
    console.log('  totalComments:', totalComments);
    console.log('  completedCount:', completedCount);
    console.log('  completionRate:', completionRate + '%');

    console.log('\n=== TOP COURSES ===');
    topCourses.forEach((c, i) => {
      console.log('  ' + (i + 1) + '. ' + c.title + ' (' + c.enrollment_count + ' students, avg ' + (c.avg_progress || 0) + '%)');
    });

    console.log('\n=== USER LIST ===');
    userList.forEach(u => {
      console.log('  [' + u.role + '] ' + u.full_name + ' — ' + u.enrolled_courses + ' courses');
    });

    console.log('\n>>> ALL DASHBOARD QUERIES PASSED 100%!');
    process.exit(0);
  } catch (err) {
    console.error('Dashboard test failed:', err.message);
    process.exit(1);
  }
}

testDashboard();
