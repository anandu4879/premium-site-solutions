import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, ShieldCheck, Star } from "lucide-react";
import hero from "@/assets/hero-grass.webp";
import { siteConfig } from "@/config/siteConfig";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
      <img
        src={hero}
        alt="Premium artificial grass installation"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="container-x relative z-10 py-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 text-white animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium mb-6 border border-white/15">
            <ShieldCheck className="h-3.5 w-3.5 text-primary-glow" />
            Trusted by Builders & Homeowners across WA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-balance">
            Transform Your Outdoor Space with{" "}
            <span className="text-primary-glow">Premium Artificial Grass</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 max-w-2xl">
            Professional installation, labour hire, maintenance, and site services for residential
            and commercial projects.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact">
              <Button
                size="lg"
                className="h-12 px-7 bg-gradient-primary text-primary-foreground gap-2 hover:opacity-95"
              >
                Get Free Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href={siteConfig.contact.displayPhone}>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-7 gap-2 bg-white/10 text-white border-white/30 hover:bg-white hover:text-primary backdrop-blur"
              >
                <Phone className="h-4 w-4" /> Call Now
              </Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
              ))}
              <span className="ml-1 font-semibold">5.0</span>
              <span>· 200+ happy clients</span>
            </div>
            <div className="hidden sm:block w-px h-5 bg-white/20" />
            <p>✓ Free Quotes &nbsp; ✓ Fully Insured &nbsp; ✓ Fast Response</p>
          </div>
        </div>
      </div>
    </section>
  );
}
