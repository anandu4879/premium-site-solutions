import { Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";

const gallerySizes: Record<
  string,
  {
    figure: string;
    image: string;
  }
> = {
  small: {
    figure: "",
    image: "aspect-square",
  },
  medium: {
    figure: "",
    image: "aspect-[4/3]",
  },
  large: {
    figure: "sm:col-span-2 lg:col-span-2",
    image: "aspect-[16/9]",
  },
  normal: {
    figure: "",
    image: "aspect-[4/3]",
  },
  square: {
    figure: "",
    image: "aspect-square",
  },
  tall: {
    figure: "",
    image: "aspect-[3/4]",
  },
  wide: {
    figure: "sm:col-span-2",
    image: "aspect-[16/7]",
  },
};

function getGallerySize(item: any) {
  if ("size" in item && item.size && gallerySizes[item.size]) {
    return gallerySizes[item.size];
  }

  if ("wide" in item && item.wide) {
    return gallerySizes.wide;
  }

  if ("tall" in item && item.tall) {
    return gallerySizes.tall;
  }

  return gallerySizes.medium;
}

interface ServiceGalleryProps {
  service: (typeof siteConfig.services)[number];
  maxImages?: number;
}

export function ServiceGallery({ service, maxImages = 2 }: ServiceGalleryProps) {
  const images = service.images.slice(0, maxImages);

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container-x">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-black mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {service.images.length} project{service.images.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            to="/gallery"
            search={{ service: service.slug }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            View Gallery
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {images.map((image, idx) => {
            const size = getGallerySize(image);

            return (
              <figure
                key={idx}
                className={`relative group overflow-hidden rounded-xl shadow-md ${size.figure}`}
              >
                <Link
                  to="/gallery"
                  search={{ service: service.slug }}
                  className="block w-full cursor-pointer text-left"
                  aria-label={`View ${service.title} gallery`}
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${size.image}`}
                  />
                </Link>
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  {image.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
        
        {service.images.length > maxImages && (
          <div className="text-center">
            <Link
              to="/gallery"
              search={{ service: service.slug }}
              className="inline-flex items-center gap-2 text-[#D8C2A0] hover:text-[#C4B090] font-medium transition-colors text-sm"
            >
              View all {service.images.length} {service.title.toLowerCase()} projects
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export function ServiceGalleries() {
  const servicesWithImages = siteConfig.services.filter(service => service.images.length > 0);

  if (servicesWithImages.length === 0) {
    return null;
  }

  const totalImages = servicesWithImages.reduce((sum, service) => sum + service.images.length, 0);
  // Get 5 images for preview - take more from services with multiple images
  const previewImages = [];
  for (const service of servicesWithImages) {
    const imagesToAdd = Math.min(service.images.length, Math.max(1, 5 - previewImages.length));
    for (let i = 0; i < imagesToAdd && previewImages.length < 5; i++) {
      previewImages.push({
        ...service.images[i],
        serviceTitle: service.title
      });
    }
    if (previewImages.length >= 5) break;
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <div className="max-w-2xl mb-10">
          <p className="text-black font-semibold uppercase tracking-widest text-xs mb-3">
            Our work
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance text-black">
            Recent projects across Perth & WA
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Browse our portfolio of {totalImages} completed projects across {servicesWithImages.length} service categories
          </p>
        </div>
        
        {/* Preview Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-10">
          {previewImages.map((image, idx) => {
            const size = getGallerySize(image);
            
            return (
              <figure
                key={idx}
                className="relative group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <Link
                  to="/gallery"
                  search={{ service: undefined }}
                  className="block w-full cursor-pointer text-left"
                  aria-label="View gallery"
                >
                  <img
                    src={image.src}
                    alt={image.label}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-110 aspect-square"
                  />
                </Link>
                <figcaption className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-white text-xs font-medium translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="font-semibold truncate">{image.serviceTitle}</div>
                </figcaption>
              </figure>
            );
          })}
        </div>
        
        <div className="text-center">
          <Link
            to="/gallery"
            search={{ service: undefined }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg text-lg"
          >
            View Full Gallery
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
          <p className="mt-4 text-gray-500 text-sm">
            View all {totalImages} projects by service category
          </p>
        </div>
      </div>
    </section>
  );
}
