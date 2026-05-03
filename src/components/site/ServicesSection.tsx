import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { services } from "./data";

const loopedServices = [
  ...services,
  ...services,
  ...services,
];

export function ServicesSection({
  heading = true,
}: {
  heading?: boolean;
}) {
  const middleIndex = services.length;

  const [active, setActive] = useState<number>(middleIndex);

  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(".service-card"),
    ) as HTMLElement[];

    // Start from middle section
    requestAnimationFrame(() => {
      const middleCard = cards[middleIndex];

      if (!middleCard) return;

      container.scrollLeft =
        middleCard.offsetLeft -
        container.offsetWidth / 2 +
        middleCard.offsetWidth / 2;
    });

    let ticking = false;

    const updateActiveCard = () => {
      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll(".service-card"),
      ) as HTMLElement[];

      const containerCenter =
        container.scrollLeft + container.offsetWidth / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter =
          card.offsetLeft + card.offsetWidth / 2;

        const distance = Math.abs(
          containerCenter - cardCenter,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);

      // Smooth infinite repositioning
      const firstBoundary =
        cards[services.length]?.offsetLeft ?? 0;

      const lastBoundary =
        cards[services.length * 2]?.offsetLeft ?? 0;

      if (
        container.scrollLeft < firstBoundary * 0.4
      ) {
        container.style.scrollBehavior = "auto";

        container.scrollLeft +=
          lastBoundary - firstBoundary;

        container.style.scrollBehavior = "auto";
      }

      if (
        container.scrollLeft >
        lastBoundary + firstBoundary * 0.4
      ) {
        container.style.scrollBehavior = "auto";

        container.scrollLeft -=
          lastBoundary - firstBoundary;

        container.style.scrollBehavior = "auto";
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveCard);

        ticking = true;
      }
    };

    // Desktop mouse wheel → horizontal scroll
    const handleWheel = (e: WheelEvent) => {
      if (
        !isMobile &&
        Math.abs(e.deltaY) > Math.abs(e.deltaX)
      ) {
        e.preventDefault();

        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener("scroll", handleScroll);

    container.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      container.removeEventListener(
        "scroll",
        handleScroll,
      );

      container.removeEventListener(
        "wheel",
        handleWheel,
      );
    };
  }, [isMobile, middleIndex]);

  return (
    <section className="py-20 md:py-32 overflow-hidden bg-secondary/20">
      <div className="container-x">
        {heading && (
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
            <p className="text-primary font-semibold uppercase tracking-[0.3em] text-xs mb-4">
              What we do
            </p>

            <h2 className="text-3xl md:text-6xl font-bold leading-tight text-balance">
             Complete grass, site & trade services under one trusted team
            </h2>

            <p className="mt-4 md:mt-5 text-base md:text-lg text-muted-foreground">
            From premium artificial turf to construction site cleanup, our experienced crew delivers a job done right — the first time.
            </p>
          </div>
        )}

        <div
          ref={containerRef}
          className="
            flex
            items-center
            gap-4
            md:gap-8
            overflow-x-auto
            overflow-y-hidden
            px-[6vw]
            md:px-[12vw]
            lg:px-[20vw]
            pb-8
            scrollbar-hide
            services-mask
            [-webkit-overflow-scrolling:touch]
          "
        >
          {loopedServices.map((s, index) => {
            const isActive = active === index;

            return (
              <motion.article
                key={`${s.slug}-${index}`}
                className="
                  service-card
                  shrink-0
                  flex
                  justify-center
                "
                style={{
                  willChange: "transform",
                }}
                animate={{
                  scale: isActive
                    ? 1
                    : isMobile
                    ? 0.96
                    : 0.92,

                  opacity: isActive ? 1 : 0.75,

                  y: isActive
                    ? -4
                    : isMobile
                    ? 2
                    : 6,
                }}
                transition={{
                  type: "spring",
                  stiffness: isMobile ? 90 : 120,
                  damping: isMobile ? 20 : 18,
                  mass: 0.8,
                }}
              >
                <div
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[32px]
                    md:rounded-[40px]
                    border
                    bg-card
                    shadow-card
                    transition-[width,box-shadow]
                    duration-700
                    ease-out
                    ${
                      isActive
                        ? `
                          w-[82vw]
                          sm:w-[78vw]
                          md:w-[620px]
                          lg:w-[640px]
                          shadow-elevated
                        `
                        : `
                          w-[58vw]
                          sm:w-[60vw]
                          md:w-[420px]
                          lg:w-[440px]
                        `
                    }
                  `}
                >
                  {/* IMAGE */}
                  <div className="relative h-[240px] md:h-[320px] overflow-hidden">
                    <motion.img
                      animate={{
                        scale: isActive ? 1.05 : 1,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      src={s.image}
                      alt={s.title}
                      className="
                        h-full
                        w-full
                        object-cover
                        will-change-transform
                        transform-gpu
                      "
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                      <span className="text-white/50 text-xs md:text-sm tracking-[0.3em] uppercase">
                        0{(index % services.length) + 1}
                      </span>

                      <h3 className="mt-2 md:mt-3 text-2xl md:text-5xl font-bold text-white">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 md:p-10">
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                      {s.short}
                    </p>

                    <ul className="mt-6 md:mt-8 grid gap-3 md:gap-4">
                      {s.items.slice(0, 4).map((i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="
                              h-7
                              w-7
                              md:h-8
                              md:w-8
                              rounded-full
                              bg-primary/10
                              flex
                              items-center
                              justify-center
                              shrink-0
                            "
                          >
                            <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
                          </div>

                          <span className="text-sm md:text-base">
                            {i}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/contact"
                      className="
                        mt-8
                        md:mt-10
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-gradient-primary
                        px-5
                        md:px-6
                        py-2.5
                        md:py-3
                        text-xs
                        md:text-sm
                        font-semibold
                        text-primary-foreground
                        transition-all
                        duration-300
                        hover:gap-4
                      "
                    >
                      Get Free Quote
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  {/* ACTIVE GLOW */}
                  {isActive && (
                    <motion.div
                      layoutId="activeGlow"
                      className="
                        absolute
                        -bottom-20
                        left-1/2
                        h-40
                        w-40
                        md:h-60
                        md:w-60
                        -translate-x-1/2
                        rounded-full
                        bg-primary/20
                        blur-3xl
                      "
                    />
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}