import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, ShieldCheck, Star } from "lucide-react";
import hero from "@/assets/hero.jpg";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/siteConfig";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/40" />
      
      {/* Hero Image - Right Side */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-60">
        <img
          src={hero}
          alt="Premium site maintenance services"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.8) contrast(1.1) saturate(1.2)",
            maskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#0B0B0B]/80" />
      </div>
      
      <div className="relative z-10 w-full px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Side - Content */}
          <div className="text-white animate-fade-up">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-4 py-2 text-xs font-medium border border-[#D8C2A0]/25 mb-6">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D8C2A0]" />
              <span className="text-white/90">Trusted by Builders & Homeowners across WA</span>
            </div>
            
            {/* Hero Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-balance mb-6">
              Your Trusted Partner for <span className="text-[#D8C2A0]">Site Maintenance</span> and <span className="text-[#D8C2A0]">Property Care</span>
            </h1>
            
            {/* Supporting Paragraph */}
            <p className="text-lg lg:text-xl text-white/75 leading-relaxed max-w-xl mb-8">
              Whether you need skilled labour, site levelling, or professional property repairs, our team ensures your project is completed to the highest standard.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gap-2 transition-all duration-300 hover:scale-105 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold shadow-lg hover:shadow-xl"
                >
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Button
                  size="lg"
                  className="gap-2 bg-transparent text-[#D8C2A0] border border-[#D8C2A0] hover:bg-[#D8C2A0] hover:text-black transition-all duration-300 font-semibold"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </Button>
              </a>
            </div>
            
            {/* Ratings Section */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#D8C2A0] text-[#D8C2A0]" />
                ))}
                <span className="ml-2 font-bold text-white">5.0</span>
                <span className="text-white/60">· 200+ happy clients</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/20" />
              <p className="text-white/60">✓ Free Quotes &nbsp; ✓ Fully Insured &nbsp; ✓ Fast Response</p>
            </div>
          </div>
          
          {/* Right Side - Empty Space for Image Overlap */}
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
