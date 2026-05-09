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

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A]">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {heading && (
          <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
            <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
              What We Do
            </p>

            {/* <h2 className="text-4xl lg:text-7xl font-bold leading-[1.1] text-balance text-white mb-6">
              Complete <span className="text-[#D8C2A0]">Artificial 
                Grass</span>, <span className="text-[#D8C2A0]">Site</span> & <span className="text-[#D8C2A0]">Trade</span> Services Under One Trusted Team
            </h2> */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] text-balance text-white mb-6">
              Your Trusted Partner for <span className="text-[#D8C2A0]">Site Maintenance</span> and <span className="text-[#D8C2A0]">Property Care</span>
            </h1>


            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
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
            touch-pan-x
            px-4
            md:px-6
            lg:px-8
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
                  transition-[transform,opacity,box-shadow,filter]
                  duration-500
                  ease-out
                  hover:scale-105
                  hover:shadow-2xl
                  hover:brightness-110
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
                onMouseEnter={() => {
                  if (!isMobile) {
                    setActive(index);
                  }
                }}
                onMouseLeave={() => {
                  if (!isMobile) {
                    setActive(middleIndex);
                  }
                }}
                onClick={() => {
                  if (isMobile) {
                    navigate({ to: "/services/$slug", params: { slug: s.slug } });
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
                    bg-black/40 backdrop-blur-xl border-white/10
                    shadow-2xl
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
                          shadow-2xl border-[#D8C2A0]/30
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
                      style={{
                        filter: 'contrast(1.1) saturate(1.1) brightness(0.7) sepia(0.2) hue-rotate(15deg)'
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Gold Accent Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#D8C2A0]/10 to-transparent opacity-50" />
                    )}

                    <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                      <span className="text-[#D8C2A0]/80 text-xs md:text-sm tracking-widest uppercase font-semibold">
                        0{(index % services.length) + 1}
                      </span>

                      <h3 className="mt-2 md:mt-3 text-2xl md:text-5xl font-bold text-white">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  {/* CONTENT */}
                  {!isMobile && (
                    <div className="p-6 md:p-10 min-h-[250px] md:min-h-[350px] flex flex-col">
                      <div className="flex-1">
                        <p className="text-white/80 text-sm md:text-lg leading-relaxed">
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
                                  bg-[#D8C2A0]/20
                                  flex
                                  items-center
                                  justify-center
                                  shrink-0
                                  border border-[#D8C2A0]/30
                                "
                              >
                                <Check className="h-3.5 w-3.5 md:h-4 md:w-4 text-[#D8C2A0]" />
                              </div>

                              <span className="text-white/90 text-sm md:text-base">
                                {i}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3">
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="
                            flex-1
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-[#D8C2A0] hover:bg-[#C4B090] hover:scale-105 hover:shadow-xl
                            px-4
                            md:px-5
                            py-2
                            md:py-2.5
                            text-xs
                            md:text-sm
                            font-semibold
                            text-black
                            transition-all
                            duration-300
                          "
                        >
                          View More
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                        <Link
                          to="/contact"
                          className="
                            flex-1
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            rounded-full
                            bg-transparent border border-[#D8C2A0] text-[#D8C2A0] hover:bg-[#D8C2A0] hover:text-black
                            px-4
                            md:px-5
                            py-2
                            md:py-2.5
                            text-xs
                            md:text-sm
                            font-semibold
                            transition-all
                            duration-300
                            hover:scale-105
                          "
                        >
                          Get Free Quote
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
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
                        bg-[#D8C2A0]/20
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