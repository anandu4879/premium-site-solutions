import {
  BadgeCheck, Banknote, HardHat, Truck, Zap, Handshake, ShieldCheck, Smile,
} from "lucide-react";

const features = [
  { icon: Banknote, title: "Free Quotes", desc: "No obligation, on-site assessments." },
  { icon: BadgeCheck, title: "Affordable Pricing", desc: "Honest, transparent quotes." },
  { icon: HardHat, title: "Experienced Team", desc: "10+ years on the tools." },
  { icon: Truck, title: "Fully Equipped", desc: "Our own gear, ready to roll." },
  { icon: Zap, title: "Fast Response", desc: "Quote turnaround in 24 hours." },
  { icon: Handshake, title: "Reliable Service", desc: "On time, on budget, every time." },
  { icon: ShieldCheck, title: "Safe Work Practices", desc: "Fully insured & compliant." },
  { icon: Smile, title: "Customer Satisfaction", desc: "We don't leave until you're happy." },
];

export function WhyUs() {
  return (
    <section className="py-20 md:py-28 bg-secondary/60">
      <div className="container-x">
        <div className="max-w-2xl mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">Why choose us</p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">
            Built on quality, trust, and old-school craftsmanship
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl bg-card p-6 border hover:border-primary/40 hover:shadow-card transition-all">
              <div className="h-11 w-11 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
