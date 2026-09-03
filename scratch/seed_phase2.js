// scratch/seed_phase2.js
const db = require('../config/db');

async function seedMedia() {
  try {
    console.log('--- Seeding Media (Video & Attachments & Comments) for Phase 2 ---');

    // Update Lesson 3 (Node.js & Express MVC)
    await db.query(
      'UPDATE lessons SET video_url = ?, attachment_url = ? WHERE id = 3',
      ['https://www.youtube.com/watch?v=SccSCuHhOw0', 'https://expressjs.com']
    );
    console.log('[+] Updated lesson 3 with YouTube video and doc URL.');

    // Update Lesson 8 (UI/UX Design Tokens)
    await db.query(
      'UPDATE lessons SET video_url = ?, attachment_url = ? WHERE id = 8',
      ['https://www.youtube.com/watch?v=ft30zcMlFao', 'https://tailwindcss.com']
    );
    console.log('[+] Updated lesson 8 with YouTube video and Tailwind doc URL.');

    // Add sample Q&A comments into lesson 3
    const [existingComments] = await db.query('SELECT id FROM lesson_comments WHERE lesson_id = 3');
    if (existingComments.length === 0) {
      await db.query(
        'INSERT INTO lesson_comments (lesson_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())',
        [3, 3, 'Thầy cho em hỏi khi nào thì nên dùng session lưu ở Redis thay vì bộ nhớ RAM mặc định của Node.js ạ?']
      );
      await db.query(
        'INSERT INTO lesson_comments (lesson_id, user_id, content, created_at) VALUES (?, ?, ?, NOW())',
        [3, 1, 'Chào em! Khi hệ thống mở rộng chạy nhiều tiến trình (clustering) hoặc nhiều server đằng sau Load Balancer thì ta bắt buộc dùng Redis để đồng bộ session giữa các node nhé!']
      );
      console.log('[+] Added 2 sample Q&A comments to lesson 3.');
    }

    console.log('>>> MEDIA AND DISCUSSION SEEDING COMPLETED!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedMedia();
