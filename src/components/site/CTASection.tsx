import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function CTASection() {
  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/10 to-transparent" />
      
      {/* Glow Effects */}
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#D8C2A0]/20 blur-3xl" />
      <div className="absolute -left-20 -bottom-20 h-96 w-96 rounded-full bg-[#D8C2A0]/10 blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/5 to-transparent opacity-50" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold leading-[1.1] text-balance mb-6">
                Ready to Get <span className="text-[#D8C2A0]">Started</span>?
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Tell us about your project — we'll respond within 24 hours with a comprehensive quote.
              </p>
              <div className="flex items-center gap-4 text-white/60">
                <div className="h-px bg-white/20 flex-1" />
                <span className="text-sm font-medium">Premium Service Guaranteed</span>
                <div className="h-px bg-white/20 flex-1" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="gap-3 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl px-8 py-4"
                >
                  Get Free Quote <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href={`tel:${siteConfig.contact.phone}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-3 bg-transparent border-[#D8C2A0] text-[#D8C2A0] hover:bg-[#D8C2A0] hover:text-black transition-all duration-300 font-semibold px-8 py-4"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
