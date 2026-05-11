import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface BuilderLogo {
  name: string;
  image: string;
}

export function Builders() {
  const [isPaused, setIsPaused] = useState(false);
  const [builders, setBuilders] = useState<BuilderLogo[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate total width for smooth infinite loop
  const itemWidth = 200;
  const totalItems = builders.length;
  const totalWidth = itemWidth * (totalItems * 2);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadBuilders = async () => {
      try {
        setLoading(true);
        
        // Dynamically import all images from builders directory
        const imageModules = import.meta.glob('/src/assets/builders/*.{png,jpg,jpeg,webp,svg,gif}', { eager: true });
        
        const builderLogos: BuilderLogo[] = [];
        
        for (const [path, module] of Object.entries(imageModules)) {
          // Extract filename from path
          const filename = path.split('/').pop() || '';
          
          // Generate display name from filename
          const displayName = generateDisplayName(filename);
          
          // Get the image URL
          const image = (module as any).default;
          
          builderLogos.push({
            name: displayName,
            image
          });
        }
        
        // Sort alphabetically by name
        builderLogos.sort((a, b) => a.name.localeCompare(b.name));
        
        setBuilders(builderLogos);
        console.log(`✅ Dynamically loaded ${builderLogos.length} builder logos`);
        
      } catch (error) {
        console.error('❌ Error loading builder logos:', error);
        setBuilders([]);
      } finally {
        setLoading(false);
      }
    };

    // Helper function to generate display name from filename
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

    loadBuilders();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
              Trusted by Builders & Contractors
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Proudly Working With
            </h2>
            <div className="w-16 h-0.5 bg-[#D8C2A0] mx-auto" />
          </div>
          <div className="text-center text-white/60">
            Loading partners...
          </div>
        </div>
      </section>
    );
  }

  if (builders.length === 0) {
    return (
      <section className="relative py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
              Trusted by Builders & Contractors
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Proudly Working With
            </h2>
            <div className="w-16 h-0.5 bg-[#D8C2A0] mx-auto" />
          </div>
          <div className="text-center text-white/60">
            No partner logos found. Add images to src/assets/builders/ folder.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
            Trusted by Builders & Contractors
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Proudly Working With
          </h2>
          <div className="w-16 h-0.5 bg-[#D8C2A0] mx-auto" />
        </div>
        
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsPaused(false), 1000);
          }}
        >
          <motion.div
            className="flex items-center gap-12 lg:gap-16 w-max"
            animate={{ x: isPaused ? undefined : [0, -totalWidth / 2] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {[...builders, ...builders].map((builder, index) => (
              <div
                key={`${builder.name}-${index}`}
                className="group relative flex items-center justify-center"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="relative w-32 h-16 lg:w-40 lg:h-20 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={builder.image}
                    alt={builder.name}
                    className="max-h-full max-w-full object-contain transition-all duration-300"
                    loading="lazy"
                    onError={(e) => {
                      console.error(`Failed to load image: ${builder.image}`, e);
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) {
                        fallback.style.display = 'flex';
                      }
                    }}
                    onLoad={(e) => {
                      console.log(`Successfully loaded: ${builder.name}`);
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white/80 text-xs font-medium text-center px-2" style={{display: 'none'}}>
                    {builder.name}
                  </div>
                </div>
                
                <div className="absolute inset-0 rounded-lg bg-[#D8C2A0]/10 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
