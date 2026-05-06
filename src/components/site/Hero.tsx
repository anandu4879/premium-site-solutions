import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, ShieldCheck, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";
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
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 via-gray-500/60 to-gray-800/70" />
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-10 py-0 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 text-black animate-fade-up">
            <div className="flex flex-col items-start mb-6">
              <div className="h-48 md:h-56 overflow-hidden mb-2">
                <img
                  src={logo}
                  alt="BJ & R Maintenance"
                  className="w-full h-full object-contain object-center"
                  style={{ 
                    objectPosition: 'center 10px',
                    transform: 'scale(1.1)',
                    marginTop: '-10px'
                  }}
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-medium border border-gray-300 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-gray-700" />
                Trusted by Builders & Homeowners across WA
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] text-balance text-black">
                Your Trusted Partner for Site Maintenance and Property Care
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl">
                Whether you need skilled labour, site levelling, or professional property repairs, our team ensures your project is completed to the highest standard.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gap-2 transition-all hover:scale-105 bg-black hover:bg-gray-800 text-white"
                >
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={`tel:${siteConfig.contact.displayPhone}`}>
                <Button
                  size="lg"
                  className="h-12 px-7 gap-2 bg-white text-black border-gray-300 hover:bg-gray-100 transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </Button>
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gray-700 text-gray-700" />
                ))}
                <span className="ml-1 font-semibold">5.0</span>
                <span>· 200+ happy clients</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/20" />
              <p>✓ Free Quotes &nbsp; ✓ Fully Insured &nbsp; ✓ Fast Response</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
