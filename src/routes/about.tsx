import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";
import about from "@/assets/gallery-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — GreenLine Grass & Site Services" },
      { name: "description", content: "Experienced Australian crew delivering quality artificial grass, construction maintenance and site services with affordable pricing and customer satisfaction." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">About us</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Australian-owned, ground-up reliable
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/90 text-lg">
            Built on quality workmanship, fair pricing, and showing up when we say we will.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-elevated aspect-[4/3]">
            <img src={about} alt="About GreenLine" loading="lazy" className="h-full w-full object-cover" />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">A trusted local team — residential & commercial</h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              GreenLine is a hands-on Australian business specialising in
              premium artificial grass installation and full site services.
              Whether it's a backyard transformation, a school playground, a
              rooftop garden, or post-construction site cleanup — we bring the
              same standard of care to every project.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Our experienced team prides itself on professional workmanship,
              affordable pricing and customer satisfaction from the first
              quote to the final clean-up. We're fully insured, safety-focused
              and committed to leaving every site better than we found it.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                ["10+", "Years experience"],
                ["500+", "Projects done"],
                ["100%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l} className="rounded-2xl bg-secondary p-5 text-center">
                  <div className="text-3xl font-bold text-primary">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <CTASection />
    </SiteLayout>
  );
}
