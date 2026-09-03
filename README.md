# Hướng dẫn chạy project

## 1. Cài đặt thư viện
Mở terminal (Command Prompt / PowerShell / VS Code Terminal) tại thư mục project, chạy:
```bash
npm install
```

## 2. Kiểm tra file .env
Đảm bảo file `.env` khớp với thông tin MySQL của bạn (mặc định XAMPP là user `root`, password để trống).
Đảm bảo database `online_learning` đã được tạo (chạy file `online_learning_schema.sql` trong phpMyAdmin trước).

## 3. Chạy server
```bash
npm run dev
```
(dùng `npm run dev` để tự động restart khi bạn sửa code — cần cài `nodemon`, đã có trong package.json)

Nếu muốn chạy không cần auto-restart:
```bash
npm start
```

## 4. Truy cập
Mở trình duyệt: http://localhost:3000
- Bấm "Đăng ký ngay" để tạo tài khoản học viên mới
- Sau khi đăng ký, đăng nhập lại bằng email/mật khẩu vừa tạo

## 5. Tạo tài khoản Admin để test
Vì form đăng ký chỉ tạo tài khoản `student`, để test quyền admin bạn có 2 cách:
- Cách nhanh: vào phpMyAdmin, mở bảng `users`, sửa cột `role` của tài khoản bạn vừa đăng ký thành `admin`.
- Cách chuẩn hơn (làm sau): viết thêm 1 route riêng chỉ admin mới gọi được để tạo tài khoản admin khác.

## Cấu trúc thư mục
```
online-learning-website/
├── config/db.js              # kết nối MySQL
├── controllers/               # xử lý logic (authController.js)
├── middlewares/auth.js        # kiểm tra đăng nhập/phân quyền
├── routes/authRoutes.js       # định nghĩa URL
├── views/                     # giao diện EJS
│   ├── partials/               # header/footer dùng chung
│   ├── login.ejs
│   ├── register.ejs
│   └── home.ejs
├── public/css/style.css       # CSS tùy chỉnh
├── app.js                     # file khởi động server
└── .env                       # cấu hình (KHÔNG commit file này lên Git khi nộp bài công khai)
```

## Bước tiếp theo
Đây mới là phần khung + đăng ký/đăng nhập. Các bước tiếp theo (mình sẽ code cùng bạn):
1. CRUD khóa học & bài học (phía Admin)
2. Trang danh sách khóa học & đăng ký tham gia khóa học (phía học viên)
3. Trang làm bài kiểm tra + chấm điểm tự động
4. Trang thống kê / lịch sử kết quả học tập
