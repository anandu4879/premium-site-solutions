// Dynamic service images configuration
// This loads images from service folders and provides them to the main config

import { ServiceImage } from "@/utils/autoImportImages";

// Load images synchronously using import.meta.glob
const loadImagesSync = () => {
  const allImages: { [serviceSlug: string]: ServiceImage[] } = {};

  try {
    // Import all images from service folders
    const artificialGrassImages = import.meta.glob('/src/assets/services/artificial-grass/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
    const constructionImages = import.meta.glob('/src/assets/services/construction-maintenance/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
    const labourImages = import.meta.glob('/src/assets/services/labour-hire/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
    const sandImages = import.meta.glob('/src/assets/services/sand-removal/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
    const handymanImages = import.meta.glob('/src/assets/services/handyman/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

    // Process images for each service
    allImages['artificial-grass'] = Object.entries(artificialGrassImages).map(([path, module]) => createImageFromPath(path, module));
    allImages['construction-maintenance'] = Object.entries(constructionImages).map(([path, module]) => createImageFromPath(path, module));
    allImages['labour-hire'] = Object.entries(labourImages).map(([path, module]) => createImageFromPath(path, module));
    allImages['sand-removal'] = Object.entries(sandImages).map(([path, module]) => createImageFromPath(path, module));
    allImages['handyman'] = Object.entries(handymanImages).map(([path, module]) => createImageFromPath(path, module));

    console.log("✅ Service images loaded:", Object.keys(allImages));
    return allImages;
  } catch (error) {
    console.error("❌ Failed to load service images:", error);
    return {};
  }
};

// Helper function to create image object from path
function createImageFromPath(path: string, module: any): ServiceImage {
  const filename = path.split('/').pop() || '';
  const src = module.default;
  
  // Extract size from filename
  const sizePatterns = {
    small: /-small\./,
    medium: /-medium\./,
    large: /-large\./,
    tall: /-tall\./,
    wide: /-wide\./
  };

  let size: ServiceImage["size"] = "medium";
  for (const [sizeName, pattern] of Object.entries(sizePatterns)) {
    if (pattern.test(filename)) {
      size = sizeName as ServiceImage["size"];
      break;
    }
  }

  // Create label from filename
  const label = filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/-(small|medium|large|tall|wide)$/, "") // Remove size suffix
    .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word

  return { src, label, size };
}

// Load images immediately
const cachedImages = loadImagesSync();

// Export function to get images for a service
export function getServiceImages(serviceSlug: string): ServiceImage[] {
  return cachedImages[serviceSlug] || [];
}

// Export all images for config
export function getAllServiceImages(): { [serviceSlug: string]: ServiceImage[] } {
  return cachedImages;
}
