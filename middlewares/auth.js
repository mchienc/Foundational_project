// middlewares/auth.js
// Middleware là các hàm "chặn" request lại trước khi nó tới controller,
// dùng để kiểm tra điều kiện (ví dụ: đã đăng nhập chưa) trước khi cho đi tiếp.

// Chặn nếu người dùng CHƯA đăng nhập
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next(); // đã đăng nhập -> cho đi tiếp
}

// Chặn nếu người dùng KHÔNG phải admin
function checkAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).send('Bạn không có quyền truy cập trang này.');
  }
  next();
}

module.exports = { checkAuth, checkAdmin };
