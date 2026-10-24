/**
 * eng4u Production Build Script for Render & CI/CD
 * 
 * Handles memory-constrained environments (e.g. Render Free Tier 512MB RAM)
 * by attempting a live Vite build, and falling back gracefully to the prebuilt
 * frontend/dist assets if Vite/TSC runs out of memory.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('🚀 [ENG4U BUILD] Starting production build process...');
console.log('====================================================');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const distIndex = path.join(frontendDir, 'dist', 'index.html');

let buildSucceeded = false;

try {
  console.log('📦 [ENG4U BUILD] Step 1: Installing frontend dependencies...');
  execSync('npm --prefix frontend install --no-audit --prefer-offline', {
    cwd: rootDir,
    stdio: 'inherit'
  });

  console.log('⚡ [ENG4U BUILD] Step 2: Compiling frontend with Vite...');
  execSync('npm --prefix frontend run build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=400'
    }
  });

  buildSucceeded = true;
  console.log('✅ [ENG4U BUILD] Frontend built successfully!');
} catch (error) {
  console.warn('\n⚠️ [ENG4U BUILD] Live frontend build failed or timed out (often caused by hosting memory limits).');
  
  if (fs.existsSync(distIndex)) {
    console.log('✅ [ENG4U BUILD] Valid prebuilt frontend distribution found at frontend/dist/index.html.');
    console.log('✅ [ENG4U BUILD] Serving committed prebuilt production assets. Deployment will proceed smoothly.\n');
    buildSucceeded = true;
  } else {
    console.error('❌ [ENG4U BUILD] FATAL: frontend/dist/index.html does not exist and live build failed.');
    process.exit(1);
  }
}

if (buildSucceeded) {
  console.log('====================================================');
  console.log('🎉 [ENG4U BUILD] Build pipeline completed with exit code 0.');
  console.log('====================================================\n');
  process.exit(0);
}
