// Automated Builder Import System
// This file automatically detects new images in assets/builders folder
// and generates the necessary imports and array entries

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const BUILDERS_DIR = join(__dirname, '../assets/builders');
const BUILDERS_COMPONENT_PATH = join(__dirname, '../components/site/Builders.tsx');

// Supported image extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif'];

function generateImportName(filename: string): string {
  // Remove extension and clean up filename for import
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
  return nameWithoutExt.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

function generateDisplayName(filename: string): string {
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

function generateBuilderImports(): string {
  try {
    // Check if builders directory exists
    if (!existsSync(BUILDERS_DIR)) {
      console.log('Builders directory not found:', BUILDERS_DIR);
      return '';
    }

    // Read all files in builders directory
    const files = readdirSync(BUILDERS_DIR);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = file.split('.').pop()?.toLowerCase();
      return ext && IMAGE_EXTENSIONS.includes(`.${ext}`);
    });

    // Generate import statements
    const imports = imageFiles.map(file => {
      const importName = generateImportName(file);
      return `import ${importName} from "/src/assets/builders/${file}";`;
    }).join('\n');

    return imports;
  } catch (error) {
    console.error('Error generating builder imports:', error);
    return '';
  }
}

function generateBuilderArray(): string {
  try {
    // Check if builders directory exists
    if (!existsSync(BUILDERS_DIR)) {
      console.log('Builders directory not found:', BUILDERS_DIR);
      return '';
    }

    // Read all files in builders directory
    const files = readdirSync(BUILDERS_DIR);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = file.split('.').pop()?.toLowerCase();
      return ext && IMAGE_EXTENSIONS.includes(`.${ext}`);
    });

    // Generate array entries
    const arrayEntries = imageFiles.map(file => {
      const importName = generateImportName(file);
      const displayName = generateDisplayName(file);
      return `  { name: "${displayName}", image: ${importName} },`;
    }).join(',\n');

    return arrayEntries;
  } catch (error) {
    console.error('Error generating builder array:', error);
    return '';
  }
}

function updateBuildersComponent(): void {
  try {
    // Read current Builders.tsx content
    let currentContent = '';
    if (existsSync(BUILDERS_COMPONENT_PATH)) {
      currentContent = readFileSync(BUILDERS_COMPONENT_PATH, 'utf8');
    }

    // Generate new imports and array
    const newImports = generateBuilderImports();
    const newArray = generateBuilderArray();

    // Find the import section and replace it
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
${newImports}

interface BuilderLogo`;
        
        // Find and replace the array section
        const arrayStartMarker = '// Static list of builder logos';
        const arrayStartIndex = updatedContent.indexOf(arrayStartMarker);
        
        if (arrayStartIndex !== -1) {
          const beforeArray = updatedContent.substring(0, arrayStartIndex);
          const afterArrayStart = updatedContent.substring(arrayStartIndex);
          
          // Find the end of the array (closing bracket)
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
    writeFileSync(BUILDERS_COMPONENT_PATH, updatedContent, 'utf8');
    console.log('✅ Builders component updated successfully!');
    
  } catch (error) {
    console.error('Error updating Builders component:', error);
  }
}

// Main function to run the automated update
export function updateBuilderImports(): void {
  console.log('🔄 Starting automated builder import update...');
  updateBuildersComponent();
  console.log('✅ Automated update completed!');
}

// Run if called directly
if (require.main === module) {
  updateBuilderImports();
}
