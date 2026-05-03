import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { services } from "@/components/site/data";
import { Check } from "lucide-react";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — BJ & R Maintenance" },
      { name: "description", content: "Artificial grass, construction maintenance, labour hire, sand removal and handyman services for residential and commercial projects." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">Services</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            End-to-end grass, site & trade services
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/90 text-lg">
            From premium artificial turf installation to construction cleanup
            and skilled labour hire — one trusted team for every job.
          </p>
        </div>
      </section>

      <div className="container-x py-20 grid gap-16">
        {services.map((s, i) => (
          <article
            key={s.slug}
            id={s.slug}
            className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="rounded-3xl overflow-hidden shadow-elevated aspect-[4/3]">
              <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">{s.title}</h2>
              <p className="mt-4 text-muted-foreground text-lg">{s.short}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <CTASection />
    </SiteLayout>
  );
}
