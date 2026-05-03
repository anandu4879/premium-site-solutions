import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    role: "Homeowner, Perth",
    text: "BJ & R Maintenance completely transformed our backyard. The turf looks incredible and the team was punctual, tidy and professional from start to finish.",
  },
  {
    name: "James R.",
    role: "Site Manager, BuildCo",
    text: "We've used their labour hire and clean-up team on three sites now. Always on time, always switched on. Couldn't recommend them more.",
  },
  {
    name: "Priya K.",
    role: "School Principal",
    text: "Our new playground turf is safer, cleaner and looks fantastic. The kids love it and maintenance is virtually zero.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-x">
        <div className="max-w-2xl mb-14">
          <p className="text-primary-glow font-semibold uppercase tracking-widest text-xs mb-3">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            What our clients say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl bg-background/5 backdrop-blur p-7 border border-background/10 relative">
              <Quote className="h-8 w-8 text-primary-glow opacity-60" />
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
                ))}
              </div>
              <p className="mt-4 text-background/90 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 pt-4 border-t border-background/10">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-background/60">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
