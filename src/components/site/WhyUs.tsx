import {
  BadgeCheck,
  Banknote,
  HardHat,
  Truck,
  Zap,
  Handshake,
  ShieldCheck,
  Smile,
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
    <section className="relative py-20 lg:py-28 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4">
            Why Choose Us
          </p>
          <h2 className="text-4xl lg:text-6xl font-bold leading-[1.1] text-balance text-gray-900">
            Built on <span className="text-[#D8C2A0]">Quality</span>, Trust, and <span className="text-[#D8C2A0]">Craftsmanship</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            We deliver exceptional service with attention to detail that sets us apart from the rest.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {features.map((f, index) => (
            <div
              key={f.title}
              className="group relative rounded-2xl bg-white border border-gray-200/50 p-6 hover:border-[#D8C2A0]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-[#D8C2A0]/5 scale-0 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#D8C2A0] to-[#C4B090] text-white grid place-items-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#D8C2A0] transition-colors duration-300">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
