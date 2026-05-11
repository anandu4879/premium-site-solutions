// Automatic image import utility for service folders
// This dynamically imports all images from service folders

export interface ServiceImage {
  src: string;
  label: string;
  size: "small" | "medium" | "large" | "tall" | "wide";
}

export interface ServiceImages {
  [serviceSlug: string]: ServiceImage[];
}

// Function to extract size from filename
function extractSizeFromFilename(filename: string): ServiceImage["size"] {
  const sizePatterns = {
    small: /-small\./,
    medium: /-medium\./,
    large: /-large\./,
    tall: /-tall\./,
    wide: /-wide\./
  };

  for (const [size, pattern] of Object.entries(sizePatterns)) {
    if (pattern.test(filename)) {
      return size as ServiceImage["size"];
    }
  }
  
  return "medium"; // default size
}

// Function to create label from filename
function createLabelFromFilename(filename: string): string {
  // Remove file extension and size suffixes
  const label = filename
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/-(small|medium|large|tall|wide)$/, "") // Remove size suffix
    .replace(/[-_]/g, " ") // Replace dashes and underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize first letter of each word

  return label;
}

// Dynamic import function for service images
export async function loadServiceImages(): Promise<ServiceImages> {
  const serviceImages: ServiceImages = {};

  try {
    // Import all images from all service folders
    const allImageModules = {
      'artificial-grass': import.meta.glob('/src/assets/services/artificial-grass/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true }),
      'construction-maintenance': import.meta.glob('/src/assets/services/construction-maintenance/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true }),
      'labour-hire': import.meta.glob('/src/assets/services/labour-hire/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true }),
      'sand-removal': import.meta.glob('/src/assets/services/sand-removal/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true }),
      'handyman': import.meta.glob('/src/assets/services/handyman/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true })
    };

    for (const [service, imageModules] of Object.entries(allImageModules)) {
      const images: ServiceImage[] = Object.entries(imageModules).map(([path, module]) => {
        const filename = path.split('/').pop() || '';
        const src = (module as any).default;
        
        return {
          src,
          label: createLabelFromFilename(filename),
          size: extractSizeFromFilename(filename)
        };
      });

      serviceImages[service] = images;
      console.log(`✅ Loaded ${images.length} images for ${service}`);
    }
  } catch (error) {
    console.error('❌ Failed to load service images:', error);
  }

  return serviceImages;
}

// Function to get images for a specific service
export async function getServiceImages(serviceSlug: string): Promise<ServiceImage[]> {
  try {
    let imageModules = {};
    
    // Use specific glob pattern based on service
    switch (serviceSlug) {
      case 'artificial-grass':
        imageModules = import.meta.glob('/src/assets/services/artificial-grass/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
        break;
      case 'construction-maintenance':
        imageModules = import.meta.glob('/src/assets/services/construction-maintenance/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
        break;
      case 'labour-hire':
        imageModules = import.meta.glob('/src/assets/services/labour-hire/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
        break;
      case 'sand-removal':
        imageModules = import.meta.glob('/src/assets/services/sand-removal/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
        break;
      case 'handyman':
        imageModules = import.meta.glob('/src/assets/services/handyman/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
        break;
      default:
        console.warn(`Unknown service: ${serviceSlug}`);
        return [];
    }
    
    return Object.entries(imageModules).map(([path, module]) => {
      const filename = path.split('/').pop() || '';
      const src = (module as any).default;
      
      return {
        src,
        label: createLabelFromFilename(filename),
        size: extractSizeFromFilename(filename)
      };
    });
  } catch (error) {
    console.warn(`⚠️ No images found for ${serviceSlug}:`, error);
    return [];
  }
}
