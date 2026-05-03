import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Gallery } from "@/components/site/Gallery";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Project Gallery — GreenLine" },
      { name: "description", content: "See our recent artificial grass installations, landscaping, construction cleanups and site projects across Perth & WA." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">Gallery</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Recent projects & transformations
          </h1>
        </div>
      </section>
      <Gallery heading={false} />
      <CTASection />
    </SiteLayout>
  );
}
