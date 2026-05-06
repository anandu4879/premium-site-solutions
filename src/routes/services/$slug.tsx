import { createFileRoute, useMatch } from "@tanstack/react-router";
import { siteConfig } from "@/config/siteConfig";
import { Check, ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const match = useMatch({ from: "/services/$slug" });
  const slug = match?.params.slug;

  if (!slug) return null;

  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) return null;

  // Define color themes for each service
  const serviceThemes = {
    "artificial-grass": {
      primary: "#10B981", // Green
      primaryHover: "#0A7F4F", // Darker green
      secondary: "#059669", // Medium green
      background: "#F0FDF4", // Light green background
      accent: "#34D399", // Accent green
    },
    "construction-maintenance": {
      primary: "#54626F", // Black Coral
      primaryHover: "#4A3A5C", // Darker Black Coral
      secondary: "#6B5B5E", // Medium Black Coral
      background: "#F8F4F3", // Light Black Coral background
      accent: "#7A6B6B", // Accent Black Coral
    },
    "labour-hire": {
      primary: "#98817B", // Cinereous
      primaryHover: "#7A6B6B", // Darker Cinereous
      secondary: "#B8A39C", // Medium Cinereous
      background: "#F5E6D6", // Light Cinereous background
      accent: "#C7A582", // Accent Cinereous
    },
    "sand-removal": {
      primary: "#848482", // Old Silver
      primaryHover: "#6B6B6B", // Darker Old Silver
      secondary: "#A8A39C", // Medium Old Silver
      background: "#F4F4F4", // Light Old Silver background
      accent: "#B8A39C", // Accent Old Silver
    },
    "handyman": {
      primary: "#8B8589", // Taupe Gray
      primaryHover: "#7A6B6B", // Darker Taupe Gray
      secondary: "#9B8B8B", // Medium Taupe Gray
      background: "#F4E8E8", // Light Taupe Gray background
      accent: "#A8A39C", // Accent Taupe Gray
    },
  };

  const theme = serviceThemes[service.slug as keyof typeof serviceThemes] || serviceThemes["artificial-grass"];
  const colors = theme;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* HERO SECTION */}
      <section 
        className="pt-16 pb-12 md:pt-24 md:pb-16 relative overflow-hidden"
        style={{ backgroundColor: colors.background }}
      >
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover opacity-30"
            loading="lazy"
          />
          <div 
            className="absolute inset-0"
            style={{ 
              background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.secondary} 100%)`,
              opacity: 0.9
            }}
          />
        </div>
        <div className="relative z-10 container-x">
          <div className="max-w-4xl mx-auto text-center">
            <p 
              className="uppercase tracking-widest text-xs font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              {service.title}
            </p>
            <h1 
              className="text-4xl md:text-6xl font-bold text-balance max-w-3xl"
              style={{ color: colors.primary }}
            >
              {service.title}
            </h1>
            <p 
              className="max-w-3xl text-lg leading-relaxed mb-8"
              style={{ color: colors.secondary }}
            >
              {service.short}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gap-2 transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: "white",
                    border: `2px solid ${colors.primary}`
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = colors.primaryHover;
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                  }}
                >
                  <Phone className="h-4 w-4" /> Get Free Quote
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all hover:scale-105"
                style={{ 
                  backgroundColor: colors.primary,
                  color: "white",
                  border: `2px solid ${colors.primary}`
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = colors.primaryHover;
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.backgroundColor = colors.primary;
                }}
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-20">
        <div className="container-x">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* SERVICE DETAILS */}
            <div className="space-y-8">
              <h2 
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ color: colors.primary }}
              >
                Service Overview
              </h2>
              
              <div 
                className="rounded-2xl p-6 border-2 shadow-lg"
                style={{ 
                  backgroundColor: colors.background,
                  borderColor: colors.accent,
                  color: colors.primary
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.primary }}
                >
                  What We Offer
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {service.detail}
                </p>
              </div>

              <div 
                className="rounded-2xl p-6 border-2 shadow-lg"
                style={{ 
                  backgroundColor: colors.background,
                  borderColor: colors.accent,
                  color: colors.primary
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-4"
                  style={{ color: colors.primary }}
                >
                  Service Areas
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div 
                        className="h-6 w-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* IMAGE GALLERY */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-4/3">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
                <div 
                  className="p-6 text-center"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ color: colors.primary }}
                  >
                    Premium Quality
                  </h3>
                  <p className="text-white leading-relaxed">
                    Expert installation with warranty-backed quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20">
        <div className="container-x">
          <div 
            className="rounded-3xl p-10 text-center shadow-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              color: "white"
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today for a free consultation and quote
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="gap-2 transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: "white",
                    color: colors.primary,
                    border: `2px solid ${colors.primary}`
                  }}
                >
                  Get Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 transition-all hover:scale-105"
                style={{ 
                  backgroundColor: "transparent",
                  color: "white",
                  borderColor: "white"
                }}
              >
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
