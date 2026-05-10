import { createFileRoute, useSearch } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Gallery } from "@/components/site/Gallery";
import { CTASection } from "@/components/site/CTASection";
import { siteConfig } from "@/config/siteConfig";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  validateSearch: (search: Record<string, unknown>) => ({
    service: search.service as string | undefined,
  }),
});

function GalleryPage() {
  const { service } = useSearch({ from: "/gallery" });
  const selectedService = service ? siteConfig.services.find(s => s.slug === service) : null;

  return (
    <SiteLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4 mt-4">
            Gallery
          </p>
          <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl">
            {selectedService ? (
              <><span className="text-[#D8C2A0]">{selectedService.title}</span> Projects</>
            ) : (
              <>Recent <span className="text-[#D8C2A0]">Projects</span> & Transformations</>
            )}
          </h1>
          <p className="mt-6 max-w-3xl text-white/80 text-xl leading-relaxed">
            {selectedService 
              ? `See our recent ${selectedService.title.toLowerCase()} projects across Perth & WA.`
              : "See our recent artificial grass installations, landscaping, construction cleanups and site projects across Perth & WA."
            }
          </p>
          
          {/* Service Filters */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/gallery"
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !service
                  ? "bg-[#D8C2A0] text-black"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              All Projects
            </a>
            {siteConfig.services
              .filter(s => s.images.length > 0)
              .map((svc) => (
                <a
                  key={svc.slug}
                  href={`/gallery?service=${svc.slug}`}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    service === svc.slug
                      ? "bg-[#D8C2A0] text-black"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {svc.title}
                  <span className="ml-2 text-xs opacity-75">
                    ({svc.images.length})
                  </span>
                </a>
              ))
            }
          </div>
        </div>
      </section>
      <Gallery heading={false} />
      <CTASection />
    </SiteLayout>
  );
}
