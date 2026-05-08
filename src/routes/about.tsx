import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { WhyUs } from "@/components/site/WhyUs";
import { Testimonials } from "@/components/site/Testimonials";
import { CTASection } from "@/components/site/CTASection";
import about from "@/assets/gallery-1.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BJ & R Maintenance" },
      {
        name: "description",
        content:
          "Experienced Australian crew delivering quality artificial grass, construction maintenance and site services with affordable pricing and customer satisfaction.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4 mt-4">About Us</p>
          <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl">
            <span className="text-[#D8C2A0]">Australian-Owned</span>, Ground-Up Reliable
          </h1>
          <p className="mt-6 max-w-3xl text-white/80 text-xl leading-relaxed">
            Built on quality workmanship, fair pricing, and showing up when we say we will.
          </p>
        </div>
      </section>

      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/50">
              <img
                src={about}
                alt="About BJ & R Maintenance"
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl bg-[#D8C2A0]/10 scale-0 group-hover:scale-100 transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
          </div>
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 leading-[1.2] mb-6">
              A Trusted <span className="text-[#D8C2A0]">Local Team</span> — Residential & Commercial
            </h2>
            <p className="mt-6 text-gray-700 font-medium text-lg leading-relaxed">
              BJ & R Maintenance is a hands-on Australian business specialising in premium
              artificial grass installation and full site services. Whether it's a backyard
              transformation, a school playground, a rooftop garden, or post-construction site
              cleanup — we bring the same standard of care to every project.
            </p>
            <p className="mt-4 text-gray-700 font-medium text-lg leading-relaxed">
              Our experienced team prides itself on professional workmanship, affordable pricing and
              customer satisfaction from the first quote to the final clean-up. We're fully insured,
              safety-focused and committed to leaving every site better than we found it.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:gap-6 items-stretch">
              {[
                ["10+", "Years Experience"],
                ["500+", "Projects Done"],
                ["100%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l} className="group relative rounded-2xl bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] p-6 text-center border border-white/10 hover:border-[#D8C2A0]/30 transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]">
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-[#D8C2A0]/10 scale-0 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-white leading-none tracking-tight">{n}</div>
                    <div className="text-xs sm:text-xs text-white/80 mt-2 font-medium leading-snug">{l}</div>
                  </div>
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
