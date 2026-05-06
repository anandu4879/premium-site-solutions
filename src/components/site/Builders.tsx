import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/siteConfig";
import logo from "@/assets/logo.png";

const builders = siteConfig.builders;

export function Builders() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.5;
    const contentWidth = container.querySelector(".scrollable-content") as HTMLElement;
    
    if (!contentWidth) return;

    const autoScroll = () => {
      if (!pausedRef.current && container) {
        const scrollWidth = contentWidth.scrollWidth;
        const halfwayPoint = scrollWidth / 2;

        if (container.scrollLeft >= halfwayPoint - 10) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += scrollSpeed;
        }
      }

      animationIdRef.current = requestAnimationFrame(autoScroll);
    };

    animationIdRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  const pauseForTouch = () => {
    pausedRef.current = true;

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 1200);
  };

  const resumeAfterTouch = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, 500);
  };

  return (
    <section className="py-16 border-y bg-secondary/40 overflow-x-hidden">
      <div className="container-x">
        <div className="mb-10">
          <div className="flex flex-col items-center justify-center gap-3 md:gap-5 mb-10">
            <div className="flex items-center justify-center h-16 md:h-24 w-auto">
              <img
                src={logo}
                alt="BJ & R Maintenance"
                className="h-full w-auto object-contain max-w-xs md:max-w-sm"
              />
            </div>
            <p className="text-center text-xs md:text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              BJ & R Maintenance
            </p>
          </div>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Trusted by Builders & Contractors
          </p>
        </div>

        <div
          ref={scrollRef}
          className="relative overflow-x-auto overflow-y-hidden pb-3 [-webkit-overflow-scrolling:touch] scrollbar-hide"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
          onTouchStart={pauseForTouch}
          onTouchEnd={resumeAfterTouch}
          onTouchCancel={resumeAfterTouch}
        >
          <div className="scrollable-content flex w-max items-center whitespace-nowrap gap-10 md:gap-14">
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
