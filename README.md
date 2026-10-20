# 🎓 EduFlow — Nền Tảng Luyện Thi IELTS & Học Từ Vựng Trực Tuyến

<p align="center">
  <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80" alt="EduFlow Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <b>Hệ thống luyện thi Cambridge IELTS thực chiến, chép chính tả video YouTube và ghi nhớ từ vựng Flashcard Anki.</b><br/>
  Giao diện tối giản thanh lịch, mô phỏng phòng thi máy tính chuẩn IDP/BC và hỗ trợ trợ lý AI giải thích đề chi tiết.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
</p>

---

## 📌 Mục Lục

1. [Tổng quan dự án](#-tổng-quan-dự-án)
2. [Tính năng nổi bật](#-tính-năng-nổi-bật)
   - [1. Luyện thi IELTS Reading (Cambridge 10–20)](#1-luyện-thi-ielts-reading-cambridge-1020)
   - [2. Luyện thi IELTS Listening (Cambridge 13–20)](#2-luyện-thi-ielts-listening-cambridge-1320)
   - [3. Chép chính tả video YouTube](#3-chép-chính-tả-video-youtube)
   - [4. Sổ tay từ vựng & Flashcard Anki](#4-sổ-tay-từ-vựng--flashcard-anki)
   - [5. Luyện viết Writing Task 1 & Luyện nói Speaking Mock Room](#5-luyện-viết-writing-task-1--luyện-nói-speaking-mock-room)
   - [6. Cổng quản trị Admin & Thống kê học tập](#6-cổng-quản-trị-admin--thống-kê-học-tập)
3. [Kiến trúc công nghệ (Tech Stack)](#-kiến-trúc-công-nghệ-tech-stack)
4. [Hệ màu & Triết lý thiết kế (Design Tokens)](#-hệ-màu--triết-lý-thiết-kế-design-tokens)
5. [Cấu trúc thư mục mã nguồn](#-cấu-trúc-thư-mục-mã-nguồn)
6. [Hướng dẫn cài đặt & Khởi chạy Local](#-hướng-dẫn-cài-đặt--khởi-chạy-local)
   - [Bước 1: Clone mã nguồn & Cài dependencies](#bước-1-clone-mã-nguồn--cài-dependencies)
   - [Bước 2: Cấu hình biến môi trường (.env)](#bước-2-cấu-hình-biến-môi-trường-env)
   - [Bước 3: Khởi tạo Cơ sở dữ liệu MySQL](#bước-3-khởi-tạo-cơ-sở-dữ-liệu-mysql)
   - [Bước 4: Nạp dữ liệu đề thi Cambridge](#bước-4-nạp-dữ-liệu-đề-thi-cambridge)
   - [Bước 5: Chạy ứng dụng](#bước-5-chạy-ứng-dụng)
7. [Hướng dẫn triển khai lên Cloud (Render)](#-hướng-dẫn-triển-khai-lên-cloud-render)
8. [Tài khoản kiểm thử mẫu](#-tài-khoản-kiểm-thử-mẫu)
9. [Quy chuẩn phát triển (Conventions)](#-quy-chuẩn-phát-triển-conventions)

---

## 🌟 Tổng Quan Dự Án

**EduFlow** là nền tảng học tập và luyện thi IELTS trực tuyến toàn diện, tập trung vào trải nghiệm thực chiến chất lượng cao:
- **Thực chiến chuẩn kỳ thi thật:** Thu hẹp khoảng cách giữa học lý thuyết và thi thực tế trên máy tính nhờ giao diện mô phỏng 100% phần mềm thi máy tính của IDP và British Council.
- **Phương pháp luyện nghe ngấm sâu:** Tích hợp bộ công cụ luyện nghe chép chính tả từng câu (Dictation) qua video YouTube bất kỳ hoặc từ kho video bản quyền.
- **Ghi nhớ từ vựng lâu bền:** Ứng dụng phương pháp ôn tập ngắt quãng (Spaced Repetition SM-2) với thẻ Flashcard 3D sinh động, đồng bộ trực tiếp từ lúc làm bài đọc Cambridge.
- **Trợ lý AI hỗ trợ giải thích:** Tự động đối chiếu câu hỏi với đoạn văn dẫn chứng, phân tích các bẫy đề thi và giải thích chi tiết đáp án.

---

## 🚀 Tính Năng Nổi Bật

### 1. Luyện thi IELTS Reading (Cambridge 10–20)
* **Chế độ phòng thi máy tính (IELTS on Computer Simulator):**
  * Kích hoạt chế độ toàn màn hình (**Fullscreen Mode**) tạo cảm giác như ngồi tại điểm thi thật.
  * **Thanh Topbar:** Hiển thị mã thí sinh, thông tin đề thi, đồng hồ đếm ngược 60 phút kèm nút **"Hide Time"** để kiểm soát tâm lý.
  * **Bố cục Split-Screen đa năng (`react-resizable-panels`):** Kéo thả mượt mà để tùy chỉnh kích thước giữa cột bài đọc (Passage) và cột câu hỏi (Questions).
* **Công cụ hỗ trợ làm bài thi:**
  * **Bút dạ quang (Highlighter):** Bôi đen đoạn văn để đánh dấu màu Vàng (`Amber`) hoặc Xanh ngọc (`Emerald`), hỗ trợ gỡ màu nhanh 1-click.
  * **Tra từ điển 1 chạm:** Chọn từ bất kỳ trong bài đọc để xem phát âm IPA, từ loại và nghĩa tiếng Việt, đồng thời lưu trực tiếp vào Flashcard với 1 click.
  * **Hỗ trợ đầy đủ dạng bài IELTS:** True/False/Not Given, Yes/No/Not Given, Multiple Choice, Matching Headings, Summary Completion, Table Completion.
* **Thanh điều hướng 40 câu hỏi thông minh:**
  * Footer hiển thị màu trạng thái: *Chưa làm*, *Đã điền* và *Đánh dấu xem lại (Review Flag)*.
  * Tự động chuyển đổi con lăn chuột dọc thành cuộn ngang (**Wheel-to-Horizontal-Scroll**), kèm nút `<` và `>` tiện lợi.
* **AI Giải thích & Đối chiếu dẫn chứng:**
  * Sau khi nộp bài, hệ thống hiển thị điểm Band Score (0–9.0) và giải thích chi tiết lý do đúng/sai, trích xuất đoạn văn chứa bằng chứng trả lời.

---

### 2. Luyện thi IELTS Listening (Cambridge 13–20)
* **Phòng thi trọn vẹn 4 Section (40 câu hỏi):**
  * Tích hợp trọn vẹn đề thi Listening từ Cambridge 13, 14, 15, 16, 18, 19, 20 kèm file âm thanh gốc.
* **Màn hình Sound Check:**
  * Kiểm tra tai nghe bằng âm thanh chuẩn và hướng dẫn trước khi bấm bắt đầu làm bài.
* **Trình phát Audio Listening đồng bộ:**
  * Tự động phát âm thanh theo từng Section, hỗ trợ phím tắt tua 5s (`ArrowLeft`), tạm dừng/tiếp tục.
* **Trang xem lại kết quả & Karaoke Transcript:**
  * Phân tích điểm số theo từng Section.
  * Bảng phụ đề Karaoke: Dòng phụ đề tự động highlight theo thời gian phát âm thanh, nhấp vào bất kỳ dòng nào để nhảy ngay đến đoạn audio tương ứng.

---

### 3. Chép chính tả video YouTube
* **Nhập video linh hoạt:**
  * Hỗ trợ dán bất kỳ đường link video YouTube nào hoặc chọn từ kho video chọn lọc (TED-Ed, Vox, Kurzgesagt, BBC).
* **Tự động trích xuất phụ đề:**
  * Tự động nhận diện phụ đề tiếng Anh và tiếng Việt từ YouTube.
  * Tích hợp sẵn cơ chế **Proxy Subtitle (`YOUTUBE_PROXY`)** giúp backend vượt qua các hạn chế IP khi chạy trên máy chủ đám mây (Render).
  * Hỗ trợ cách dự phòng: Tự tải file `.srt`, `.vtt` hoặc dán trực tiếp văn bản phụ đề.
* **Phòng luyện nghe tương tác:**
  * Tự động tua và lặp lại từng câu theo mốc thời gian phụ đề.
  * **Thuật toán so khớp ký tự (Diff Engine):** Hiển thị chi tiết từ gõ đúng (xanh lá), từ sai/thừa (đỏ), lỗi chính tả nhẹ (vàng).
  * **Phím tắt nhanh:**
    - `Tab`: Bật / Tạm dừng video câu hiện tại
    - `Enter`: Kiểm tra đáp án (hoặc chuyển sang câu tiếp theo khi đạt $\ge 90\%$)
    - `Ctrl + H`: Gợi ý điền 1 từ tiếp theo
    - `Alt + ←` / `Alt + →`: Chuyển lùi / tiến câu thoại
  * Tính điểm chính xác phần trăm cho từng câu và thống kê kết quả toàn bài.

---

### 4. Sổ tay từ vựng & Flashcard Anki
* **Thuật toán lặp lại ngắt quãng (SM-2 Spaced Repetition):**
  * Tự động tính toán lịch nhắc nhở ôn tập tối ưu theo 3 trạng thái: *Cần ôn tập hôm nay*, *Từ mới nạp*, và *Đã nhớ kỹ*.
* **Trải nghiệm học thẻ lật 3D:**
  * Mặt trước: Câu ví dụ khuyết từ (Cloze deletion), gợi ý nghĩa và nút phát âm audio US/UK.
  * Mặt sau: Đáp án từ đầy đủ, phiên âm IPA, từ loại, định nghĩa tiếng Việt và các cụm từ đi kèm (Collocations).
* **Trợ lý AI tạo thẻ nhanh:**
  * Nhập từ vựng bất kỳ, AI sẽ tự động phân tích và tạo trọn bộ: nghĩa, phiên âm, ví dụ ngữ cảnh học thuật.
* **Xuất dữ liệu Anki đa năng:**
  * Xuất file bảng tính TSV/CSV tương thích 100% với phần mềm **Anki Desktop & AnkiMobile**.
  * Xuất gói dữ liệu `.apkg` kèm tài liệu hướng dẫn nhập thẻ từng bước.

---

### 5. Luyện viết Writing Task 1 & Luyện nói Speaking Mock Room
* **Writing Task 1 Studio:**
  * Phân tích đề bài biểu đồ (Line, Bar, Pie, Table) với hình ảnh sắc nét.
  * **Connectors Toolbar:** Bấm 1 chạm để chèn các cụm từ nối học thuật chỉ xu hướng, so sánh, dữ liệu.
  * **Heuristic Audit:** Kiểm tra tự động câu Tổng quan (Overview Detector) và đếm số liệu thực tế trong bài viết.
  * **Sentence Upgrader:** Bôi đen câu văn bất kỳ để nhận gợi ý nâng cấp lên các mức Band 6.5, Band 7.5 và Band 8.5.
* **Speaking Mock Room:**
  * Mô phỏng kỳ thi nói IELTS 3 phần với giám khảo AI ảo qua công nghệ Web Speech API (giọng đọc chuẩn Anh - Daniel `en-GB`).
  * Nhận diện giọng nói của thí sinh qua Microphone (STT) theo thời gian thực.
  * Đo tốc độ nói (Words Per Minute - WPM), tự động nhận diện từ đệm (`uhm`, `like`, `actually`, `you know`) và đề xuất từ vựng học thuật thay thế.

---

### 6. Cổng quản trị Admin & Thống kê học tập
* **Bảng điều khiển Admin (`/admin`):**
  * Quản lý danh sách học viên, phân quyền tài khoản (`student` / `admin`).
  * Bảng điểm tổng hợp lịch sử thi thử IELTS Reading và Listening của toàn hệ thống.
  * Thêm, sửa, xóa đề thi và bài đọc Cambridge.
* **Trang cá nhân học viên (`/profile`):**
  * Theo dõi số giờ đã học, điểm Band Score cao nhất, số từ vựng đã nhớ và chuỗi ngày học liên tục (Streak).
  * **Sổ tay câu sai:** Xem lại tất cả các câu hỏi từng làm sai để làm lại riêng biệt.

---

## 🛠️ Kiến Trúc Công Nghệ (Tech Stack)

### Frontend
| Thư viện / Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- |
| **React** | `^18.3.1` | Thư viện xây dựng giao diện Single Page Application (SPA) |
| **TypeScript** | `^5.7.3` | Kiểm soát chặt chẽ kiểu dữ liệu, giảm thiểu lỗi runtime |
| **Vite** | `^5.4.14` | Công cụ đóng gói và dev server hiệu năng cực nhanh |
| **Tailwind CSS** | `^3.4.17` | Hệ thống tiện ích CSS tối ưu theo Design Tokens |
| **Zustand** | `^5.0.15` | Quản lý trạng thái toàn cục (Exam Room, Dictation, Anki) |
| **react-resizable-panels** | `^4.12.4` | Chia đôi màn hình kéo thả bài đọc và câu hỏi |
| **Lucide React** | `^0.475.0` | Bộ biểu tượng giao diện tối giản, hiện đại |
| **Framer Motion & GSAP** | `^11 / ^3` | Hiệu ứng chuyển động mượt mà |
| **Lenis** | `^1.3.26` | Hiệu ứng cuộn trang mượt (tự động vô hiệu hóa trong phòng thi) |

### Backend & Database
| Công nghệ | Phiên bản | Vai trò |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.x` | Môi trường thực thi JavaScript phía máy chủ |
| **Express.js** | `^4.19.2` | RESTful API server, quản lý session và định tuyến |
| **MySQL (mysql2/promise)** | `8.0+` | Cơ sở dữ liệu quan hệ lưu đề thi, câu hỏi, tài khoản và lịch sử làm bài |
| **Bcrypt.js** | `^2.4.3` | Băm mật khẩu người dùng chuẩn mã hóa bảo mật |
| **youtube-transcript** | `^1.2.1` | Trích xuất phụ đề tự động từ video YouTube |
| **EJS** | `^3.1.10` | Render giao diện quản trị Server-side truyền thống cho Admin |

---

## 🎨 Hệ Màu & Triết Lý Thiết Kế (Design Tokens)

EduFlow áp dụng phong cách **Classical Academic Minimalism** (Học thuật cổ điển tối giản, sang trọng, tập trung vào nội dung bài thi):

* **Bảng màu cốt lõi:**
  - `Nền đá cẩm thạch sáng (Alabaster Stone):` `#FAFAF9` — Dịu mắt, không gây mỏi mắt khi đọc bài dài.
  - `Xanh rừng thẫm (Deep Forest Green):` `#064E3B` (`forest-950`) — Tông màu tri thức, học thuật chuyên nghiệp.
  - `Vàng hổ phách (Amber Gold):` `#D97706` (`gold-500`) — Điểm nhấn sang trọng cho nút bấm và nhãn nổi bật.
  - `Màu chữ than (Charcoal Text):` `#1C1917` (`stone-900`) — Độ tương phản cao, dễ đọc.
* **Bộ Font chữ chuẩn mực:**
  - **Font Serif `Lora` / `Gentium Plus`:** Dùng cho tiêu đề lớn, nội dung bài đọc Reading giống sách in Cambridge.
  - **Font Sans `Be Vietnam Pro`:** Dùng cho toàn bộ nhãn nút bấm, bảng câu hỏi và giao diện hệ thống.

---

## 📂 Cấu Trúc Thư Mục Mã Nguồn

```
online-learning-website/
├── app.js                         # Server Express chính (CORS, Sessions, Routes)
├── package.json                   # Dependencies backend & các scripts tổng hợp
├── .env.example                   # Mẫu cấu hình biến môi trường
├── config/
│   └── db.js                      # Kết nối MySQL Connection Pool (mysql2)
├── database/                      # Các file kịch bản SQL tạo bảng
│   ├── create_cambridge_tables.sql # Bảng Reading Passages, Questions, Exam Results
│   ├── create_english_tables.sql   # Bảng Listening, Flashcards, Sổ tay câu sai
│   └── create_writing_tables.sql   # Bảng đề thi Writing và Speaking
├── scripts/                       # Kịch bản nạp dữ liệu thi Cambridge
│   ├── seedCambridgeData.js       # Seed dữ liệu tổng hợp
│   ├── seedCambridge13All.js ~ 20All.js # Dữ liệu chi tiết từng cuốn Cam 13 đến 20
│   └── seedEnglishData.js         # Dữ liệu từ vựng và bài nghe mẫu
├── routes/                        # Các API Routes
│   ├── api/
│   │   ├── cambridgeRoutes.js     # API bài đọc, câu hỏi thi, chấm điểm Reading
│   │   ├── englishRoutes.js       # API Flashcard Anki, tra từ điển, Listening
│   │   └── dictationRoutes.js     # API lấy phụ đề YouTube có hỗ trợ Proxy
│   ├── authRoutes.js              # Đăng nhập, đăng ký tài khoản
│   └── adminRoutes.js             # API bảng điều khiển quản trị
├── views/                         # Giao diện quản trị EJS (Admin)
└── frontend/                      # Ứng dụng React Frontend (Vite + TS)
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                # Điều hướng toàn hệ thống
        ├── main.tsx               # Entry point
        ├── context/               # AuthContext, VocabularyVault, SmoothScroll
        ├── store/                 # Zustand Stores (useExamStore, useListeningStore, ankiStore)
        ├── modules/
        │   ├── dictation/         # Phân hệ Chép chính tả YouTube (/dictation)
        │   │   ├── DictationStudioPage.tsx
        │   │   ├── YouTubeFocusRoom.tsx
        │   │   ├── CustomVideoImporterModal.tsx
        │   │   └── diffEngine.ts
        │   ├── exam/              # Phòng thi máy tính "IELTS on Computer"
        │   │   ├── IELTSComputerExamRoom.tsx
        │   │   ├── ExamReadingPanel.tsx
        │   │   └── ExamQuestionsPanel.tsx
        │   ├── reading/           # Thư viện đề và bài làm Reading
        │   ├── listening-exam/    # Phòng thi trọn vẹn 4 Section Listening
        │   ├── anki/              # Sổ tay từ vựng & Flashcard 3D
        │   ├── writing/           # Viết biểu đồ Task 1 & Nâng cấp câu
        │   └── speaking/          # Phòng thi nói với giám khảo AI ảo
        ├── components/
        │   ├── marketing/         # Hero, Navbar, Footer, Features Scrollytelling
        │   ├── admin/             # Bảng điều khiển quản trị Admin
        │   └── shared/            # Popup tra từ điển, Toast, Audio Waveform
        └── services/              # Kết nối HTTP API (cambridgeApi, englishApi)
```

---

## 💻 Hướng Dẫn Cài Đặt & Khởi Chạy Local

### Bước 1: Clone mã nguồn & Cài dependencies

```bash
# Di chuyển vào thư mục dự án
cd online-learning-website

# 1. Cài đặt thư viện Backend
npm install

# 2. Cài đặt thư viện Frontend React
cd frontend
npm install
cd ..
```

---

### Bước 2: Cấu hình biến môi trường (`.env`)

Tạo file `.env` tại thư mục gốc `online-learning-website/.env` với nội dung mẫu sau:

```env
# Cấu hình cổng chạy Backend
PORT=3000

# Cấu hình MySQL (mặc định XAMPP / Laragon)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_learning
DB_PORT=3306

# Khóa bí mật Session
SESSION_SECRET=eduflow_secret_academic_key_2026

# (Tùy chọn) Proxy lấy phụ đề YouTube khi chạy trên máy chủ đám mây
# YOUTUBE_PROXY=http://user:password@proxy-ip:port
```

---

### Bước 3: Khởi tạo Cơ sở dữ liệu MySQL

1. Khởi động MySQL trong **XAMPP** hoặc **Laragon**.
2. Mở phpMyAdmin (hoặc DBeaver / MySQL Workbench) và tạo một database mới:
   - Tên cơ sở dữ liệu: `online_learning`
   - Bảng mã (Collation): `utf8mb4_unicode_ci`
3. Nhập (Import) các file kịch bản bảng trong thư mục `database/`:
   - `database/create_cambridge_tables.sql`
   - `database/create_english_tables.sql`
   - `database/create_writing_tables.sql`

---

### Bước 4: Nạp dữ liệu đề thi Cambridge

Chạy các lệnh nạp dữ liệu mẫu bằng terminal tại thư mục `online-learning-website`:

```bash
# 1. Nạp dữ liệu Cambridge tổng hợp & từ vựng
npm run db:seed:cambridge

# 2. Nạp chi tiết các bộ đề Cambridge 13 đến 20
node scripts/seedCambridge13All.js
node scripts/seedCambridge18All.js
node scripts/seedCambridge19All.js
node scripts/seedCambridge20All.js
```

---

### Bước 5: Chạy ứng dụng

Bạn chỉ cần thực hiện **một lệnh duy nhất** tại thư mục gốc để khởi chạy đồng thời cả Backend và Frontend:

```bash
npm run dev
```

* **Frontend (Giao diện React):** Truy cập [http://localhost:5173](http://localhost:5173)
* **Backend API Server:** Đang chạy tại [http://localhost:3000](http://localhost:3000)

*(Nếu muốn chạy riêng biệt: Dùng lệnh `npm run server` cho Backend và `npm run client` cho Frontend).*

---

## ☁️ Hướng Dẫn Triển Khai Lên Cloud (Render)

Dự án đã được tối ưu sẵn sàng cho việc deploy lên [Render](https://render.com) chỉ với vài bước:

1. **Tạo Web Service trên Render:**
   - Kết nối với kho mã nguồn GitHub của dự án (`Foundational_project`).
   - Root Directory: `online-learning-website`
   - Build Command:
     ```bash
     npm install && cd frontend && npm install && npm run build && cd ..
     ```
   - Start Command:
     ```bash
     node app.js
     ```
2. **Cấu hình Environment Variables trên Render Dashboard:**
   - `PORT`: `10000` (hoặc để Render tự gán)
   - `NODE_ENV`: `production`
   - `DB_HOST`: Địa chỉ host MySQL (Aiven, PlanetScale, TiDB hoặc Render PostgreSQL/MySQL)
   - `DB_USER`: Tên tài khoản database
   - `DB_PASSWORD`: Mật khẩu database
   - `DB_NAME`: Tên database
   - `DB_PORT`: Cổng kết nối (ví dụ `3306`)
   - `SESSION_SECRET`: Một chuỗi ngẫu nhiên bảo mật
   - `YOUTUBE_PROXY`: *(Khuyên dùng)* Điền HTTP/HTTPS proxy cá nhân để máy chủ Render lấy phụ đề YouTube ổn định không bị chặn IP.

---

## 👥 Tài Khoản Kiểm Thử Mẫu

| Vai trò | Email đăng nhập | Mật khẩu | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Học viên (Student)** | `student@example.com` | `123456` | Luyện thi Reading, Listening, chép chính tả YouTube, học Flashcard, lưu từ vựng |
| **Quản trị viên (Admin)** | `admin@example.com` | `123456` | Toàn quyền xem bảng điểm thí sinh, quản lý đề thi và người dùng tại `/admin` |

*Lưu ý: Bạn cũng có thể bấm "Bắt đầu học ngay" để đăng ký một tài khoản mới bất kỳ trong 5 giây.*

---

## 🛡️ Quy Chuẩn Phát Triển (Conventions)

1. **Xử lý chuỗi Tiếng Việt (Unicode Safety):**
   - **Tuyệt đối KHÔNG dùng `.split('')`** trực tiếp trên chuỗi tiếng Việt có dấu vì sẽ làm tách rời ký tự dấu tổ hợp (combining characters). Luôn dùng `Array.from(str)` hoặc `Intl.Segmenter`.
2. **Xử lý âm thanh & Video:**
   - Trình phát video YouTube sử dụng YouTube IFrame Player API. Luôn kiểm tra trạng thái player sẵn sàng (`player.getPlayerState()`) trước khi gửi lệnh `seekTo()` hoặc `playVideo()`.
3. **Màn hình làm bài thi & Lenis:**
   - Các màn hình làm bài thi toàn màn hình hoặc có bảng cuộn phải được gắn `data-lenis-prevent="true"` và gọi `stopLenis()` để không bị xung đột cuộn trang.
4. **Viết Microcopy tự nhiên:**
   - Tuân thủ triết lý ngôn ngữ người dùng tự nhiên (Human-first Copywriting). Không đưa tên công nghệ hoặc thuật ngữ giả học thuật lên các nút bấm và tiêu đề giao diện.

---

<p align="center">
  Được phát triển với tinh thần tạo ra trải nghiệm luyện thi IELTS tinh tế, chất lượng và hiệu quả nhất.<br/>
  <b>© 2026 EduFlow Platform. All rights reserved.</b>
</p>
