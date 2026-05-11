// Automated Builder Folder Monitor System
// Continuously monitors assets/builders folder and auto-updates Builders.tsx component

const fs = require('fs');
const path = require('path');

const BUILDERS_DIR = path.join(__dirname, '../assets/builders');
const BUILDERS_COMPONENT_PATH = path.join(__dirname, '../components/site/Builders.tsx');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];

function generateImportName(filename) {
  // Remove extension and clean up filename for import
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function generateDisplayName(filename) {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  
  // Replace hyphens and underscores with spaces
  let name = nameWithoutExt.replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  name = name.replace(/\b\w/g, l => l.toUpperCase());
  
  // Handle special cases and clean up
  name = name
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();
  
  return name;
}

function scanBuildersFolder() {
  try {
    // Check if builders directory exists
    if (!fs.existsSync(BUILDERS_DIR)) {
      console.log('❌ Builders directory not found:', BUILDERS_DIR);
      return [];
    }

    // Read all files in builders directory
    const files = fs.readdirSync(BUILDERS_DIR);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = file.split('.').pop()?.toLowerCase();
      return ext && IMAGE_EXTENSIONS.includes(`.${ext}`);
    });

    console.log(`📁 Found ${imageFiles.length} image files in builders folder:`, imageFiles);
    return imageFiles;
  } catch (error) {
    console.error('❌ Error scanning builders folder:', error);
    return [];
  }
}

function generateImportStatements(imageFiles) {
  return imageFiles.map(file => {
    const importName = generateImportName(file);
    return `import ${importName} from "/src/assets/builders/${file}";`;
  }).join('\n');
}

function generateBuilderArray(imageFiles) {
  return imageFiles.map(file => {
    const importName = generateImportName(file);
    const displayName = generateDisplayName(file);
    return `  { name: "${displayName}", image: ${importName} },`;
  }).join(',\n');
}

function updateBuildersComponent(imageFiles) {
  try {
    // Read current Builders.tsx content
    let currentContent = '';
    if (fs.existsSync(BUILDERS_COMPONENT_PATH)) {
      currentContent = fs.readFileSync(BUILDERS_COMPONENT_PATH, 'utf8');
    }

    // Generate new imports and array
    const newImports = generateImportStatements(imageFiles);
    const newArray = generateBuilderArray(imageFiles);

    // Find and replace import section
    const importStartMarker = '// Import all images from builders directory statically';
    const importEndMarker = 'interface BuilderLogo';
    
    let updatedContent = currentContent;
    
    if (newImports) {
      // Replace import section
      const importStartIndex = currentContent.indexOf(importStartMarker);
      const importEndIndex = currentContent.indexOf(importEndMarker);
      
      if (importStartIndex !== -1 && importEndIndex !== -1) {
        const beforeImports = currentContent.substring(0, importStartIndex);
        const afterImports = currentContent.substring(importEndIndex);
        
        updatedContent = `${beforeImports}
// Import all images from builders directory statically
// To add new partners: 1) Add image to assets/builders/ 2) Import here 3) Add to array below
${newImports}

interface BuilderLogo`;
        
        // Find and replace array section
        const arrayStartMarker = '// Static list of builder logos';
        const arrayStartIndex = updatedContent.indexOf(arrayStartMarker);
        
        if (arrayStartIndex !== -1) {
          const beforeArray = updatedContent.substring(0, arrayStartIndex);
          const afterArrayStart = updatedContent.substring(arrayStartIndex);
          
          // Find end of array (closing bracket)
          const arrayEndIndex = afterArrayStart.indexOf('];');
          if (arrayEndIndex !== -1) {
            const afterArray = afterArrayStart.substring(arrayEndIndex + 2);
            
            updatedContent = `${beforeArray}${arrayStartMarker}
const builders: BuilderLogo[] = [
${newArray}
];
${afterArray}`;
          }
        }
      }
    }

    // Write updated content back to file
    fs.writeFileSync(BUILDERS_COMPONENT_PATH, updatedContent, 'utf8');
    console.log('✅ Builders component updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating Builders component:', error);
  }
}

function performAutomatedUpdate() {
  console.log('🔄 Starting automated builder folder scan and update...');
  
  const imageFiles = scanBuildersFolder();
  
  if (imageFiles.length > 0) {
    updateBuildersComponent(imageFiles);
    console.log(`✅ Successfully updated with ${imageFiles.length} partner logos!`);
  } else {
    console.log('⚠️  No image files found in builders folder');
  }
}

// Main function to run the automated system
function runAutomatedBuilderSystem() {
  console.log('🚀 Starting Automated Builder System...');
  console.log('📁 Monitoring folder:', BUILDERS_DIR);
  
  // Perform initial scan
  performAutomatedUpdate();
  
  // Set up continuous monitoring
  const watcher = fs.watch(BUILDERS_DIR, { recursive: false }, (eventType, filename) => {
    // Only process image files
    const fileExt = filename?.split('.').pop()?.toLowerCase();
    
    if (!fileExt || !IMAGE_EXTENSIONS.includes(`.${fileExt}`)) {
      return;
    }

    console.log(`📁 File ${eventType}: ${filename}`);
    
    // Debounce rapid file changes
    setTimeout(() => {
      performAutomatedUpdate();
    }, 1000); // 1 second delay
  });

  console.log('👀 Automated Builder System is now running!');
  console.log('📝 Add new images to assets/builders/ folder and they will be automatically imported and displayed on the website!');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping Automated Builder System...');
    watcher.close();
    process.exit(0);
  });
}

// Run if called directly
if (require.main === module) {
  runAutomatedBuilderSystem();
}

module.exports = { runAutomatedBuilderSystem, performAutomatedUpdate };
