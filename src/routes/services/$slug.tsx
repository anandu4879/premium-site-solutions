import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CTASection } from "@/components/site/CTASection";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/services/$slug")({
  head: (ctx) => {
    const service = siteConfig.services.find((s) => s.slug === ctx.params.slug);
    return {
      meta: [
        { title: `${service?.title} — BJ & R Maintenance` },
        {
          name: "description",
          content: service?.detail || service?.short || "Professional service by BJ & R Maintenance",
        },
      ],
    };
  },
  component: ServicePage,
  loader: (ctx) => {
    const service = siteConfig.services.find((s) => s.slug === ctx.params.slug);
    if (!service) throw new Error("Service not found");
    return service;
  },
});

type Service = (typeof siteConfig.services)[number];

function ServicePage() {
  const service = Route.useLoaderData() as Service;

  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <Link
            to="/"
            asChild
          >
            <Button
              variant="ghost"
              className="mb-4 text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">Service Detail</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            {service.title}
          </h1>
          {service.detail ? (
            <p className="mt-6 max-w-2xl text-primary-foreground/80 text-base leading-8 whitespace-pre-line">
              {service.detail}
            </p>
          ) : null}
        </div>
      </section>

      <div className="container-x py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-elevated aspect-[4/3]">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">What we offer</h2>
            <ul className="mt-6 grid gap-3">
              {service.items.map((item) => (
                <li key={item} className="flex gap-3 text-lg">
                  <Check className="h-5 w-5 text-primary mt-1 shrink-0" /> {item}
                </li>
              ))}
            </ul>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:gap-4">
              Get Free Quote
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
      <CTASection />
    </>
  );
}