// scripts/upload_audio_to_r2.js
// Script tự động đồng bộ toàn bộ 100 file audio Cambridge IELTS lên Cloudflare R2 Storage (S3-compatible)

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');

async function main() {
  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME || 'eduflow-audio';
  const publicBaseUrl = process.env.R2_PUBLIC_URL; // ví dụ: https://pub-xxxxxx.r2.dev

  console.log('='.repeat(70));
  console.log('🎙️  HỆ THỐNG ĐỒNG BỘ AUDIO LÊN CLOUDFLARE R2 (10GB FREE / 0$ EGRESS)');
  console.log('='.repeat(70));

  if (!accountId || !accessKeyId || !secretAccessKey) {
    console.log('\n⚠️  THIẾU THÔNG TIN CẤU HÌNH CLOUDFLARE R2 TRONG .env:');
    console.log('   Vui lòng thêm vào file .env các biến sau:');
    console.log('   R2_ACCOUNT_ID="mã_account_cloudflare_của_bạn"');
    console.log('   R2_ACCESS_KEY_ID="access_key_r2_của_bạn"');
    console.log('   R2_SECRET_ACCESS_KEY="secret_key_r2_của_bạn"');
    console.log('   R2_BUCKET_NAME="eduflow-audio" (tên bucket bạn vừa tạo)');
    console.log('   R2_PUBLIC_URL="https://pub-xxxxxx.r2.dev" (link Public R2.dev domain)\n');
    console.log('💡 Hướng dẫn tạo nhanh trong 2 phút:');
    console.log('   1. Đăng nhập https://dash.cloudflare.com/ -> chọn R2 Object Storage.');
    console.log('   2. Bấm "Create bucket", đặt tên "eduflow-audio".');
    console.log('   3. Trong Settings bucket -> Bật "R2.dev subdomain" (Allow Access) để có R2_PUBLIC_URL.');
    console.log('   4. Vào mục "Manage R2 API Tokens" -> Tạo token với quyền "Object Read & Write".');
    console.log('   5. Sau khi điền .env, chạy lại: node scripts/upload_audio_to_r2.js\n');
    process.exit(1);
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const audioDir = path.join(__dirname, '..', 'audio');
  if (!fs.existsSync(audioDir)) {
    console.error(`❌ Không tìm thấy thư mục audio tại: ${audioDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(audioDir).filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return ext === '.mp3' || ext === '.m4a';
  });

  console.log(`\n📦 Tìm thấy ${files.length} file âm thanh cần đồng bộ.`);
  console.log(`☁️  Đích đến Bucket: "${bucketName}" trên Cloudflare R2\n`);

  let uploadedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const filePath = path.join(audioDir, filename);
    const stats = fs.statSync(filePath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
    const ext = path.extname(filename).toLowerCase();
    const contentType = ext === '.m4a' ? 'audio/mp4' : 'audio/mpeg';

    const progressPrefix = `[${i + 1}/${files.length}] (${sizeMb} MB) "${filename}"`;

    // Kiểm tra xem file đã tồn tại trên R2 chưa (cho phép resume nếu rớt mạng)
    try {
      await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: filename }));
      console.log(`⏩ ${progressPrefix} -> Đã tồn tại, bỏ qua.`);
      skippedCount++;
      continue;
    } catch (e) {
      // File chưa có, tiếp tục upload
    }

    process.stdout.write(`⏳ ${progressPrefix} -> Đang tải lên... `);
    const fileStream = fs.createReadStream(filePath);

    try {
      await s3.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
          Body: fileStream,
          ContentType: contentType,
        })
      );
      console.log(`✅ Hoàn thành!`);
      uploadedCount++;
    } catch (err) {
      console.log(`❌ Lỗi: ${err.message}`);
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`🎉 TỔNG KẾT: Đã tải lên ${uploadedCount} file mới, bỏ qua ${skippedCount} file có sẵn.`);
  if (publicBaseUrl) {
    console.log(`🔗 Link CDN phát trực tiếp: ${publicBaseUrl.replace(/\/$/, '')}/`);
    console.log(`💡 Hãy đặt biến môi trường cho Frontend (trên Render và .env):`);
    console.log(`   VITE_AUDIO_URL="${publicBaseUrl.replace(/\/$/, '')}/"`);
  }
  console.log('='.repeat(70) + '\n');
}

main().catch((err) => {
  console.error('Lỗi thực thi:', err);
  process.exit(1);
});
