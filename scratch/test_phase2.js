// scratch/test_phase2.js
const db = require('../config/db');

async function testPhase2() {
  try {
    console.log('--- Testing Phase 2: Media & Comments Functionality ---');

    // 1. Verify Video Embed and Attachment in Lesson 3
    const [lessons] = await db.query('SELECT id, title, video_url, attachment_url FROM lessons WHERE id = 3');
    console.log('Lesson 3 info:', lessons[0]);

    if (!lessons[0].video_url || !lessons[0].attachment_url) {
      throw new Error('Lesson 3 missing video_url or attachment_url');
    }

    // 2. Test Adding a Comment
    const testContent = 'Đây là câu hỏi kiểm thử tự động về bài học.';
    const [insRes] = await db.query(
      'INSERT INTO lesson_comments (lesson_id, user_id, content) VALUES (?, ?, ?)',
      [3, 3, testContent]
    );
    const commentId = insRes.insertId;
    console.log('[+] Created test comment with ID:', commentId);

    // 3. Test Reading Comments with Joined User Info
    const [comments] = await db.query(
      `SELECT lc.*, u.full_name, u.role
       FROM lesson_comments lc
       JOIN users u ON u.id = lc.user_id
       WHERE lc.lesson_id = 3
       ORDER BY lc.created_at ASC`
    );
    console.log('Total comments for lesson 3:', comments.length);
    const found = comments.find(c => c.id === commentId);
    if (!found || found.content !== testContent) {
      throw new Error('Comment not found or content mismatch');
    }
    console.log('[OK] Verified comment stored and retrieved with author:', found.full_name, '(' + found.role + ')');

    // 4. Test Deleting the Comment
    await db.query('DELETE FROM lesson_comments WHERE id = ?', [commentId]);
    const [afterDel] = await db.query('SELECT * FROM lesson_comments WHERE id = ?', [commentId]);
    if (afterDel.length !== 0) {
      throw new Error('Comment was not deleted properly');
    }
    console.log('[OK] Verified test comment deleted cleanly.');

    console.log('\n>>> PHASE 2 INTEGRATION TEST PASSED 100%!');
    process.exit(0);
  } catch (err) {
    console.error('Phase 2 test failed:', err.message);
    process.exit(1);
  }
}

testPhase2();
