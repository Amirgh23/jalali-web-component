#!/usr/bin/env node

/**
 * 8.1 Bundle Size Optimization: Size report script
 * Generates bundle size report for all distribution formats
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const distDir = path.join(__dirname, '../dist');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function getGzipSize(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const gzipped = zlib.gzipSync(content);
    return gzipped.length;
  } catch (e) {
    return 0;
  }
}

function generateReport() {
  console.log('\n📦 Jalali Date Picker - Bundle Size Report\n');
  console.log('=' .repeat(60));

  const files = [
    { name: 'ESM (Modern Bundlers)', file: 'index.esm.js' },
    { name: 'UMD (Universal)', file: 'index.umd.js' },
    { name: 'CJS (CommonJS)', file: 'index.cjs.js' },
  ];

  let totalSize = 0;
  let totalGzipped = 0;

  files.forEach(({ name, file }) => {
    const filePath = path.join(distDir, file);
    
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      const gzipped = getGzipSize(filePath);
      
      totalSize += size;
      totalGzipped += gzipped;

      const sizeStr = formatBytes(size);
      const gzipStr = formatBytes(gzipped);
      const reduction = ((1 - gzipped / size) * 100).toFixed(1);

      console.log(`\n${name}:`);
      console.log(`  Size:     ${sizeStr}`);
      console.log(`  Gzipped:  ${gzipStr}`);
      console.log(`  Reduction: ${reduction}%`);
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log(`\nTotal Size:    ${formatBytes(totalSize)}`);
  console.log(`Total Gzipped: ${formatBytes(totalGzipped)}`);

  // Performance targets
  const target = 150 * 1024; // 150KB
  const status = totalGzipped < target ? '✅ PASS' : '❌ FAIL';
  console.log(`\nTarget: < ${formatBytes(target)}`);
  console.log(`Status: ${status}`);

  console.log('\n' + '='.repeat(60) + '\n');

  // Return exit code
  process.exit(totalGzipped < target ? 0 : 1);
}

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

generateReport();
