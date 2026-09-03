// scratch/seed_courses.js
const db = require('../config/db');

async function seed() {
  try {
    console.log('--- Seeding Sample Courses, Lessons, Quizzes, Questions & Answers ---');

    const adminId = 1; // User 'Quản trị viên'

    // Update existing course 1 image and title if needed
    await db.query(
      `UPDATE courses 
       SET image = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
           description = 'Rèn luyện phản xạ giao tiếp tiếng Anh tự tin trong môi trường học thuật và làm việc công nghệ thông tin.'
       WHERE id = 1`
    );

    const sampleCourses = [
      {
        title: 'Lập trình Web Hiện đại với Node.js & Express',
        description: 'Làm chủ kiến trúc Backend MVC, xây dựng RESTful API chuẩn mực, xử lý xác thực bảo mật và kết nối cơ sở dữ liệu hiệu năng cao.',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            title: 'Bài 1: Tổng quan Kiến trúc MVC và Vòng đời Request-Response trong Express',
            order_index: 1,
            content: `<h3>1. Kiến trúc Mô hình MVC là gì?</h3>
<p>MVC (Model - View - Controller) là một trong những mẫu kiến trúc phần mềm kinh điển, giúp phân tách rõ ràng trách nhiệm giữa dữ liệu, giao diện và logic điều hướng:</p>
<ul>
  <li><strong>Model:</strong> Đại diện cho cấu trúc dữ liệu, kết nối và thực thi các câu lệnh truy vấn tới cơ sở dữ liệu.</li>
  <li><strong>View:</strong> Lớp hiển thị dữ liệu trực quan cho người dùng (ví dụ: các template EJS, HTML).</li>
  <li><strong>Controller:</strong> Cầu nối tiếp nhận HTTP Request từ Route, điều phối Model để lấy hoặc cập nhật dữ liệu, sau đó trả về View tương ứng.</li>
</ul>

<h3>2. Vòng đời Request & Response</h3>
<p>Trong Express.js, một request đi qua một chuỗi các Middleware functions trước khi đến Controller xử lý cuối cùng:</p>
<pre><code>// Luồng xử lý Middleware trong Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);
app.use('/courses', checkAuth, courseRoutes);
</code></pre>

<blockquote>"Một hệ thống phân tầng rõ ràng sẽ giúp dự án dễ bảo trì, dễ mở rộng và tăng tốc độ phát triển nhóm."</blockquote>`,
            quiz: {
              title: 'Trắc nghiệm Bài 1: Kiến trúc MVC & Express',
              questions: [
                {
                  text: 'Trong mô hình MVC, thành phần nào chịu trách nhiệm xử lý logic điều hướng và tương tác với cơ sở dữ liệu?',
                  answers: [
                    { text: 'Controller', is_correct: 1 },
                    { text: 'View', is_correct: 0 },
                    { text: 'Route file', is_correct: 0 },
                    { text: 'CSS Stylesheet', is_correct: 0 }
                  ]
                },
                {
                  text: 'Trong Express.js, hàm nào được gọi trong Middleware để chuyển quyền điều khiển sang middleware kế tiếp?',
                  answers: [
                    { text: 'next()', is_correct: 1 },
                    { text: 'continue()', is_correct: 0 },
                    { text: 'res.send()', is_correct: 0 },
                    { text: 'forward()', is_correct: 0 }
                  ]
                },
                {
                  text: 'Middleware express.urlencoded({ extended: true }) có tác dụng chính là gì?',
                  answers: [
                    { text: 'Phân tích dữ liệu gửi lên từ form HTML vào req.body', is_correct: 1 },
                    { text: 'Mã hóa URL sang dạng Base64', is_correct: 0 },
                    { text: 'Nén dữ liệu hình ảnh', is_correct: 0 },
                    { text: 'Bảo vệ mật khẩu người dùng', is_correct: 0 }
                  ]
                }
              ]
            }
          },
          {
            title: 'Bài 2: Thiết kế RESTful API & Quản lý Kết nối MySQL với Connection Pool',
            order_index: 2,
            content: `<h3>1. Nguyên lý RESTful API</h3>
<p>RESTful API sử dụng các phương thức HTTP chuẩn (GET, POST, PUT, DELETE) tương ứng với các thao tác CRUD trên tài nguyên hệ thống:</p>
<ul>
  <li><code>GET /api/courses</code>: Lấy danh sách khóa học.</li>
  <li><code>POST /api/courses</code>: Tạo mới một khóa học.</li>
  <li><code>PUT /api/courses/:id</code>: Cập nhật thông tin khóa học.</li>
  <li><code>DELETE /api/courses/:id</code>: Xóa một khóa học.</li>
</ul>

<h3>2. Tại sao nên dùng MySQL Connection Pool?</h3>
<p>Thay vì mở và đóng kết nối TCP tới MySQL mỗi khi có request (rất tốn tài nguyên và dễ gây nghẽn khi có nhiều người truy cập đồng thời), <strong>Connection Pool</strong> duy trì một nhóm các kết nối sẵn có để tái sử dụng ngay lập tức.</p>

<pre><code>const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'online_learning',
  connectionLimit: 10,
  waitForConnections: true
});
module.exports = pool.promise();
</code></pre>`,
            quiz: {
              title: 'Trắc nghiệm Bài 2: RESTful API & MySQL Pool',
              questions: [
                {
                  text: 'Phương thức HTTP nào chuẩn mực nhất để cập nhật dữ liệu một tài nguyên đã tồn tại?',
                  answers: [
                    { text: 'PUT / PATCH', is_correct: 1 },
                    { text: 'GET', is_correct: 0 },
                    { text: 'POST', is_correct: 0 },
                    { text: 'OPTIONS', is_correct: 0 }
                  ]
                },
                {
                  text: 'Lợi ích lớn nhất của việc sử dụng MySQL Connection Pool so với tạo kết nối đơn lẻ là gì?',
                  answers: [
                    { text: 'Tái sử dụng các kết nối có sẵn, giảm độ trễ và tránh cạn kiệt tài nguyên', is_correct: 1 },
                    { text: 'Tự động tạo bảng nếu bảng chưa tồn tại', is_correct: 0 },
                    { text: 'Mã hóa toàn bộ cơ sở dữ liệu', is_correct: 0 },
                    { text: 'Tự động sao lưu dữ liệu sang đám mây', is_correct: 0 }
                  ]
                }
              ]
            }
          },
          {
            title: 'Bài 3: Xác thực Người dùng Bảo mật với Session, Cookie và Bcrypt',
            order_index: 3,
            content: `<h3>1. Cơ chế Session & Cookie</h3>
<p>HTTP là giao thức không trạng thái (stateless). Để ghi nhớ người dùng đã đăng nhập, server tạo một session lưu trong bộ nhớ và gửi một Session ID về trình duyệt lưu trong Cookie bảo mật (HttpOnly).</p>

<h3>2. Băm mật khẩu một chiều với Bcrypt</h3>
<p>Tuyệt đối không bao giờ lưu mật khẩu dạng văn bản thuần (plain text) trong cơ sở dữ liệu. Ta sử dụng thuật toán băm kèm muối (Salt) của Bcrypt:</p>
<pre><code>// Băm mật khẩu khi đăng ký
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// Kiểm tra mật khẩu khi đăng nhập
const isMatch = await bcrypt.compare(plainPassword, user.password);
</code></pre>
<p>Bcrypt có cơ chế điều chỉnh độ khó (cost factor), giúp bảo vệ an toàn trước các cuộc tấn công Brute-force.</p>`
          }
        ]
      },
      {
        title: 'Cơ sở Dữ liệu Quan hệ & Tối ưu hóa SQL',
        description: 'Trang bị tư duy thiết kế lược đồ quan hệ, kỹ thuật chuẩn hóa dữ liệu, lập chỉ mục Index và tối ưu hóa hiệu năng truy vấn cho ứng dụng lớn.',
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            title: 'Bài 1: Chuẩn hóa Dữ liệu từ 1NF đến 3NF và Ràng buộc Khóa ngoại',
            order_index: 1,
            content: `<h3>1. Mục tiêu của Chuẩn hóa Dữ liệu</h3>
<p>Chuẩn hóa là quá trình tổ chức các cột và bảng trong cơ sở dữ liệu quan hệ nhằm giảm thiểu tối đa việc dư thừa dữ liệu (data redundancy) và tránh các bất thường khi Thêm, Sửa, Xóa (Anomalies).</p>

<ul>
  <li><strong>Dạng chuẩn 1 (1NF):</strong> Mỗi thuộc tính trong bảng phải là nguyên tố (atomic), không chứa mảng hay tập hợp lặp lại.</li>
  <li><strong>Dạng chuẩn 2 (2NF):</strong> Thỏa mãn 1NF và mọi thuộc tính không khóa phải phụ thuộc hàm đầy đủ vào khóa chính.</li>
  <li><strong>Dạng chuẩn 3 (3NF):</strong> Thỏa mãn 2NF và không có thuộc tính không khóa nào phụ thuộc bắc cầu vào khóa chính.</li>
</ul>

<h3>2. Ràng buộc Khóa ngoại (Foreign Keys)</h3>
<p>Khóa ngoại bảo toàn tính toàn vẹn tham chiếu giữa các bảng. Với thuộc tính <code>ON DELETE CASCADE</code>, khi một bản ghi cha bị xóa (ví dụ: Khóa học), toàn bộ các bản ghi con liên quan (Bài học, Lượt đăng ký) cũng sẽ tự động được thu dọn sạch sẽ.</p>`,
            quiz: {
              title: 'Trắc nghiệm Bài 1: Chuẩn hóa Dữ liệu SQL',
              questions: [
                {
                  text: 'Bảng dữ liệu đạt dạng chuẩn 1 (1NF) khi nào?',
                  answers: [
                    { text: 'Mỗi ô chứa một giá trị nguyên tố duy nhất, không chứa mảng hay danh sách lặp lại', is_correct: 1 },
                    { text: 'Bảng có ít nhất 3 khóa ngoại', is_correct: 0 },
                    { text: 'Bảng không có khóa chính', is_correct: 0 },
                    { text: 'Dữ liệu được sắp xếp theo thứ tự bảng chữ cái', is_correct: 0 }
                  ]
                },
                {
                  text: 'Tùy chọn ON DELETE CASCADE trong định nghĩa khóa ngoại có ý nghĩa gì?',
                  answers: [
                    { text: 'Khi xóa bản ghi cha thì các bản ghi con tham chiếu tới cũng tự động bị xóa', is_correct: 1 },
                    { text: 'Ngăn chặn không cho phép xóa bản ghi cha', is_correct: 0 },
                    { text: 'Đặt giá trị khóa ngoại của bản ghi con thành NULL', is_correct: 0 },
                    { text: 'Sao lưu bản ghi con sang bảng tạm', is_correct: 0 }
                  ]
                }
              ]
            }
          },
          {
            title: 'Bài 2: Kỹ thuật Indexing (B-Tree) và Phân tích Truy vấn với EXPLAIN',
            order_index: 2,
            content: `<h3>1. Chỉ mục (Index) hoạt động như thế nào?</h3>
<p>Nếu không có Index, MySQL phải duyệt toàn bộ bảng (Full Table Scan) để tìm kiếm dữ liệu. Index tạo ra cấu trúc cây B-Tree giúp tìm kiếm với độ phức tạp $O(\\log N)$.</p>

<h3>2. Sử dụng lệnh EXPLAIN</h3>
<p>Thêm từ khóa <code>EXPLAIN</code> trước câu lệnh SELECT để xem cách MySQL Query Optimizer thực thi truy vấn:</p>
<pre><code>EXPLAIN SELECT * FROM lessons WHERE course_id = 1;
-- Xem cột 'type' (ALL vs ref/eq_ref), 'key', và 'rows' dự kiến duyệt
</code></pre>`
          }
        ]
      },
      {
        title: 'Thiết kế UI/UX & Tailwind CSS Chuyên nghiệp',
        description: 'Tư duy thiết kế giao diện hiện đại (Modern SaaS & Minimalist), hệ thống Design Tokens, Responsive Layout và Tailwind CSS thực chiến.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            title: 'Bài 1: Nguyên lý Thị giác, Bảng màu Tối giản và Hệ thống Design Tokens',
            order_index: 1,
            content: `<h3>1. Triết lý Thiết kế Tối giản Hiện đại (Minimalist Modern)</h3>
<p>Phong cách thiết kế hiện đại chú trọng vào khoảng trắng (white space), tính thứ bậc của văn bản (visual hierarchy) và sự tương phản thay vì lạm dụng hiệu ứng đổ bóng hay màu sắc sặc sỡ.</p>

<h3>2. Cấu trúc Design Tokens</h3>
<p>Design Tokens là các biến định nghĩa giá trị thị giác cốt lõi: màu nền canvas, màu nút primary, đường viền hairline và bán kính bo góc.</p>
<pre><code>// Ví dụ Design Tokens tối giản chuẩn Ollama:
// Canvas: #ffffff (nền giấy trắng phẳng)
// Primary: #000000 (nút pill đen dứt khoát)
// Border: #e5e5e5 (đường viền hairline 1px)
// Geometry: rounded-full (bo cong toàn phần)
</code></pre>`,
            quiz: {
              title: 'Trắc nghiệm: Tư duy Thiết kế UI/UX',
              questions: [
                {
                  text: 'Trong phong cách thiết kế Minimalist, yếu tố nào đóng vai trò quan trọng nhất để tạo sự phân cấp thông tin?',
                  answers: [
                    { text: 'Khoảng trắng (whitespace) và trọng số chữ (font weight / typography)', is_correct: 1 },
                    { text: 'Đổ bóng đậm nhiều lớp (heavy drop shadows)', is_correct: 0 },
                    { text: 'Sử dụng nhiều màu gradient rực rỡ', is_correct: 0 },
                    { text: 'Viền khung dày nhiều màu sắc', is_correct: 0 }
                  ]
                }
              ]
            }
          },
          {
            title: 'Bài 2: Làm chủ Flexbox, Grid và Responsive Design với Tailwind CSS',
            order_index: 2,
            content: `<h3>1. Nguyên tắc Mobile-First trong Tailwind CSS</h3>
<p>Trong Tailwind CSS, các class mặc định không có prefix sẽ áp dụng cho màn hình nhỏ nhất (Mobile), sau đó sử dụng các breakpoint <code>sm:</code>, <code>md:</code>, <code>lg:</code> để mở rộng bố cục:</p>
<pre><code><!-- Responsive Card Layout -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Items -->
</div>
</code></pre>`
          }
        ]
      },
      {
        title: 'Cấu trúc Dữ liệu & Giải thuật Ứng dụng',
        description: 'Xây dựng nền tảng tư duy thuật toán vững chắc, phân tích độ phức tạp Big-O, thao tác danh sách, ngăn xếp, hàng đợi và cây nhị phân.',
        image: 'https://images.unsplash.com/photo-1516116211227-bbc14bd5280b?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            title: 'Bài 1: Phân tích Độ phức tạp Thời gian và Không gian (Big-O Notation)',
            order_index: 1,
            content: `<h3>1. Ký hiệu Big-O là gì?</h3>
<p>Big-O biểu thị giới hạn trên về thời gian thực thi hoặc bộ nhớ cần thiết của một giải thuật khi kích thước đầu vào $N$ tăng dần tới vô cùng:</p>
<ul>
  <li>$O(1)$: Thời gian hằng số (truy cập phần tử mảng qua chỉ số).</li>
  <li>$O(\\log N)$: Thời gian logarit (tìm kiếm nhị phân).</li>
  <li>$O(N)$: Thời gian tuyến tính (duyệt mảng 1 vòng lặp).</li>
  <li>$O(N \\log N)$: Sắp xếp tối ưu (Merge Sort, Quick Sort trung bình).</li>
  <li>$O(N^2)$: Hai vòng lặp lồng nhau (Bubble Sort).</li>
</ul>`,
            quiz: {
              title: 'Trắc nghiệm Bài 1: Độ phức tạp Thuật toán',
              questions: [
                {
                  text: 'Giải thuật tìm kiếm nhị phân (Binary Search) trên một mảng đã sắp xếp có độ phức tạp thời gian là bao nhiêu?',
                  answers: [
                    { text: 'O(log N)', is_correct: 1 },
                    { text: 'O(1)', is_correct: 0 },
                    { text: 'O(N)', is_correct: 0 },
                    { text: 'O(N^2)', is_correct: 0 }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        title: 'DevOps & Đóng gói Ứng dụng với Docker',
        description: 'Tự động hóa đóng gói ứng dụng Node.js & MySQL, làm chủ Dockerfile nhiều giai đoạn và điều phối dịch vụ với Docker Compose.',
        image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80',
        lessons: [
          {
            title: 'Bài 1: Cơ bản về Containerization và Kiến trúc Docker',
            order_index: 1,
            content: `<h3>1. Container vs Virtual Machine</h3>
<p>Khác với máy ảo (VM) phải mang theo cả một hệ điều hành khách (Guest OS) nặng hàng Gigabyte, Docker Container chia sẻ chung nhân hệ điều hành (Host OS Kernel) giúp khởi động chỉ trong tích tắc và tiêu thụ cực ít tài nguyên.</p>

<h3>2. Vòng đời của một Image</h3>
<p>Từ file cấu hình <code>Dockerfile</code>, ta build ra <strong>Image</strong>, sau đó chạy Image đó thành một hoặc nhiều <strong>Containers</strong> độc lập.</p>`,
            quiz: {
              title: 'Trắc nghiệm Bài 1: Docker & Container',
              questions: [
                {
                  text: 'Điểm khác biệt cốt lõi giữa Docker Container và Máy ảo (Virtual Machine) là gì?',
                  answers: [
                    { text: 'Container chia sẻ chung nhân hệ điều hành của máy chủ (Host Kernel)', is_correct: 1 },
                    { text: 'Container cần cài đặt một hệ điều hành khách hoàn chỉnh', is_correct: 0 },
                    { text: 'Container chỉ chạy được trên hệ điều hành Linux', is_correct: 0 },
                    { text: 'Container không thể kết nối mạng', is_correct: 0 }
                  ]
                }
              ]
            }
          }
        ]
      }
    ];

    for (const cData of sampleCourses) {
      // Check if course already exists by title
      const [existingCourse] = await db.query('SELECT id FROM courses WHERE title = ?', [cData.title]);
      let courseId;

      if (existingCourse.length > 0) {
        courseId = existingCourse[0].id;
        console.log('[*] Course already exists: ' + cData.title + ' (ID: ' + courseId + ')');
      } else {
        const [resCourse] = await db.query(
          'INSERT INTO courses (title, description, image, created_by, created_at) VALUES (?, ?, ?, ?, NOW())',
          [cData.title, cData.description, cData.image, adminId]
        );
        courseId = resCourse.insertId;
        console.log('[+] Created Course: ' + cData.title + ' (ID: ' + courseId + ')');
      }

      // Add lessons
      for (const lData of cData.lessons) {
        const [existingLesson] = await db.query(
          'SELECT id FROM lessons WHERE course_id = ? AND title = ?',
          [courseId, lData.title]
        );
        let lessonId;

        if (existingLesson.length > 0) {
          lessonId = existingLesson[0].id;
        } else {
          const [resLesson] = await db.query(
            'INSERT INTO lessons (course_id, title, content, order_index, created_at) VALUES (?, ?, ?, ?, NOW())',
            [courseId, lData.title, lData.content, lData.order_index]
          );
          lessonId = resLesson.insertId;
          console.log('   [+] Created Lesson: ' + lData.title + ' (ID: ' + lessonId + ')');
        }

        // Add quiz if present
        if (lData.quiz) {
          const [existingQuiz] = await db.query('SELECT id FROM quizzes WHERE lesson_id = ?', [lessonId]);
          let quizId;

          if (existingQuiz.length > 0) {
            quizId = existingQuiz[0].id;
          } else {
            const [resQuiz] = await db.query(
              'INSERT INTO quizzes (lesson_id, title, created_at) VALUES (?, ?, NOW())',
              [lessonId, lData.quiz.title]
            );
            quizId = resQuiz.insertId;
            console.log('      [+] Created Quiz: ' + lData.quiz.title);

            // Add questions and answers
            for (const qData of lData.quiz.questions) {
              const [resQuestion] = await db.query(
                'INSERT INTO questions (quiz_id, question_text, question_type) VALUES (?, ?, ?)',
                [quizId, qData.text, 'single_choice']
              );
              const questionId = resQuestion.insertId;

              for (const aData of qData.answers) {
                await db.query(
                  'INSERT INTO answers (question_id, answer_text, is_correct) VALUES (?, ?, ?)',
                  [questionId, aData.text, aData.is_correct]
                );
              }
            }
          }
        }
      }
    }

    console.log('\n>>> SUCCESS: ALL SAMPLE COURSES AND LESSONS SEEDED PERFECTLY!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
}

seed();
