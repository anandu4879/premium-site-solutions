import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

const builders = siteConfig.builders;

export function Partners() {
  const [isPaused, setIsPaused] = useState(false);

  // Calculate total width for smooth infinite loop
  const itemWidth = 200; // approximate width including gap
  const totalItems = builders.length;
  const totalWidth = itemWidth * (totalItems * 2);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      // Resume animation when page becomes visible
      if (!document.hidden) {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
            Trusted Partners
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Proudly Working With
          </h2>
          <div className="w-16 h-0.5 bg-[#D8C2A0] mx-auto" />
        </div>
        
        {/* Scrolling Company Logos */}
        <div
          ref={containerRef}
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume after 1 second of inactivity
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
                {/* Logo Container */}
                <div className="relative w-32 h-16 lg:w-40 lg:h-20 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105">
                  <img
                    src={builder.image}
                    alt={builder.name}
                    className="max-h-full max-w-full object-contain filter brightness-0 invert transition-all duration-300"
                    loading="lazy"
                  />
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-lg bg-[#D8C2A0]/10 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
