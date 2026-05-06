import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/siteConfig";
import logo from "@/assets/logo.png";

const builders = siteConfig.builders;

export function Builders() {
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
    <section className="py-16 border-y bg-secondary/40 overflow-x-hidden">
      <div className="container-x">
        <div className="mb-10">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by Builders & Contractors
          </p>
        </div>

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
            className="flex items-center gap-10 md:gap-14 w-max"
            animate={{ x: isPaused ? undefined : [0, -totalWidth / 2] }}
            transition={{
              duration: 40,
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
                key={index}
                className="
                  flex
                  h-16
                  w-36
                  md:h-20
                  md:w-44
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border
                  bg-background/80
                  px-5
                  py-3
                  opacity-80
                  transition
                  hover:opacity-100
                "
              >
                <img
                  src={builder.image}
                  alt={builder.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
