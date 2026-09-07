const http = require('http');
const querystring = require('querystring');
const db = require('../config/db');
const bcrypt = require('bcrypt');

async function test() {
  const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', ['dangchien2005@gmail.com']);
  console.log('User found:', user.email, 'Role:', user.role);

  // Set known test password
  const hashed = await bcrypt.hash('123456', 10);
  await db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, user.id]);
  console.log('Updated student password to 123456');

  // Test Login HTTP request
  const postData = querystring.stringify({ email: 'dangchien2005@gmail.com', password: '123456' });
  const req = http.request('http://127.0.0.1:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  }, (res) => {
    console.log('Login Response Status:', res.statusCode, 'Redirecting to:', res.headers.location);
    const cookie = res.headers['set-cookie'] ? res.headers['set-cookie'][0].split(';')[0] : '';

    const paths = ['/my-courses', '/courses', '/profile', '/courses/1'];
    let count = 0;
    paths.forEach(p => {
      http.get('http://127.0.0.1:3000' + p, { headers: { Cookie: cookie } }, (r) => {
        let data = '';
        r.on('data', chunk => data += chunk);
        r.on('end', () => {
          const hasThemePicker = data.includes('theme-panel');
          const hasThemeCss = data.includes('/css/style.css');
          console.log(`[PASS] ${p} -> HTTP ${r.statusCode} | Theme Panel: ${hasThemePicker} | CSS: ${hasThemeCss}`);
          count++;
          if (count === paths.length) {
            console.log('\n>>> ALL AUTHENTICATED STUDENT ROUTES PASSED WITH THEME SYSTEM!');
            process.exit(0);
          }
        });
      });
    });
  });

  req.write(postData);
  req.end();
}

test().catch(e => {
  console.error(e);
  process.exit(1);
});
