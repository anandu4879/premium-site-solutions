import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/siteConfig";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-24">
      <div className="container-x py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-3">
          <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
            <img
              src={logo}
              alt="BJ & R Maintenance"
              className="h-10 w-10 rounded-xl bg-white object-contain p-1"
            />
            BJ & R Maintenance
          </Link>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Premium artificial grass installation and trusted construction site services across Western
            Australia. Residential & commercial.
          </p>
        </div>
        <div>
          <div className="flex gap-3 mt-5 justify-end">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-gray-700 transition-colors"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/gallery", "Gallery"],
              ["/careers", "Careers"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gray-300 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
  <h4 className="font-semibold mb-4">Services</h4>
  <ul className="space-y-2 text-sm text-white/70">
    {siteConfig.services?.map((service) => (
      <li key={service.slug}>
        {service.title}
      </li>
    ))}
  </ul>
</div>

        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gray-400" /> {siteConfig.contact.displayPhone}
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gray-400" /> {siteConfig.contact.email}
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gray-400" /> {siteConfig.contact.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container-x py-5 text-xs text-white/60 flex flex-col md:flex-row gap-2 md:justify-between">
          <p>© {new Date().getFullYear()} BJ & R Maintenance. All rights reserved.</p>
          <p>ABN 00 000 000 000 · Fully insured</p>
        </div>
      </div>
    </footer>
  );
}
