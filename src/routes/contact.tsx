import { createFileRoute } from "@tanstack/react-router";

import { SiteLayout } from "@/components/site/SiteLayout";

import { QuoteForm } from "@/components/site/QuoteForm";

import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
} from "lucide-react";

import { siteConfig } from "@/config/siteConfig";

export const Route =
  createFileRoute("/contact")({
    head: () => ({
      meta: [
        {
          title:
            "Contact & Free Quote — BJ & R Maintenance",
        },

        {
          name: "description",

          content:
            "Get a free quote for artificial grass, construction maintenance, labour hire, sand removal or handyman services. Call, email or WhatsApp us.",
        },
      ],
    }),

    component: ContactPage,
  });

function ContactPage() {
  const contactCards = [
    {
      icon: Phone,

      label: "Phone",

      value:
        siteConfig.contact
          .displayPhone,

      href: `tel:${siteConfig.contact.phone}`,
    },

    {
      icon: MessageCircle,

      label: "WhatsApp",

      value: "Chat with us",

      href: `https://wa.me/${siteConfig.contact.whatsapp}`,
    },

    {
      icon: Mail,

      label: "Email",

      value:
        siteConfig.contact
          .email,

      href: `mailto:${siteConfig.contact.email}`,
    },

    {
      icon: MapPin,

      label: "Location",

      value:
        siteConfig.contact
          .address,
    },

    {
      icon: Clock,

      label: "Hours",

      value:
        "Mon–Sat · 7am – 7pm",
    },
  ];

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-20 bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <p className="text-[#D8C2A0] font-semibold uppercase tracking-widest text-sm mb-4 mt-4">
            Get In Touch
          </p>

          <h1 className="mt-4 text-4xl lg:text-7xl font-bold leading-[1.1] text-balance max-w-4xl">
            Free Quotes Within <span className="text-[#D8C2A0]">24 Hours</span>
          </h1>

          <p className="mt-6 max-w-3xl text-white/80 text-xl leading-relaxed">
            Tell us about your project. We'll respond fast with honest pricing.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-[#F8F6F3] to-[#F0F0F0] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D8C2A0]/5 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-3 gap-12">
          {/* CONTACT CARDS */}
          <div className="space-y-6">
            {contactCards.map(
              (c) => {
                const Inner =
                  (
                    <div className="group flex gap-4 rounded-2xl border border-gray-200/50 bg-white p-6 hover:border-[#D8C2A0]/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-[#D8C2A0]/5 scale-0 group-hover:scale-100 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                      
                      <div className="relative z-10">
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-[#D8C2A0] to-[#C4B090] text-white grid place-items-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                          <c.icon className="h-6 w-6" />
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold">
                            {
                              c.label
                            }
                          </p>

                          <p className="font-bold text-gray-900 mt-1 group-hover:text-[#D8C2A0] transition-colors duration-300">
                            {
                              c.value
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  );

                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={
                      c.href.startsWith(
                        "http",
                      )
                        ? "_blank"
                        : undefined
                    }
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div
                    key={c.label}
                  >
                    {Inner}
                  </div>
                );
              },
            )}
          </div>

          {/* FORM */}
          <div className="lg:col-span-2 relative rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 lg:p-12 shadow-2xl overflow-hidden">
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8C2A0]/10 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Request a <span className="text-[#D8C2A0]">Free Quote</span>
              </h2>

              <p className="text-white/80 mt-2">
                All fields marked are required.
              </p>

              <div className="mt-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 mt-16">
          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl aspect-16/7 bg-black/20 backdrop-blur-sm">
            <iframe
              title="Service area map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.7069320110395!2d115.85764157599156!3d-32.1851767338374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a3290a3b039f2eb%3A0xb2f4ebc1d064c9ce!2s186%20Honeywood%20Ave%2C%20Wandi%20WA%206167%2C%20Australia!5e0!3m2!1sen!2sin!4v1777814582235!5m2!1sen!2sin"
              className="w-full h-full"
              style={{
                border: 0,
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}