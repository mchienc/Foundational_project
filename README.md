# 🎓 eng4u — Nền Tảng Luyện Thi IELTS Toàn Diện & Trợ Lý Học Tập AI

<p align="center">
  <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80" alt="eng4u Platform Banner" width="100%" style="border-radius: 16px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <b>Hệ thống luyện thi Cambridge IELTS thực chiến 4 kỹ năng (Reading, Listening, Writing, Speaking), chép chính tả video YouTube và ghi nhớ từ vựng Flashcard Anki chuẩn khoa học.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Zustand-5.0-orange?style=flat-square" alt="Zustand" />
  <img src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black" alt="Render" />
</p>

---

## 📌 Mục Lục

1. [Giới thiệu tổng quan](#-giới-thiệu-tổng-quan)
2. [Các phân hệ tính năng chính](#-các-phân-hệ-tính-năng-chính)
   - [2.1. Luyện Đề Reading (IELTS on Computer Simulator)](#21-luyện-đề-reading-ielts-on-computer-simulator)
   - [2.2. Luyện Đề Listening (Cambridge 13–20 & Karaoke Transcript)](#22-luyện-đề-listening-cambridge-1320--karaoke-transcript)
   - [2.3. Luyện Viết AI Studio (Writing Task 1 & Task 2)](#23-luyện-viết-ai-studio-writing-task-1--task-2)
   - [2.4. Luyện Nói AI Studio (Speaking Mock Room & Random Studio)](#24-luyện-nói-ai-studio-speaking-mock-room--random-studio)
   - [2.5. Chép chính tả Video YouTube (Dictation Focus Room)](#25-chép-chính-tả-video-youtube-dictation-focus-room)
   - [2.6. Sổ tay từ vựng & Flashcard Anki (Thuật toán SM-2)](#26-sổ-tay-từ-vựng--flashcard-anki-thuật-toán-sm-2)
   - [2.7. Cổng Nâng Cấp Gói eng4u PRO & Thanh toán VietQR Napas 24/7](#27-cổng-nâng-cấp-gói-eng4u-pro--thanh-toán-vietqr-napas-247)
   - [2.8. Hồ sơ học viên & Cách ly dữ liệu cá nhân hóa](#28-hồ-sơ-học-viên--cách-ly-dữ-liệu-cá-nhân-hóa)
   - [2.9. Cổng Quản trị Hệ thống (Admin Dashboard)](#29-cổng-quản-trị-hệ-thống-admin-dashboard)
   - [2.10. Trợ lý AI Gia sư Ảo (eng4u AI Tutor Floating Bot)](#210-trợ-lý-ai-gia-sư-ảo-eng4u-ai-tutor-floating-bot)
3. [Kiến trúc & Công nghệ (Tech Stack)](#-kiến-trúc--công-nghệ-tech-stack)
4. [Hệ màu sắc & Giao diện (Design Tokens)](#-hệ-màu-sắc--giao-diện-design-tokens)
5. [Cấu trúc thư mục mã nguồn](#-cấu-trúc-thư-mục-mã-nguồn)
6. [Hướng dẫn Cài đặt & Khởi chạy Local](#-hướng-dẫn-cài-đặt--khởi-chạy-local)
7. [Hướng dẫn Triển khai lên Cloud (Render)](#-hướng-dẫn-triển-khai-lên-cloud-render)
8. [Tài khoản kiểm thử](#-tài-khoản-kiểm-thử)

---

## 🌟 Giới Thiệu Tổng Quan

**eng4u** là nền tảng học tập và luyện thi IELTS trực tuyến toàn diện, được thiết kế theo triết lý **Academic Minimalism (Tối giản Hàn lâm)**:
* **Giao diện chuẩn phòng thi quốc tế:** Trải nghiệm luyện thi Reading và Listening trên máy tính mô phỏng 1:1 chuẩn thi IDP / British Council.
* **Tích hợp phòng Lab AI thế hệ mới:** Phân hệ Luyện Viết (Writing Task 1 & 2) và Luyện Nói (Speaking 3 Parts) với Giám khảo AI bản xứ, chấm điểm theo 4 tiêu chí chuẩn IELTS.
* **Học từ vựng thông minh:** Ghi nhớ dài hạn thông qua phương pháp lặp lại ngắt quãng (Spaced Repetition Algorithm - SM-2), thẻ 3D trực quan và xuất file trực tiếp sang phần mềm Anki (`.csv`, `.apkg`).
* **Hệ sinh thái dịch vụ hoàn chỉnh:** Tích hợp thanh toán quét mã VietQR tự động kích hoạt gói PRO qua Webhook SePay, cơ chế đếm lùi và tự động kiểm soát hạn sử dụng.

---

## 🚀 Các Phân Hệ Tính Năng Chính

### 2.1. Luyện Đề Reading (IELTS on Computer Simulator)
* **Mô phỏng phòng thi máy tính thực chiến (Full-screen Exam Mode):**
  * Kích hoạt chế độ toàn màn hình khi làm bài, ngăn chặn xao nhãng.
  * **Thanh công cụ thi:** Hiển thị thông tin thí sinh, đề thi, đồng hồ đếm ngược 60 phút kèm nút **"Hide Time"** để rèn luyện tâm lý làm bài.
  * **Bố cục Split-Screen đa năng (`react-resizable-panels`):** Kéo thả chuột để điều chỉnh tỷ lệ giữa cột bài đọc (Passage) và cột câu hỏi (Questions).
  * **Bút dạ quang (Highlighter):** Bôi đen văn bản để đánh dấu màu Vàng (`Amber`) hoặc Xanh ngọc (`Emerald`), hỗ trợ gỡ highlight 1-click.
  * **Tra cứu từ điển 1-chạm:** Bôi đen từ bất kỳ trong bài đọc để tra cứu phiên âm IPA, từ loại, nghĩa tiếng Việt và lưu nhanh vào Sổ tay từ vựng.
* **Hỗ trợ đầy đủ các dạng bài IELTS Reading:**
  * True / False / Not Given & Yes / No / Not Given
  * Multiple Choice (Chọn 1 hoặc nhiều đáp án)
  * Matching Headings & Matching Information
  * Summary Completion / Sentence Completion / Table Completion
* **Thanh điều hướng 40 câu hỏi thông minh:**
  * Footer hiển thị trực quan trạng thái: *Chưa làm*, *Đã làm*, và *Đánh dấu xem lại (Review Flag)*.
  * Tích hợp cơ chế **chuyển con lăn chuột dọc thành cuộn ngang** (`onWheel deltaY -> scrollLeft`) kèm nút `<` và `>` điều hướng nhanh.
* **AI Đối chiếu & Giải thích chi tiết:**
  * Chấm điểm và quy đổi sang thang điểm Band Score (0–9.0) ngay khi nộp bài.
  * Đối chiếu câu hỏi với trích dẫn đoạn văn gốc, phân tích bẫy đề thi và giải thích chi tiết lý do đúng/sai.

---

### 2.2. Luyện Đề Listening (Cambridge 13–20 & Karaoke Transcript)
* **Phòng thi trọn vẹn 4 Section (40 câu):**
  * Tích hợp đề thi Listening từ Cambridge 13, 14, 15, 16, 18, 19, 20 kèm tệp âm thanh gốc chất lượng cao.
* **Màn hình Sound Check chuẩn bị:**
  * Kiểm tra tai nghe trước khi thi bằng âm mẫu 440Hz, thanh gạt âm lượng và xác nhận sẵn sàng.
* **Trình phát Audio Listening đồng bộ:**
  * Tự động phát âm thanh theo từng Section, có nút tua lùi 5 giây (`ArrowLeft`) và đồng hồ đếm ngược.
* **Phòng xem lại kết quả & Phụ đề Karaoke (Karaoke Transcript):**
  * Thống kê số câu đúng/sai theo từng Section và tính điểm Band Score (0–9.0).
  * Bảng phụ đề Karaoke đồng bộ: Dòng phụ đề tự động đổi màu theo giọng đọc audio, bấm vào dòng phụ đề bất kỳ để tua audio đến đúng thời điểm đó.
  * Đánh dấu vị trí câu chứa đáp án với thẻ tag `[Answer Q{n}]`.

---

### 2.3. Luyện Viết AI Studio (Writing Task 1 & Task 2)
* **Kho đề bài & Biểu đồ phong phú:**
  * Đầy đủ các dạng biểu đồ Task 1: Line graph, Bar chart, Pie chart, Table, Map và Process.
* **Thanh công cụ liên kết học thuật (Connectors Toolbar):**
  * Hơn 30+ cụm liên kết và động từ chỉ xu hướng được chia nhóm: *Trend Verbs*, *Comparisons*, *Overview*, *Data Reference*. Bấm 1 chạm để chèn trực tiếp vào bài viết.
* **Bộ nâng cấp câu theo Band điểm (Sentence Upgrader Popover):**
  * Bôi đen câu văn trong bài viết để mở trợ lý nâng cấp ngữ pháp và từ vựng tương ứng theo 3 cấp độ:
    - **Band 6.5:** Rõ ràng, đúng ngữ pháp.
    - **Band 7.5:** Học thuật, liên kết chặt chẽ.
    - **Band 8.5:** Phong cách bản xứ tinh tế (Native-like collocations).
* **Bộ kiểm tra tự động theo thời gian thực (Heuristic Audit):**
  * *Overview Detector:* Kiểm tra xem bài Task 1 đã có câu tổng quan đạt chuẩn hay chưa.
  * *Data Points Counter:* Đếm số lượng dữ liệu số và phần trăm được đưa vào bài.
  * Đếm số từ thời gian thực, cảnh báo khi dưới 150 từ (Task 1) hoặc 250 từ (Task 2).

---

### 2.4. Luyện Nói AI Studio (Speaking Mock Room & Random Studio)
* **Phòng thi mô phỏng 3 Parts chuẩn IELTS:**
  * **Part 1:** Phỏng vấn ngắn với các chủ đề quen thuộc (Work, Study, Hometown...).
  * **Part 2:** Thẻ gợi ý (Cue Card) với đồng hồ đếm ngược 60 giây chuẩn bị kèm bảng ghi chú nháp, tự động chuyển sang 2 phút nói.
  * **Part 3:** Thảo luận chuyên sâu hai chiều mở rộng từ chủ đề Part 2.
* **Giám khảo ảo AI phát âm bản xứ:**
  * Sử dụng Web Speech API Text-to-Speech (TTS) với giọng đọc Anh - Anh chuẩn học thuật (`en-GB`).
* **Nhận diện giọng nói & Chấm điểm phản xạ:**
  * Web Speech Recognition (STT) ghi nhận văn bản thời gian thực từ micro của học viên.
  * Hiển thị sóng âm thanh động (`AudioWaveform`) mô phỏng cường độ giọng nói.
* **Báo cáo phân tích sau bài thi (Speaking Diagnostic Report):**
  * Thống kê tốc độ nói (WPM - Words Per Minute) đánh giá độ lưu loát (Fluency).
  * Phát hiện và đếm số lượng từ đệm thừa (*uhm*, *like*, *you know*, *actually*...).
  * Bảng nâng cấp từ vựng học thuật: Tự động phát hiện các từ đơn giản trong bài nói và gợi ý 3 phương án thay thế band cao.

---

### 2.5. Chép chính tả Video YouTube (Dictation Focus Room)
* **Nhập link YouTube linh hoạt:**
  * Hỗ trợ dán bất kỳ URL video YouTube nào (`youtube.com/watch?v=...` hoặc `youtu.be/...`) hoặc chọn video từ thư viện đề xuất.
* **Hệ thống lấy phụ đề thông minh & Proxy:**
  * Tự động trích xuất phụ đề song ngữ Anh - Việt.
  * Tích hợp cơ chế **Proxy Subtitle (`YOUTUBE_PROXY`)** trong backend để tránh bị YouTube giới hạn IP khi triển khai trên máy chủ đám mây.
  * Hỗ trợ tải tệp phụ đề `.srt`, `.vtt` hoặc dán phụ đề thủ công nếu video không có sẵn subtitle.
* **Chế độ luyện nghe từng câu (Focus Mode):**
  * Video tự động phát và dừng chính xác ở từng câu thoại.
  * **Bộ so khớp từ (Diff Engine):** Đánh giá độ chính xác theo %, tô màu xanh lá (từ đúng), đỏ (từ sai/thừa), vàng (sai lỗi chính tả nhẹ).
  * **Hệ thống phím tắt chuyên nghiệp:**
    - `Tab`: Bật / Tạm dừng câu thoại hiện tại.
    - `Enter`: Kiểm tra kết quả (tự động chuyển câu khi đạt $\ge 90\%$).
    - `Ctrl + H`: Gợi ý điền tự động 1 từ tiếp theo.
    - `Alt + ←` / `Alt + →`: Chuyển lùi / tiến giữa các câu.

---

### 2.6. Sổ tay từ vựng & Flashcard Anki (Thuật toán SM-2)
* **Thuật toán Spaced Repetition (SuperMemo SM-2):**
  * Tự động tính toán khoảng cách ngày ôn tập dựa trên mức độ đánh giá nhớ bài của học viên (Again, Hard, Good, Easy).
* **Thẻ Flashcard 3D lật mặt:**
  * Mặt trước: Câu ví dụ khuyết từ (Cloze deletion), giải nghĩa tiếng Việt, phát âm Audio US/UK.
  * Mặt sau: Từ vựng đầy đủ, phiên âm IPA, từ loại và các Collocations học thuật.
* **Xuất dữ liệu cho phần mềm Anki:**
  * Xuất tệp TSV/CSV UTF-8 BOM chuẩn để nhập ngay vào Anki Desktop hoặc AnkiMobile.
  * Xuất gói dữ liệu `.apkg` kèm tài liệu hướng dẫn chi tiết từng bước.

---

### 2.7. Cổng Nâng Cấp Gói eng4u PRO & Thanh toán VietQR Napas 24/7
* **Các gói tài khoản linh hoạt:**
  * **Gói 1 Tháng (30 ngày)**: Trải nghiệm phòng thi AI.
  * **Gói 6 Tháng (180 ngày)**: Lộ trình tối ưu bứt phá từ 6.0 lên 7.5+.
  * **Gói 1 Năm (365 ngày)**: Tiết kiệm tối đa cho kế hoạch học dài hạn.
  * **Gói Trọn Đời (Vĩnh viễn)**: Sở hữu toàn bộ tính năng và bản cập nhật trọn đời.
* **Cổng thanh toán tự động VietQR Napas 24/7:**
  * Tự động sinh mã VietQR chuẩn xác kèm mã đơn hàng duy nhất.
  * Tích hợp Webhook SePay (MB Bank) tự động kiểm tra trạng thái và kích hoạt gói ngay sau khi chuyển khoản thành công.
* **Nhận diện tài khoản PRO đặc quyền:**
  * Thanh Navbar người dùng được bọc viền vàng kim 2 lớp `border-2 border-amber-400 shadow-md` cùng avatar vương miện `👑`.
  * Hiển thị huy hiệu dập nổi `👑 PRO VIP` bên cạnh tên người dùng.
* **Cơ chế đếm lùi và tự động kiểm soát hạn dùng:**
  * Tự động đếm lùi số ngày còn lại mỗi khi qua ngày mới (Ví dụ: `Còn 29 ngày`, `Còn 28 ngày`...).
  * Hiển thị trực quan số ngày còn lại trên Menu người dùng và trang Hồ sơ cá nhân.
  * Tự động thu hồi quyền Pro và hạ cấp về tài khoản Free khi chạm mốc hết hạn mà không gây gián đoạn hệ thống.

---

### 2.8. Hồ sơ học viên & Cách ly dữ liệu cá nhân hóa
* **Lưu trữ Avatar bền vững vào CSDL MySQL:**
  * Hỗ trợ tải ảnh đại diện cá nhân, tự động cắt vuông tâm ảnh (Center square crop) và nén JPEG tối ưu dung lượng.
  * Lưu trữ trực tiếp trong cơ sở dữ liệu `users.avatar` (LONGTEXT), duy trì bền vững qua các phiên đăng nhập.
* **Phân tách lịch sử làm bài 100% riêng biệt:**
  * Lịch sử làm bài Cambridge IELTS được lưu trữ riêng biệt theo từng User ID trong MySQL (`user_cambridge_test_attempts`).
  * Tuyệt đối không bị lẫn lộn giữa tài khoản Học viên và Quản trị viên.
* **Bảo mật tài khoản:**
  * Đổi mật khẩu có xác thực mật khẩu cũ (tương thích cả tài khoản đăng nhập thường và tài khoản Google).
  * Khôi phục mật khẩu qua mã OTP 6 số gửi qua Email.

---

### 2.9. Cổng Quản trị Hệ thống (Admin Dashboard)
* Truy cập qua đường dẫn `/admin` dành riêng cho tài khoản có quyền `role = 'admin'`:
  * **Thống kê tổng quan:** Tổng số học viên, số lượt làm bài, doanh thu các gói Pro.
  * **Quản lý học viên:** Xem danh sách người dùng, cấp hoặc hủy gói eng4u Pro trực tiếp.
  * **Bảng điểm Cambridge:** Xem toàn bộ lịch sử thi của học viên (họ tên, đề thi, số câu đúng, điểm Band Score, ngày giờ làm bài).
  * **Quản lý đề thi:** Kiểm tra trạng thái đề thi Reading và Listening trong hệ thống.

---

### 2.10. Trợ lý AI Gia sư Ảo (eng4u AI Tutor Floating Bot)
* Widget bong bóng chat AI nổi ở góc phải màn hình, đồng hành cùng học viên trong suốt quá trình học.
* Giải đáp tức thì về ngữ pháp, phân biệt các từ đồng nghĩa (synonyms), hướng dẫn mẹo làm bài thi IELTS Reading, Listening, Writing và Speaking.

---

## 🛠️ Kiến Trúc & Công Nghệ (Tech Stack)

### Frontend
- **Framework:** React 18.3 (`react`, `react-dom`) kết hợp TypeScript 5.7
- **Build Tool:** Vite 5.4 (tối ưu hóa module, Hot Module Replacement siêu tốc)
- **Styling:** Tailwind CSS 3.4 (hệ thống Design Tokens học thuật tối giản)
- **State Management:** Zustand 5.0 (quản lý trạng thái phòng thi, audio player, giỏ hàng Pro)
- **Bố cục kéo thả:** `react-resizable-panels` (phân chia 2 cột bài đọc & câu hỏi)
- **Icon System:** `lucide-react`
- **Animation & Cuộn mượt:** Framer Motion 11, GSAP 3, Lenis Scroll (cho Landing Page)
- **Xử lý nén file:** `jszip` (đóng gói Anki Deck `.apkg`)

### Backend & Cơ sở dữ liệu
- **Runtime:** Node.js (phiên bản `>= 18.x`)
- **Web Framework:** Express.js 4.19 (RESTful API, Session Cookies)
- **Database:** MySQL 8.0 (kết nối qua `mysql2/promise` connection pool)
- **Bảo mật & Xác thực:** `bcryptjs` (băm mật khẩu với salt rounds), `express-session`
- **Tự động hóa thanh toán:** Tích hợp VietQR Napas 24/7 và SePay Webhook
- **YouTube Subtitle Extractor:** `youtube-transcript` kết hợp `https-proxy-agent`
- **Email Service:** `nodemailer` gửi mã OTP xác thực

---

## 🎨 Hệ Màu Sắc & Giao Diện (Design Tokens)

eng4u được xây dựng dựa trên nguyên tắc **Academic Minimalism**, hạn chế tối đa sự phân tâm và thân thiện với thị giác khi làm bài thi dài:

| Token | Mã màu Hex | Ý nghĩa & Ứng dụng |
| :--- | :--- | :--- |
| **Alabaster Stone** | `#FAFAF9` | Màu nền trang nhã, giảm mỏi mắt so với nền trắng thuần |
| **Deep Forest Green** | `#064E3B` | Màu thương hiệu chủ đạo, mang đậm phong cách học thuật hàn lâm |
| **Forest Darker** | `#022C22` | Nền thanh điều hướng Navbar, Footer và các khối tiêu điểm |
| **Amber Gold** | `#D97706` | Điểm nhấn cho nút hành động chính, viền gói PRO và huy hiệu vinh danh |
| **Charcoal Text** | `#1C1917` | Màu chữ than đá cho độ tương phản cao, rõ nét từng nét chữ |
| **Typography** | `Lora` / `Be Vietnam Pro` | Font Serif cho tiêu đề & bài đọc; Font Sans cho các thành phần giao diện |

---

## 📂 Cấu Trúc Thư Mục Mã Nguồn

```
online-learning-website/
├── app.js                         # Server Express (CORS, Sessions, Routes, Middleware)
├── package.json                   # Dependencies backend & các scripts khởi chạy
├── .env.example                   # Tệp mẫu cấu hình biến môi trường
├── config/
│   └── db.js                      # Cấu hình kết nối MySQL pool (mysql2/promise)
├── controllers/                   # Xử lý logic nghiệp vụ
│   ├── adminController.js         # Quản lý học viên, đề thi, cấp Pro
│   ├── authController.js          # Đăng nhập, đăng ký, đổi mật khẩu, OTP, Avatar
│   ├── cambridgeController.js     # Bài đọc, câu hỏi Reading, chấm điểm thi
│   ├── dictationController.js     # Lấy phụ đề YouTube song ngữ qua Proxy
│   └── paymentController.js       # Tạo đơn hàng VietQR, xử lý Webhook SePay
├── database/
│   ├── init.sql                   # Khởi tạo CSDL MySQL hoàn chỉnh
│   └── create_cambridge_tables.sql
├── routes/
│   └── api/                       # Định tuyến các endpoint REST API
├── scripts/
│   ├── seedCambridgeData.js       # Nạp dữ liệu đề thi Cambridge mẫu
│   └── seedAllCambridge.js        # Nạp toàn bộ dữ liệu Cambridge 13 đến 20
└── frontend/                      # Ứng dụng React (Vite + TypeScript)
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── src/
        ├── App.tsx                # Điều phối màn hình chính
        ├── main.tsx               # Điểm khởi chạy React
        ├── context/               # AuthContext, VocabularyVaultContext, SmoothScroll
        ├── store/                 # useExamStore, useListeningStore, ankiStore
        ├── modules/
            ├── exam/              # Phòng thi máy tính "IELTS on Computer"
            ├── reading/           # Thư viện đề bài Reading & bài đọc
            ├── listening-exam/    # Phòng thi trọn vẹn 4 Section Listening & Karaoke
            ├── writing/           # AI Writing Studio (Task 1 & Task 2)
            ├── speaking/          # AI Speaking Mock Room (3 Parts)
            ├── dictation/         # Chép chính tả video YouTube
            ├── anki/              # Sổ tay từ vựng Flashcard 3D & Xuất Anki
            └── pro/               # Zustand store quản lý hạn mức & gói Pro
        ├── components/
            ├── common/            # Navbar, UpgradeModal, Button, Card, Logo
            ├── marketing/         # AcademicNavbar, Hero, Features, Landing Page
            ├── admin/             # Bảng điều khiển Quản trị viên
            └── profile/           # Hồ sơ cá nhân, đổi avatar, lịch sử thi
        └── services/              # Kết nối HTTP API client
```

---

## 💻 Hướng Dẫn Cài Đặt & Khởi Chạy Local

### Bước 1: Cài đặt thư viện Dependencies
Mở Terminal tại thư mục `online-learning-website`:

```bash
# 1. Cài đặt thư viện Backend
npm install

# 2. Cài đặt thư viện Frontend React
cd frontend
npm install
cd ..
```

---

### Bước 2: Cấu hình biến môi trường (`.env`)
Tạo tệp `.env` tại thư mục gốc `online-learning-website/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=online_learning
DB_PORT=3306
SESSION_SECRET=eng4u_academic_secret_session_key_2026

# (Tùy chọn) Proxy lấy phụ đề YouTube nếu bị hạn chế IP
# YOUTUBE_PROXY=http://username:password@proxy-host:port

# (Tùy chọn) Cấu hình Webhook SePay nhận diện chuyển khoản tự động
SEPAY_API_KEY=your_sepay_api_key
```

---

### Bước 3: Khởi tạo Cơ sở Dữ liệu MySQL
1. Khởi động MySQL trên máy của bạn (sử dụng XAMPP, Laragon hoặc Docker).
2. Tạo database mới có tên `online_learning` với bảng mã `utf8mb4_unicode_ci`.
3. Chạy file SQL tạo bảng: `database/init.sql`.
4. Nạp dữ liệu đề thi Cambridge vào hệ thống:

```bash
# Nạp dữ liệu đề thi mẫu
npm run db:seed:cambridge

# (Khuyên dùng) Nạp trọn bộ đề thi Cambridge từ 13 đến 20
npm run db:seed:all
```

---

### Bước 4: Khởi động Ứng dụng
Chạy một lệnh duy nhất để khởi động đồng thời cả Backend và Frontend:

```bash
npm run dev
```

* **Frontend Web (React + Vite):** Mở trình duyệt tại [http://localhost:5173](http://localhost:5173)
* **Backend API Server (Express):** Đang lắng nghe tại [http://localhost:3000](http://localhost:3000)

---

## ☁️ Hướng Dẫn Triển Khai Lên Cloud (Render)

1. **Tạo Web Service trên Render:**
   - Kết nối với Repository GitHub của dự án.
   - **Root Directory:** `online-learning-website`
   - **Build Command:**
     ```bash
     npm run build
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
2. **Cấu hình Environment Variables trên Render:**
   - `PORT`: `10000` (hoặc để Render tự động cấp phát)
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`: Thông tin MySQL Database đám mây (Aiven, PlanetScale, TiDB...).
   - `SESSION_SECRET`: Chuỗi khóa bảo mật ngẫu nhiên.
   - `YOUTUBE_PROXY`: *(Khuyên dùng)* HTTP Proxy để Render lấy phụ đề YouTube ổn định không bị chặn IP.

---

## 👥 Tài Khoản Kiểm Thử

| Loại tài khoản | Email đăng nhập | Mật khẩu mặc định | Quyền hạn & Chức năng kiểm thử |
| :--- | :--- | :--- | :--- |
| **Học viên thường** | `student@example.com` | `123456` | Luyện thi Reading, Listening, chép chính tả YouTube, Flashcard Anki, nâng cấp Pro |
| **Học viên PRO (VIP)** | `dangchien2005@gmail.com` | `123456` | Trải nghiệm toàn bộ tính năng PRO: Luyện Viết AI, Luyện Nói AI không giới hạn |
| **Quản trị viên (Admin)** | `admin@example.com` | `123456` | Quản trị học viên, cấp gói Pro, xem bảng điểm toàn hệ thống tại `/admin` |

*Lưu ý: Học viên hoàn toàn có thể tự đăng ký tài khoản mới trực tiếp trên hệ thống qua nút "Đăng Ký".*

---

<p align="center">
  <b>© 2026 eng4u Academic Platform. All rights reserved.</b>
</p>
