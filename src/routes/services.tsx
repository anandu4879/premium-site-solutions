import { createFileRoute, Outlet, useMatches, Link, linkOptions } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { siteConfig } from "@/config/siteConfig";
import { Check } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — BJ & R Maintenance" },
      {
        name: "description",
        content:
          "Artificial grass, construction maintenance, labour hire, sand removal and handyman services for residential and commercial projects.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const matches = useMatches();
  const isServiceDetailActive = matches.some((match) => match.routeId === "/services/$slug");

  return (
    <SiteLayout>
      <Outlet />

      {!isServiceDetailActive ? (
        <>
          <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
              <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">Services</p>
              <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl">
                End-to-End <span className="text-[#D8C2A0]">Grass</span>, <span className="text-[#D8C2A0]">Site</span> & <span className="text-[#D8C2A0]">Trade</span> Services
              </h1>
              <p className="mt-6 max-w-3xl text-white/80 text-xl leading-relaxed">
                From premium artificial turf installation to construction cleanup and skilled labour hire — one trusted team for every job.
              </p>
            </div>
          </section>

          <div className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid gap-20">
              {siteConfig.services.map((s, i) => (
                <article
                  key={s.slug}
                  id={s.slug}
                  className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative group">
                    <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/50">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-3xl bg-[#D8C2A0]/10 scale-0 group-hover:scale-100 transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
                  </div>
                  <div>
                    <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-3">
                      Service {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-gray-700 text-lg leading-relaxed">{s.short}</p>
                    <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-gray-700">
                          <div className="h-6 w-6 rounded-full bg-[#D8C2A0]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-[#D8C2A0]" />
                          </div>
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      {...linkOptions({ to: "/services/$slug", params: { slug: s.slug } })}
                      className="mt-8 inline-flex items-center gap-3 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Learn More
                      <Check className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <CTASection />
        </>
      ) : null}
    </SiteLayout>
  );
}
