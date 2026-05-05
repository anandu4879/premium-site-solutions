import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";

import { siteConfig } from "@/config/siteConfig";

const services = siteConfig.services;

export function ServicesSection({
  heading = true,
}: {
  heading?: boolean;
}) {
  const middleIndex = services.length;

  const [active, setActive] = useState<number>(middleIndex);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const loopedServices = useMemo(() => {
    // Reduce loops on mobile for better performance
    const loops = isMobile ? 2 : 3;
    return Array.from({ length: loops }, () => services).flat();
  }, [isMobile]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);
    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll(".service-card"),
    ) as HTMLElement[];
    const firstBoundary = cards[services.length]?.offsetLeft ?? 0;
    const lastBoundary = cards[services.length * 2]?.offsetLeft ?? 0;
    const wrapDistance = lastBoundary - firstBoundary;

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

      setActive((prev) =>
        prev === closestIndex ? prev : closestIndex,
      );

      if (
        wrapDistance > 0 &&
        container.scrollLeft < firstBoundary * 0.4
      ) {
        container.style.scrollBehavior = "auto";

        container.scrollLeft += wrapDistance;

        container.style.scrollBehavior = "auto";
      }

      if (
        wrapDistance > 0 &&
        container.scrollLeft >
        lastBoundary + firstBoundary * 0.4
      ) {
        container.style.scrollBehavior = "auto";

        container.scrollLeft -= wrapDistance;

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
              <article
                key={`${s.slug}-${index}`}
                className="
                  service-card
                  shrink-0
                  flex
                  justify-center
                  transform-gpu
                  will-change-transform
                  transition-[transform,opacity]
                  duration-500
                  ease-out
                  ${isMobile ? 'cursor-pointer' : ''}
                "
                style={{
                  transform: `translateY(${
                    isActive ? -4 : isMobile ? 2 : 6
                  }px) scale(${
                    isActive ? 1 : isMobile ? 0.96 : 0.92
                  })`,
                  opacity: isActive ? 1 : 0.75,
                }}
                onClick={() => {
                  if (isMobile) {
                    navigate({ to: "/services/$slug", params: { slug: s.slug } });
                  } else {
                    setActive(index);
                  }
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
                    transition-[width,box-shadow,transform]
                    duration-500
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
                    <img
                      src={s.image}
                      alt={s.title}
                      className={`
                        h-full
                        w-full
                        object-cover
                        transform-gpu
                        transition-transform
                        duration-500
                        ease-out
                        ${isActive ? "scale-105" : "scale-100"}
                      `}
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
                  {!isMobile && (
                    <div className="p-6 md:p-10 min-h-[250px] md:min-h-[350px]">
                      <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                        {s.short}
                      </p>

                      <ul className="mt-6 md:mt-8 grid gap-3 md:gap-4">
                        {s.items.map((i) => (
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
                  )}

                  {/* ACTIVE GLOW */}
                  {isActive && (
                    <div
                      className="
                        absolute
                        -bottom-20
                        left-1/2
                        h-32
                        w-32
                        md:h-44
                        md:w-44
                        -translate-x-1/2
                        rounded-full
                        bg-primary/15
                        blur-2xl
                      "
                    />
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

    </section>
  );
}