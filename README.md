# 🎓 EduFlow — Nền Tảng Luyện Thi IELTS & Học Từ Vựng Trực Tuyến

<p align="center">
  <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80" alt="EduFlow Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <b>Hệ thống luyện thi Cambridge IELTS thực chiến (Reading & Listening), chép chính tả video YouTube và học từ vựng Flashcard Anki.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
</p>

---

## 📌 Mục Lục

1. [Giới thiệu tổng quan](#-giới-thiệu-tổng-quan)
2. [Các tính năng chính trong hệ thống](#-các-tính-năng-chính-trong-hệ-thống)
   - [1. Luyện Đề Reading (Cambridge 10–20)](#1-luyện-đề-reading-cambridge-1020)
   - [2. Luyện Đề Listening (Cambridge 13–20)](#2-luyện-đề-listening-cambridge-1320)
   - [3. Chép chính tả Video YouTube](#3-chép-chính-tả-video-youtube)
   - [4. Sổ tay từ vựng & Flashcard Anki](#4-sổ-tay-từ-vựng--flashcard-anki)
   - [5. Trang cá nhân & Quản lý tài khoản](#5-trang-cá-nhân--quản-lý-tài-khoản)
   - [6. Cổng Quản trị Admin](#6-cổng-quản-trị-admin)
3. [Kiến trúc & Công nghệ (Tech Stack)](#-kiến-trúc--công-nghệ-tech-stack)
4. [Hệ màu sắc & Giao diện (Design Tokens)](#-hệ-màu-sắc--giao-diện-design-tokens)
5. [Cấu trúc thư mục mã nguồn](#-cấu-trúc-thư-mục-mã-nguồn)
6. [Hướng dẫn Cài đặt & Khởi chạy Local](#-hướng-dẫn-cài-đặt--khởi-chạy-local)
7. [Hướng dẫn Triển khai lên Cloud (Render)](#-hướng-dẫn-triển-khai-lên-cloud-render)
8. [Tài khoản kiểm thử](#-tài-khoản-kiểm-thử)

---

## 🌟 Giới Thiệu Tổng Quan

**EduFlow** là website học tập và luyện thi IELTS trực tuyến được thiết kế theo phong cách tối giản thanh lịch (Academic Minimalism), tập trung vào các chức năng thực tế phục vụ trực tiếp cho người học:

1. **Luyện đề thi Cambridge chuẩn thực tế:** Trải nghiệm thi thử Reading và Listening trên máy tính với giao diện mô phỏng phòng thi chuẩn IDP/British Council.
2. **Luyện nghe chép chính tả (Dictation):** Luyện nghe từng câu qua video YouTube bất kỳ, hỗ trợ phụ đề song ngữ và nhận diện lỗi gõ từ theo thời gian thực.
3. **Ghi nhớ từ vựng lâu bền:** Ứng dụng phương pháp ôn tập ngắt quãng (Spaced Repetition) với thẻ Flashcard 3D và hỗ trợ xuất file sang phần mềm Anki.

---

## 🚀 Các Tính Năng Chính Trong Hệ Thống

### 1. Luyện Đề Reading (Cambridge 10–20)
* **Chế độ phòng thi máy tính (IELTS on Computer Simulator):**
  * Kích hoạt chế độ toàn màn hình (**Fullscreen Mode**) khi bắt đầu làm bài.
  * **Thanh công cụ thi:** Hiển thị mã thí sinh, thông tin đề thi, đồng hồ đếm ngược 60 phút kèm nút **"Hide Time"** để kiểm soát tâm lý.
  * **Bố cục Split-Screen đa năng (`react-resizable-panels`):** Kéo thả chuột để điều chỉnh tỷ lệ giữa cột bài đọc (Passage) và cột câu hỏi (Questions).
  * **Bút dạ quang (Highlighter):** Bôi đen văn bản để đánh dấu màu Vàng (`Amber`) hoặc Xanh ngọc (`Emerald`), hỗ trợ gỡ highlight 1-click.
  * **Tra từ điển 1 chạm:** Bôi đen từ bất kỳ trong bài đọc để tra cứu phiên âm IPA, từ loại, nghĩa tiếng Việt và bấm lưu nhanh vào Flashcard.
* **Hỗ trợ đầy đủ các dạng bài IELTS Reading:**
  * True / False / Not Given & Yes / No / Not Given
  * Multiple Choice (Chọn 1 hoặc nhiều đáp án)
  * Matching Headings & Matching Information
  * Sentence Completion / Summary Completion / Table Completion
* **Thanh điều hướng 40 câu hỏi thông minh:**
  * Footer hiển thị trực quan trạng thái: *Chưa làm*, *Đã làm*, và *Đánh dấu xem lại (Review Flag)*.
  * Tích hợp cơ chế **chuyển con lăn chuột dọc thành cuộn ngang** (`onWheel deltaY -> scrollLeft`) kèm nút `<` và `>` điều hướng nhanh.
* **AI Giải thích đáp án:**
  * Xem điểm Band Score ngay sau khi nộp bài.
  * AI đối chiếu câu hỏi với đoạn văn dẫn chứng trong bài đọc, phân tích bẫy đề thi và giải thích chi tiết vì sao đáp án đúng/sai.

---

### 2. Luyện Đề Listening (Cambridge 13–20)
* **Phòng thi trọn vẹn 4 Section (40 câu):**
  * Tích hợp đề thi Listening từ Cambridge 13, 14, 15, 16, 18, 19, 20 kèm file âm thanh gốc.
* **Màn hình Sound Check:**
  * Thử âm thanh kiểm tra tai nghe và điều chỉnh âm lượng trước khi bấm bắt đầu làm bài.
* **Trình phát Audio Listening đồng bộ:**
  * Tự động phát âm thanh theo từng Section, có nút tua lùi 5 giây (`ArrowLeft`) và đồng hồ đếm ngược.
* **Phòng xem lại kết quả & Phụ đề Karaoke:**
  * Thống kê số câu đúng/sai theo từng Section và tính điểm Band Score (0–9.0).
  * Bảng phụ đề Karaoke đồng bộ: Dòng phụ đề tự động đổi màu theo giọng đọc audio, bấm vào dòng phụ đề bất kỳ để tua audio đến đúng thời điểm đó.

---

### 3. Chép chính tả Video YouTube
* **Nhập link YouTube linh hoạt:**
  * Dán bất kỳ đường link video YouTube nào (`youtube.com/watch?v=...` hoặc `youtu.be/...`) hoặc chọn từ kho video chọn lọc có sẵn.
* **Tự động lấy phụ đề:**
  * Tự động lấy phụ đề tiếng Anh và tiếng Việt từ video.
  * Tích hợp sẵn cơ chế **Proxy Subtitle (`YOUTUBE_PROXY`)** trong backend để tránh bị YouTube chặn IP khi chạy trên máy chủ đám mây (Render).
  * Hỗ trợ tải file phụ đề `.srt`, `.vtt` hoặc dán phụ đề thủ công nếu video không có sẵn phụ đề.
* **Chế độ gõ nghe từng câu (Focus Room):**
  * Video tự động phát và dừng theo từng câu phụ đề.
  * **Bộ so khớp từ (Diff Engine):** Chấm điểm độ chính xác theo phần trăm (%), bôi màu từ gõ đúng (xanh lá), từ gõ sai/thừa (đỏ), và phát hiện lỗi chính tả nhẹ (vàng).
  * **Phím tắt hỗ trợ thao tác nhanh:**
    - `Tab`: Bật / Tạm dừng phát video ở câu hiện tại
    - `Enter`: Kiểm tra đáp án (hoặc chuyển câu tiếp theo khi đạt $\ge 90\%$)
    - `Ctrl + H`: Gợi ý điền tự động 1 từ tiếp theo
    - `Alt + ←` / `Alt + →`: Chuyển lùi / tiến câu thoại
  * Nút "Hiện Đáp Án Câu Này" khi học viên gặp câu quá khó.

---

### 4. Sổ tay từ vựng & Flashcard Anki
* **Thuật toán ôn tập ngắt quãng (SM-2 Spaced Repetition):**
  * Tự động phân loại và tính lịch nhắc học theo 3 trạng thái: *Cần ôn tập hôm nay*, *Từ mới nạp*, và *Đã nhớ kỹ*.
* **Thẻ học 3D sinh động:**
  * Mặt trước: Câu ví dụ khuyết từ (Cloze), nghĩa tiếng Việt và phát âm audio US/UK.
  * Mặt sau: Từ vựng hoàn chỉnh, phiên âm IPA, từ loại và các cụm từ đi kèm (Collocations).
* **Tạo thẻ nhanh bằng AI:**
  * Nhập từ vựng bất kỳ, AI tự động gợi ý phiên âm IPA, giải nghĩa tiếng Việt và đặt câu ví dụ học thuật chuẩn Cambridge.
* **Xuất dữ liệu cho phần mềm Anki:**
  * Xuất file bảng tính TSV/CSV UTF-8 BOM để nhập ngay vào Anki Desktop hoặc AnkiMobile.
  * Xuất gói dữ liệu `.apkg` kèm tài liệu hướng dẫn nhập thẻ.

---

### 5. Trang cá nhân & Quản lý tài khoản
* Xem thông tin cá nhân và cập nhật Họ tên, Email.
* Đổi mật khẩu tài khoản trực tiếp trong hệ thống.
* Theo dõi các chỉ số học tập cá nhân:
  - Số đề đã luyện
  - Số bài nghe đã hoàn thành
  - Số từ vựng Anki đã lưu
  - Chứng nhận đạt được

---

### 6. Cổng Quản trị Admin
* Bảng điều khiển quản trị (`/admin`):
  * Thống kê số lượng học viên và các tài khoản quản trị.
  * Bảng điểm tổng hợp lịch sử thi thử của học viên (họ tên, đề thi, số câu đúng, điểm Band Score, ngày thi).
  * Danh sách đề thi Cambridge, hỗ trợ bật/tắt hoặc quản lý đề thi.

---

## 🛠️ Kiến Trúc & Công Nghệ (Tech Stack)

### Frontend
- **Framework:** React 18 (`react`, `react-dom`) với TypeScript
- **Build Tool:** Vite 5 (tốc độ build và hot-reload nhanh)
- **Styling:** Tailwind CSS 3 (hệ thống design tokens thanh lịch)
- **State Management:** Zustand (quản lý trạng thái cho phòng thi, bài nghe và flashcard)
- **Layout Panels:** `react-resizable-panels` (chia đôi màn hình bài đọc & câu hỏi)
- **Icons:** `lucide-react`
- **Hiệu ứng & Cuộn:** Framer Motion, GSAP, Lenis (smooth scroll cho landing page)

### Backend & Cơ sở dữ liệu
- **Runtime:** Node.js (phiên bản `>= 18.x`)
- **Web Framework:** Express.js 4 (REST API, session cookies)
- **Database:** MySQL 8.0 (kết nối qua `mysql2/promise` pool)
- **Authentication & Security:** `bcryptjs` (băm mật khẩu bảo mật), `express-session`, đăng nhập nhanh qua Google (OAuth), và khôi phục mật khẩu qua mã OTP 6 số
- **YouTube Subtitle Extractor:** `youtube-transcript` kết hợp `https-proxy-agent`

---

## 🎨 Hệ Màu Sắc & Giao Diện (Design Tokens)

EduFlow được xây dựng với triết lý tối giản, dễ chịu cho mắt khi làm bài thi kéo dài:
- **Nền đá cẩm thạch sáng (Alabaster Stone):** `#FAFAF9` — Màu nền chủ đạo, chống mỏi mắt.
- **Xanh rừng thẫm (Deep Forest Green):** `#064E3B` — Màu thương hiệu chủ đạo, tạo cảm giác học thuật chỉn chu.
- **Vàng hổ phách (Amber Gold):** `#D97706` — Điểm nhấn cho nút hành động và thông báo quan trọng.
- **Màu chữ than (Charcoal Text):** `#1C1917` (`stone-900`) — Độ tương phản cao, dễ đọc.
- **Font chữ:** Font Serif `Lora` cho tiêu đề và bài đọc; Font Sans `Be Vietnam Pro` cho nhãn giao diện và bảng câu hỏi.

---

## 📂 Cấu Trúc Thư Mục Mã Nguồn

```
online-learning-website/
├── app.js                         # Server Express (CORS, Sessions, API routes)
├── package.json                   # Dependencies backend & scripts khởi chạy
├── config/
│   └── db.js                      # Cấu hình kết nối MySQL pool (mysql2)
├── database/
│   └── create_cambridge_tables.sql # Kịch bản tạo các bảng dữ liệu MySQL
├── scripts/
│   ├── seedCambridgeData.js       # Nạp dữ liệu Cambridge mẫu & từ vựng
│   └── seedAllCambridge.js        # Nạp toàn bộ đề Cambridge 13 đến 20
├── routes/
│   └── api/
│       ├── authRoutes.js          # Đăng nhập, đăng ký, đăng xuất, phiên làm việc
│       ├── cambridgeRoutes.js     # API bài đọc, câu hỏi Reading, chấm điểm thi
│       ├── dictationRoutes.js     # API lấy phụ đề YouTube (hỗ trợ Proxy)
│       ├── ankiRoutes.js          # API flashcards, tra từ điển AI
│       └── adminRoutes.js         # API quản trị học viên và bảng điểm
└── frontend/                      # Ứng dụng React (Vite + TypeScript)
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                # Điều hướng các màn hình
        ├── main.tsx               # Điểm khởi chạy React
        ├── context/               # AuthContext, VocabularyVault, SmoothScroll
        ├── store/                 # Zustand store (useExamStore, useListeningStore, ankiStore)
        ├── modules/
        │   ├── exam/              # Phòng thi máy tính "IELTS on Computer"
        │   ├── reading/           # Thư viện đề và bài làm Reading
        │   ├── listening-exam/    # Phòng thi trọn vẹn 4 Section Listening
        │   ├── dictation/         # Phân hệ Chép chính tả YouTube (/dictation)
        │   └── anki/              # Sổ tay từ vựng & Flashcard 3D
        ├── components/
        │   ├── marketing/         # Hero, Navbar, Footer, Features Scrollytelling
        │   ├── admin/             # Bảng điều khiển quản trị Admin
        │   ├── profile/           # Trang cá nhân & Tài khoản
        │   └── shared/            # Popup tra từ điển, Toast thông báo
        └── services/              # Kết nối HTTP API (cambridgeApi, englishApi)
```

---

## 💻 Hướng Dẫn Cài Đặt & Khởi Chạy Local

### Bước 1: Cài đặt thư viện dependencies
Mở Terminal tại thư mục `online-learning-website`:

```bash
# Cài đặt thư viện Backend
npm install

# Cài đặt thư viện Frontend React
cd frontend
npm install
cd ..
```

---

### Bước 2: Cấu hình biến môi trường (`.env`)
Tạo file `.env` tại thư mục `online-learning-website/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_learning
DB_PORT=3306
SESSION_SECRET=eduflow_secret_academic_key_2026

# (Tùy chọn) Proxy khi cần lấy phụ đề YouTube nếu bị chặn IP
# YOUTUBE_PROXY=http://username:password@proxy-host:port
```

---

### Bước 3: Khởi tạo Cơ sở dữ liệu MySQL
1. Mở phpMyAdmin (hoặc DBeaver / MySQL Workbench trong XAMPP / Laragon).
2. Tạo database mới tên `online_learning` với bảng mã `utf8mb4_unicode_ci`.
3. Chạy file SQL tạo bảng: `database/create_cambridge_tables.sql`.
4. Nạp dữ liệu đề thi Cambridge:

```bash
# Nạp dữ liệu đề thi mẫu
npm run db:seed:cambridge

# (Tùy chọn) Nạp đầy đủ toàn bộ đề thi Cambridge 13 đến 20
npm run db:seed:all
```

---

### Bước 4: Khởi động ứng dụng
Chạy lệnh sau tại thư mục `online-learning-website` để bật đồng thời cả Backend và Frontend:

```bash
npm run dev
```

* **Giao diện Web (Frontend React):** Mở trình duyệt tại [http://localhost:5173](http://localhost:5173)
* **Backend API Server:** Đang chạy tại [http://localhost:3000](http://localhost:3000)

---

## ☁️ Hướng Dẫn Triển Khai Lên Cloud (Render)

1. **Tạo Web Service trên Render:**
   - Kết nối với kho Git chứa dự án.
   - Root Directory: `online-learning-website`
   - Build Command:
     ```bash
     npm run build
     ```
   - Start Command:
     ```bash
     npm start
     ```
2. **Cấu hình Environment Variables trên Render:**
   - `PORT`: `10000` (hoặc để Render tự động chỉ định)
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`: Thông tin database MySQL online (Aiven, TiDB, PlanetScale...)
   - `SESSION_SECRET`: Một chuỗi ký tự bí mật bất kỳ
   - `YOUTUBE_PROXY`: *(Khuyên dùng)* HTTP Proxy để Render lấy phụ đề từ YouTube ổn định.

---

## 👥 Tài Khoản Kiểm Thử

| Loại tài khoản | Email đăng nhập | Mật khẩu | Chức năng kiểm thử |
| :--- | :--- | :--- | :--- |
| **Học viên (Student)** | `student@example.com` | `123456` | Làm bài thi Reading, Listening, chép chính tả YouTube, học Flashcard |
| **Quản trị viên (Admin)** | `admin@example.com` | `123456` | Xem thống kê học viên, quản lý đề thi và bảng điểm tại `/admin` |

*Lưu ý: Học viên có thể tự đăng ký tài khoản mới trực tiếp trên website mà không cần tài khoản mẫu.*

---

<p align="center">
  <b>© 2026 EduFlow Platform. All rights reserved.</b>
</p>
