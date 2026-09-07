const http = require('http');
const querystring = require('querystring');

async function testAdmin() {
  const postData = querystring.stringify({ email: 'admin@example.com', password: 'password123' });
  const req = http.request('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    console.log('Admin Login status:', res.statusCode, 'Location:', res.headers.location);
    const cookie = res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0] : '';
    http.get('http://127.0.0.1:3000/admin/dashboard', { headers: { Cookie: cookie } }, (r) => {
      console.log('GET /admin/dashboard -> HTTP', r.statusCode);
      if (r.statusCode === 200) {
        console.log('>>> ADMIN DASHBOARD PASS!');
      }
      process.exit(0);
    });
  });
  req.write(postData);
  req.end();
}

testAdmin().catch(e => { console.error(e); process.exit(1); });
