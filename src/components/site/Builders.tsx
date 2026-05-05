import { useEffect, useRef } from "react";

import { siteConfig } from "@/config/siteConfig";

const builders = siteConfig.builders;

export function Builders() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    const scrollSpeed = 0.45;

    const autoScroll = () => {
      if (!pausedRef.current) {
        const halfwayPoint = container.scrollWidth / 2;

        if (container.scrollLeft >= halfwayPoint) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }

      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-16 border-y bg-secondary/40 overflow-hidden">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by Builders & Contractors
        </p>

        <div
          ref={scrollRef}
          className="relative overflow-x-auto overflow-y-hidden scroll-smooth pb-3 [-webkit-overflow-scrolling:touch]"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={() => {
            pausedRef.current = true;
          }}
          onTouchEnd={() => {
            pausedRef.current = false;
          }}
        >
          <div className="flex w-max items-center whitespace-nowrap gap-10 md:gap-14">
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
          </div>
        </div>
      </div>
    </section>
  );
}
