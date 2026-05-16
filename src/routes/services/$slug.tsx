import { createFileRoute, useMatch } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React, { useEffect } from "react";

export const Route = createFileRoute("/services/$slug")({
  head: () => {
    const service = siteConfig.services[0]; // This will be updated in the component
    return {
      meta: [
        { title: `${service?.title || "Service"} — BJ & R Maintenance` },
        {
          name: "description",
          content: service?.short || "Professional service by BJ & R Maintenance",
        },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const match = useMatch({ from: "/services/$slug" });
  const slug = match?.params.slug;

  if (!slug) return null;

  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) return null;

  // Service structured data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.bjrmaintenance.com/services/${service.slug}`,
    name: service.title,
    description: service.detail,
    image: `https://www.bjrmaintenance.com${service.image}`,
    provider: {
      "@type": "LocalBusiness",
      name: "BJ & R Maintenance",
      url: "https://www.bjrmaintenance.com",
      telephone: "+61406183393",
    },
    areaServed: {
      "@type": "City",
      name: "Perth",
    },
  };

  // Define color themes for each service
  const serviceThemes = {
    "artificial-grass": {
      primary: "#D8C2A0", // Gold
      primaryHover: "#C4B090", // Darker gold
      secondary: "#0B0B0B", // Dark black
      background: "#0B0B0B", // Dark black background
      accent: "#D8C2A0", // Gold accent
    },
    "construction-maintenance": {
      primary: "#D8C2A0", // Gold
      primaryHover: "#C4B090", // Darker gold
      secondary: "#0B0B0B", // Dark black
      background: "#0B0B0B", // Dark black background
      accent: "#D8C2A0", // Gold accent
    },
    "labour-hire": {
      primary: "#D8C2A0", // Gold
      primaryHover: "#C4B090", // Darker gold
      secondary: "#0B0B0B", // Dark black
      background: "#0B0B0B", // Dark black background
      accent: "#D8C2A0", // Gold accent
    },
    "sand-removal": {
      primary: "#D8C2A0", // Gold
      primaryHover: "#C4B090", // Darker gold
      secondary: "#0B0B0B", // Dark black
      background: "#0B0B0B", // Dark black background
      accent: "#D8C2A0", // Gold accent
    },
    "handyman": {
      primary: "#D8C2A0", // Gold
      primaryHover: "#C4B090", // Darker gold
      secondary: "#0B0B0B", // Dark black
      background: "#0B0B0B", // Dark black background
      accent: "#D8C2A0", // Gold accent
    },
  };

  const theme = serviceThemes[service.slug as keyof typeof serviceThemes] || serviceThemes["artificial-grass"];
  const colors = theme;

  // Inject structured data into head
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(serviceSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [slug]);

  return (
    <div className="min-h-[100svh] flex flex-col bg-background overflow-x-hidden">
      {/* HERO SECTION */}
      <section 
      className="pt-20 pb-10 lg:pt-24 lg:pb-12 relative overflow-hidden flex items-center"
        style={{ backgroundColor: colors.background }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover opacity-40"
            loading="lazy"
          />
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary} 100%)`,
              opacity: 0.85
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-center min-h-[45vh]">
  <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
            {/* <p 
              className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4"
            >
              {service.title}
            </p> */}
            <h1 
              className="text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl text-white mb-6 text-center mx-auto"
            >
              <span style={{ color: colors.primary }}>{service.title}</span>
            </h1>
            <p 
              className="max-w-3xl mx-auto text-lg lg:text-xl text-white/80 leading-relaxed mb-8 text-center"
            >
              {service.short}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center w-full mx-auto">
              <div className="flex justify-center">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="gap-2 transition-all hover:scale-105 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold shadow-lg hover:shadow-xl px-8 py-4"
                  >
                    <Phone className="h-4 w-4" /> Get Free Quote
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <a href={`tel:${siteConfig.contact.phone}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 transition-all hover:scale-105 bg-transparent border-[#D8C2A0] text-[#D8C2A0] hover:bg-[#D8C2A0] hover:text-black font-semibold"
                  >
                    Call Now
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center justify-items-center">
            {/* SERVICE DETAILS */}
            <div className="space-y-8">
              <h2 
                className="text-3xl lg:text-5xl font-bold mb-8 text-gray-900"
              >
                Service <span style={{ color: colors.primary }}>Overview</span>
              </h2>
              
              <div 
                className="relative rounded-3xl p-8 border border-white/50 shadow-2xl overflow-hidden bg-white"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/10 to-transparent opacity-50" />
                
                <div className="relative z-10">
                  <h3 
                    className="text-2xl font-bold mb-4 text-gray-900"
                  >
                    What We <span style={{ color: colors.primary }}>Offer</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {service.detail}
                  </p>
                </div>
              </div>

              <div 
                className="relative rounded-3xl p-8 border border-white/50 shadow-2xl overflow-hidden bg-white"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/10 to-transparent opacity-50" />
                
                <div className="relative z-10">
                  <h3 
                    className="text-2xl font-bold mb-6 text-gray-900"
                  >
                    Service <span style={{ color: colors.primary }}>Areas</span>
                  </h3>
                  <ul className="space-y-4">
                    {service.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div 
                          className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 border border-[#D8C2A0]/30 bg-[#D8C2A0]/20"
                        >
                          <Check className="h-4 w-4 text-[#D8C2A0]" />
                        </div>
                        <span className="text-gray-700 font-medium text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* IMAGE GALLERY */}
            <div className="lg:col-span-1">
              <div className="relative group rounded-3xl overflow-hidden shadow-2xl aspect-4/3 border border-white/50">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[#D8C2A0]/10 scale-0 group-hover:scale-100 transition-all duration-500 blur-xl opacity-0 group-hover:opacity-100" />
                
                <div 
                  className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent"
                >
                  <h3 
                    className="text-2xl font-bold mb-2 text-white"
                  >
                    Premium <span style={{ color: colors.primary }}>Quality</span>
                  </h3>
                  <p className="text-white/90 leading-relaxed text-lg">
                    Expert installation with warranty-backed quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div 
            className="relative rounded-3xl p-12 lg:p-16 text-center shadow-2xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/10 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 text-white">
                Ready to <span style={{ color: colors.primary }}>Transform</span> Your Space?
              </h2>
              <p className="text-lg lg:text-xl text-white/80 mb-8 leading-relaxed">
                Contact us today for a free consultation and quote
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <div className="flex justify-center">
                  <Link to="/contact">
                    <Button
                      size="lg"
                      className="gap-2 transition-all hover:scale-105 bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold shadow-lg hover:shadow-xl px-8 py-4"
                    >
                      Get Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex justify-center">
                  <a href={`tel:${siteConfig.contact.phone}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 transition-all hover:scale-105 bg-transparent border-[#D8C2A0] text-[#D8C2A0] hover:bg-[#D8C2A0] hover:text-black font-semibold"
                    >
                      Call Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
