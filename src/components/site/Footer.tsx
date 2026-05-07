import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-3 font-display font-bold text-xl group">
            <div className="h-12 w-12 rounded-xl bg-[#D8C2A0]/10 flex items-center justify-center group-hover:bg-[#D8C2A0]/20 transition-all duration-300">
              <img
                src={logo}
                alt="BJ & R Maintenance"
                className="h-8 w-8 object-contain"
              />
            </div>
            <span className="bg-gradient-to-r from-white to-[#D8C2A0] bg-clip-text text-transparent">BJ & R Maintenance</span>
          </Link>
          <p className="mt-6 text-sm text-white/75 leading-relaxed max-w-md">
            Premium artificial grass installation and trusted construction site services across Western
            Australia. Residential & commercial excellence delivered with precision.
          </p>
          <div className="flex gap-3 mt-8">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => {
              const socialUrls = {
                0: siteConfig.socials.facebook,
                1: siteConfig.socials.instagram,
                2: siteConfig.socials.linkedin
              };
              return (
                <a
                  key={i}
                  href={socialUrls[i as keyof typeof socialUrls] || "#"}
                  className="h-10 w-10 grid place-items-center rounded-full bg-white/5 border border-white/10 hover:bg-[#D8C2A0]/10 hover:border-[#D8C2A0]/30 transition-all duration-300 group"
                  aria-label="Social link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-4 w-4 text-white/70 group-hover:text-[#D8C2A0] transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-[#D8C2A0]">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/gallery", "Gallery"],
              ["/careers", "Careers"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-[#D8C2A0] transition-all duration-300 relative group">
                  {label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D8C2A0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6 text-[#D8C2A0]">Services</h4>
          <ul className="space-y-3 text-sm">
            {siteConfig.services?.map((service) => (
              <li key={service.slug}>
                <Link to="/services/$slug" params={{ slug: service.slug }} className="text-white/70 hover:text-[#D8C2A0] transition-all duration-300 relative group">
                  {service.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D8C2A0] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="text-sm text-white/60">
              <p>© {new Date().getFullYear()} BJ & R Maintenance. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/60">
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-[#D8C2A0] transition-colors flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {siteConfig.contact.displayPhone}
              </a>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-[#D8C2A0] transition-colors flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {siteConfig.contact.email}
              </a>
              <span className="hidden lg:block w-px h-4 bg-white/20" />
              <p>ABN 00 000 000 000 · Fully insured</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
