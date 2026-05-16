import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
// import { Features } from "@/components/site/Features";
import { Builders } from "@/components/site/Builders";
import { ServicesSection } from "@/components/site/ServicesSection";
import { WhyUs } from "@/components/site/WhyUs";
import { ServiceGalleries } from "@/components/site/ServiceGallery";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BJ & R Maintenance" },
      {
        name: "google-site-verification",
        content: "dD0KJGT_xABktzpb7Vdy_3YY4oVS8eLQzmhb-HsDy9s",
      },
      {
        name: "description",
        content:
          "Premium artificial grass installation, construction maintenance, labour hire, sand removal & handyman services. Free quotes across WA.",
      },
      { property: "og:image", content: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { name: "twitter:image", content: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      {/* <Features /> */}
       <WhyUs />
      <Builders />
      <ServicesSection />
     
      <ServiceGalleries />
      <Testimonials />
      <section className="py-20 md:py-28 bg-secondary/50">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
              Free quote
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Get a no-obligation quote in 24 hours
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Tell us about your project and upload site photos — we'll come back with honest
              pricing fast.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              <li>✓ Free, on-site assessments</li>
              <li>✓ Transparent, fixed quotes</li>
              <li>✓ Fully insured & licensed crew</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-card border p-6 md:p-8 shadow-card">
            <QuoteForm />
          </div>
        </div>
      </section>
      <CTASection />
    </SiteLayout>
  );
}
