# 🎓 EduFlow — Nền Tảng Luyện Thi IELTS & Học Thuật Thông Minh

> **Hệ sinh thái học tập và luyện thi IELTS chuẩn Cambridge**, tích hợp **Phòng thi máy tính (IELTS on Computer Simulator)** mô phỏng 100% IDP/British Council và **Hệ thống Sổ tay câu sai (Mistake Vault)** phân tích dạng bài chuyên sâu.

---

## 📌 Mục lục
- [Giới thiệu tổng quan](#-giới-thiệu-tổng-quan)
- [Điểm nhấn & Tính năng cốt lõi](#-điểm-nhấn--tính-năng-cốt-lõi)
- [Kiến trúc & Công nghệ (Tech Stack)](#-kiến-trúc--công-nghệ-tech-stack)
- [Design Tokens & Triết lý thiết kế](#-design-tokens--triết-lý-thiết-kế)
- [Cấu trúc thư mục dự án](#-cấu-trúc-thư-mục-dự-án)
- [Hướng dẫn Cài đặt & Khởi chạy](#-hướng-dẫn-cài-đặt--khởi-chạy)
  - [1. Chuẩn bị môi trường](#1-chuẩn-bị-môi-trường)
  - [2. Cài đặt thư viện dependencies](#2-cài-đặt-thư-viện-dependencies)
  - [3. Cấu hình biến môi trường (.env)](#3-cấu-hình-biến-môi-trường-env)
  - [4. Khởi tạo Cơ sở dữ liệu & Nạp dữ liệu thi](#4-khởi-tạo-cơ-sở-dữ-liệu--nạp-dữ-liệu-thi)
  - [5. Khởi động ứng dụng](#5-khởi-động-ứng-dụng)
- [Tài khoản & Hướng dẫn kiểm thử](#-tài-khoản--hướng-dẫn-kiểm-thử)
- [Quy chuẩn phát triển (Conventions)](#-quy-chuẩn-phát-triển-conventions)

---

## 🌟 Giới thiệu tổng quan

**EduFlow** được thiết kế nhằm giải quyết bài toán luyện thi IELTS thực chiến: thu hẹp khoảng cách giữa việc học lý thuyết và trải nghiệm thi thực tế trên máy tính.

Thay vì làm bài tập trên các form tĩnh, EduFlow cung cấp một môi trường tương tác cao cấp theo phong cách **Học thuật Cổ điển (Classical Academic Minimalism)**, chuẩn hóa toàn bộ kho đề thi **Cambridge IELTS 13 đến 20**, kết hợp các công cụ phân tích dữ liệu hiệu suất học tập giúp thí sinh nhận diện điểm yếu nhanh chóng.

---

## 🚀 Điểm nhấn & Tính năng cốt lõi

### 1. 🖥️ Phòng thi máy tính "IELTS on Computer" (`/exam/reading/[testId]`)
* **Mô phỏng chuẩn IDP / British Council:**
  * Kích hoạt chế độ toàn màn hình (**Fullscreen Mode**) khi bắt đầu làm bài.
  * **Topbar khảo thí:** Hiển thị mã thí sinh, thông tin đề thi, đồng hồ đếm ngược 60:00 chính xác từng giây kèm nút **"Hide Time"** để kiểm soát tâm lý phòng thi.
  * **Bố cục Split-Screen đa năng (`react-resizable-panels`):** Cho phép kéo thả điều chỉnh kích thước giữa bài đọc (Reading Passage) và danh sách câu hỏi một cách mượt mà.
* **Công cụ hỗ trợ làm bài thi:**
  * **Academic Highlighter:** Bôi đen chọn văn bản để highlight màu Vàng hổ phách (`Amber`) hoặc Xanh ngọc (`Emerald`), gỡ highlight nhanh chóng bằng 1 click.
  * **Vocabulary Vault:** Tra cứu từ vựng tức thì ngay trong bài thi.
  * **Hỗ trợ đầy đủ các dạng câu hỏi:** Multiple Choice, True/False/Not Given, Yes/No/Not Given, Matching Headings / Info, Sentence Completion (tự động highlight ô câu hỏi đang active).
* **Question Palette 40 câu hỏi thông minh:**
  * Thanh Footer cố định hiển thị trực quan trạng thái: *Chưa làm*, *Đã làm*, và *Đánh dấu xem lại (Review Flag)*.
  * Tích hợp cơ chế **tự động quy đổi con lăn chuột dọc sang cuộn ngang (Wheel-to-Horizontal-Scroll)** cùng các nút mũi tên điều hướng nhanh (`<` và `>`), không lo kẹt cuộn trên chuột PC.

---

### 2. 📓 Sổ tay câu sai & Phân tích điểm yếu (Mistake Vault)
* **Tự động lưu trữ lỗi sai:** Mỗi lần hoàn thành bài thi, các câu trả lời sai sẽ tự động được trích xuất và phân loại theo dạng bài IELTS chuẩn hóa.
* **Biểu đồ mạng nhện Radar Chart (`recharts`):** Phản ánh trực quan tỷ lệ sai sót theo từng dạng câu hỏi (TFNG, Matching Headings, Summary, MCQs,...).
* **Phân tích nguyên nhân học thuật:** Gợi ý bẫy đề thi thường gặp (Paraphrase bẫy, thiếu từ vựng chuyên ngành, quét thiếu từ khóa).
* **Chế độ Luyện tập lại (Re-practice):** Cho phép thí sinh làm lại riêng các câu hỏi từng làm sai để khắc sâu kiến thức.

---

### 3. 📚 Thư viện đề thi Cambridge IELTS 13 – 20
* Kho dữ liệu bài đọc và câu hỏi chuẩn xác, có bản dịch tiếng Việt học thuật và giải thích chi tiết đáp án.
* Lựa chọn linh hoạt giữa việc **Luyện từng Passage đơn lẻ** (20 phút) hoặc **Thi thử Full Test 3 Passages** (60 phút tính điểm Band Score 0 – 9.0).

---

### 4. 🎧 Luyện nghe chép chính tả (IELTS Listening & Dictation)
* Luyện nghe chép chính tả từng câu với audio chuẩn Cambridge.
* Hỗ trợ lặp câu, tùy chỉnh tốc độ phát âm (0.75x, 1.0x, 1.25x) và so khớp lỗi sai từ theo thời gian thực.

---

### 5. 🗂️ Không gian từ vựng Spaced Repetition (Anki SRS)
* Thuật toán lặp lại ngắt quãng giúp ghi nhớ từ vựng học thuật C1-C2 lâu dài.
* Quản lý bộ thẻ Flashcard 3D và tự động gom từ vựng tra cứu từ các bài đọc Cambridge.

---

## 🛠️ Kiến trúc & Công nghệ (Tech Stack)

### Frontend
| Công nghệ / Thư viện | Phiên bản | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Thư viện UI nền tảng |
| **TypeScript** | `^5.7.3` | Đảm bảo tính toàn vẹn kiểu dữ liệu (Strict typing) |
| **Vite** | `^5.4.14` | Build tool và dev server tốc độ cao |
| **Tailwind CSS** | `^3.4.17` | Utility-first styling theo hệ thống Design Tokens |
| **Zustand** | `^5.0.15` | Quản lý state phòng thi (`examRoomStore`) độc lập, hiệu năng cao |
| **react-resizable-panels** | `^4.12.4` | Chia đôi màn hình Split-screen bài đọc / câu hỏi |
| **Recharts** | `^3.10.1` | Biểu đồ Radar Chart & Donut Chart phân tích điểm yếu |
| **Lucide React** | `^0.475.0` | Bộ icon giao diện hiện đại |
| **Framer Motion & GSAP** | `^11 / ^3` | Animation chuyển cảnh mượt mà |
| **Lenis** | `^1.3.26` | Smooth scroll cho landing page (ngắt thông minh trong phòng thi) |

### Backend & Database
| Công nghệ | Vai trò |
| :--- | :--- |
| **Node.js & Express.js** | Xây dựng RESTful API cho React Frontend & Quản lý Session |
| **MySQL (mysql2 pool)** | Lưu trữ dữ liệu bài đọc, câu hỏi khảo thí, từ vựng và kết quả thi |
| **EJS Template Engine** | Giao diện quản trị truyền thống cho Admin (Course/Lesson CRUD) |
| **Bcrypt & Session** | Mã hóa mật khẩu bảo mật và duy trì phiên đăng nhập |

---

## 🎨 Design Tokens & Triết lý thiết kế

Giao diện của EduFlow tuân thủ triết lý **Classical Academic Minimalism** (Học thuật cổ điển tối giản, sang trọng, tập trung cao độ):

* **Bảng màu chủ đạo (Color Palette):**
  * `Nền đá sáng (Alabaster Stone):` `#FAFAF9` — Giảm mỏi mắt khi làm bài đọc dài.
  * `Xanh rừng thẫm (Deep Forest Green):` `#064E3B` (`forest-950`) — Màu nhận diện học thuật cao cấp.
  * `Vàng hổ phách (Amber Gold):` `#D97706` (`gold-500`) — Điểm nhấn sang trọng và thông báo quan trọng.
* **Typography:**
  * **Font Serif `Lora`:** Sử dụng cho các tiêu đề chính, bài đọc Cambridge Reading, tạo trải nghiệm như đọc sách in học thuật.
  * **Font Sans `Be Vietnam Pro`:** Tối ưu hóa cho tiếng Việt, dùng cho nhãn nút bấm, bảng câu hỏi và giao diện điều khiển.

---

## 📂 Cấu trúc thư mục dự án

```
online-learning-website/
├── app.js                         # Khởi động Backend Express & cấu hình CORS/Routes
├── package.json                   # Dependencies backend & scripts tích hợp
├── .env                           # Biến môi trường (DB, Port, Session Secret)
│
├── config/
│   └── db.js                      # Cấu hình kết nối MySQL Connection Pool (mysql2/promise)
│
├── database/                      # Các kịch bản khởi tạo bảng MySQL
│   ├── create_cambridge_tables.sql # Bảng Reading Passages, Questions, Dictation, Anki
│   ├── create_english_tables.sql   # Bảng Speaking, Listening Karaoke, Flashcards
│   └── create_writing_tables.sql   # Bảng Writing Prompts & Submissions
│
├── scripts/                       # Kịch bản nạp dữ liệu thi Cambridge đồ sộ
│   ├── seedCambridgeData.js       # Seed dữ liệu Cambridge tổng hợp
│   ├── seedCambridge13All.js ~ 20All.js # Seed chi tiết từng bộ đề Cam 13 đến 20
│   └── seedEnglishData.js         # Seed từ vựng và bài nghe
│
├── routes/                        # Các tuyến đường API & Web
│   ├── api/
│   │   ├── cambridgeRoutes.js     # API cấp dữ liệu bài đọc, câu hỏi, nộp bài
│   │   └── englishRoutes.js       # API flashcards, listening, profile
│   ├── authRoutes.js              # Đăng nhập, đăng ký
│   ├── adminRoutes.js             # Quản trị khóa học
│   └── studentRoutes.js           # Khóa học học viên
│
├── views/                         # Giao diện EJS dành cho Admin
│   ├── admin/
│   └── partials/
│
└── frontend/                      # ⚡ ỨNG DỤNG REACT FRONTEND (Vite + TypeScript)
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                # Điểm neo điều hướng các phân hệ
        ├── main.tsx
        ├── context/               # AuthContext, VocabularyVault, SmoothScroll
        ├── store/
        │   └── examRoomStore.ts   # Zustand Store quản lý toàn bộ state phòng thi
        ├── modules/
        │   ├── exam/              # Module Phòng thi máy tính "IELTS on Computer"
        │   │   ├── IELTSComputerExamRoom.tsx # Giao diện phòng thi toàn màn hình
        │   │   ├── ExamReadingPanel.tsx      # Panel bài đọc + Công cụ Highlight
        │   │   ├── ExamQuestionsPanel.tsx    # Panel 40 câu hỏi tương tác
        │   │   ├── ExamFooterNav.tsx         # Question Palette 40 nút + Cuộn chuột ngang
        │   │   └── ExamSubmitModal.tsx       # Modal xác nhận nộp bài
        │   ├── mistakes/          # Module Sổ tay câu sai (Mistake Vault)
        │   │   └── MistakeVaultView.tsx      # Phân tích biểu đồ Radar & Luyện lại câu sai
        │   ├── reading/           # Thư viện đề Cambridge Reading
        │   ├── listening/         # Luyện nghe chép chính tả (Dictation)
        │   └── anki/              # Hệ thống flashcard Spaced Repetition
        ├── components/            # Các component dùng chung (Navbar, Modal, Toasts...)
        └── services/              # Kết nối HTTP API backend (cambridgeApi, englishApi)
```

---

## 💻 Hướng dẫn Cài đặt & Khởi chạy

### 1. Chuẩn bị môi trường
* Đã cài đặt **Node.js** phiên bản `>= 18.x`.
* Đã cài đặt **MySQL Server** (hoặc thông qua **XAMPP / Laragon**).

---

### 2. Cài đặt thư viện dependencies

Mở Terminal tại thư mục gốc của dự án (`online-learning-website`):

```bash
# 1. Cài đặt thư viện cho Backend
npm install

# 2. Cài đặt thư viện cho Frontend React
cd frontend
npm install
cd ..
```

---

### 3. Cấu hình biến môi trường (`.env`)

Tạo hoặc kiểm tra file `.env` tại thư mục gốc `online-learning-website/.env`:

```env
# Thông tin kết nối MySQL (Mặc định của XAMPP)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_learning
DB_PORT=3306

# Cổng khởi chạy Backend
PORT=3000

# Secret key cho Session đăng nhập
SESSION_SECRET=eduflow_secret_academic_key_2026
```

---

### 4. Khởi tạo Cơ sở dữ liệu & Nạp dữ liệu thi

1. **Tạo Database:**
   * Mở phpMyAdmin (hoặc MySQL Workbench / DBeaver) và tạo một database mới tên: `online_learning` với bảng mã `utf8mb4_unicode_ci`.
2. **Tạo cấu trúc bảng:**
   * Chạy kịch bản SQL trong thư mục `database/create_cambridge_tables.sql` và `database/create_english_tables.sql` trên database `online_learning`.
3. **Nạp dữ liệu đề thi Cambridge tự động:**
   * Chạy các lệnh nạp dữ liệu mẫu bằng terminal tại thư mục gốc:

```bash
# Nạp dữ liệu Cambridge tổng hợp & từ vựng
npm run db:seed:cambridge

# (Tùy chọn) Nạp đầy đủ đề thi Cambridge 13 đến 20
node scripts/seedCambridge13All.js
node scripts/seedCambridge18All.js
node scripts/seedCambridge19All.js
node scripts/seedCambridge20All.js
```

---

### 5. Khởi động ứng dụng

Bạn chỉ cần chạy **một lệnh duy nhất** tại thư mục gốc để khởi động đồng thời cả Backend và Frontend:

```bash
npm run dev
```

* **Frontend (Giao diện chính React):** Mở trình duyệt truy cập: [http://localhost:5173](http://localhost:5173)
* **Backend API Server:** Đang chạy tại [http://localhost:3000](http://localhost:3000)

*(Nếu muốn chạy độc lập: dùng `npm run server` cho Backend và `npm run client` cho Frontend).*

---

## 👥 Tài khoản & Hướng dẫn kiểm thử

* **Trải nghiệm Học viên:**
  * Người dùng có thể bấm **"Bắt đầu học ngay"** trên giao diện chính hoặc đăng ký tài khoản mới trực tiếp tại modal xác thực.
  * Truy cập ngay phân hệ **Reading** để chọn đề thi bất kỳ (ví dụ: *Cambridge 18 Test 2 Passage 2* hoặc *Full Test*) và chọn nút **"Thi thử máy tính (IELTS on Computer)"** để vào phòng thi mô phỏng.
* **Tạo tài khoản Quản trị viên (Admin):**
  * Đăng ký một tài khoản bất kỳ tại form đăng ký.
  * Mở bảng `users` trong MySQL / phpMyAdmin và chỉnh sửa cột `role` của tài khoản đó từ `'student'` thành `'admin'`.
  * Truy cập cổng quản trị tại [http://localhost:3000/admin](http://localhost:3000/admin).

---

## 🛡️ Quy chuẩn phát triển (Conventions)

1. **Xử lý chuỗi Tiếng Việt (Unicode Safety):**
   * **Tuyệt đối KHÔNG sử dụng `.split('')`** trực tiếp trên chuỗi tiếng Việt có dấu để tránh lỗi vỡ tổ hợp ký tự ngữ âm (combining characters). Luôn sử dụng `Array.from(str)` hoặc `Intl.Segmenter`.
2. **Lenis Smooth Scroll:**
   * Các container toàn màn hình như phòng thi hoặc bảng tính cần được gắn thuộc tính `data-lenis-prevent="true"` và tạm dừng Lenis (`stopLenis()`) để đảm bảo các thanh cuộn con lồng nhau hoạt động mượt mà.
3. **Responsive & Resizable Panels:**
   * Mọi flex container cha lồng nhau dẫn đến phần tử `overflow-y-auto` phải luôn có thuộc tính `min-h-0` để trình duyệt kích hoạt đúng kích thước cuộn.

---

<p align="center">
  Được xây dựng với niềm đam mê nâng cao chất lượng giáo dục học thuật trực tuyến.<br/>
  <b>© 2026 EduFlow Platform. All rights reserved.</b>
</p>
