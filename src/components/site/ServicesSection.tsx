import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "./data";

export function ServicesSection({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <div className="max-w-2xl mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">What we do</p>
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Complete grass, site & trade services under one trusted team
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              From premium artificial turf to construction site cleanup, our
              experienced crew delivers a job done right — the first time.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <article
              key={s.slug}
              className="group rounded-2xl bg-card border overflow-hidden shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-5 right-5 text-white text-xl font-bold">
                  {s.title}
                </h3>
              </div>
              <div className="p-6">
                <p className="text-muted-foreground text-sm">{s.short}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {s.items.slice(0, 4).map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{i}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group/link"
                >
                  Get a quote
                  <ArrowUpRight className="h-4 w-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
