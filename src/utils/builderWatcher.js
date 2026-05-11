// File Watcher System for Automatic Builder Import Updates
// This watches the assets/builders folder for changes and auto-updates the Builders component

const fs = require('fs');
const path = require('path');

const BUILDERS_DIR = path.join(__dirname, '../assets/builders');

console.log('👀 Starting file watcher for builders directory:', BUILDERS_DIR);

// Create file watcher
const watcher = fs.watch(BUILDERS_DIR, { recursive: false }, (eventType, filename) => {
  // Only process image files
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];
  const fileExt = filename?.split('.').pop()?.toLowerCase();
  
  if (!fileExt || !imageExtensions.includes(`.${fileExt}`)) {
    return;
  }

  console.log(`📁 File ${eventType}: ${filename}`);
  
  // Debounce rapid file changes
  setTimeout(() => {
    console.log('🔄 Triggering automatic builder import update...');
    
    // Run the auto-update script
    const { exec } = require('child_process');
    exec('npx ts-node src/utils/autoBuilderImports.ts', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error running auto-update script:', error);
      } else {
        console.log('✅ Auto-update completed successfully!');
        console.log(stdout);
      }
    });
  }, 1000); // 1 second delay
});

console.log('👀 File watcher is now active. Add new images to assets/builders/ and they will be automatically imported!');

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Stopping file watcher...');
  watcher.close();
  process.exit(0);
});
