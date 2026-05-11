import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { useEffect, useState } from "react";

export function Footer() {
  const [logo, setLogo] = useState<string>("");
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    const loadLogo = async () => {
      try {
        setLogoLoading(true);
        
        // Dynamically import logo from logo directory
        const logoModules = import.meta.glob('/src/assets/logo/*.{png,jpg,jpeg,webp,svg,gif}', { eager: true });
        
        // Get the first logo found
        const logoPaths = Object.keys(logoModules);
        
        if (logoPaths.length > 0) {
          const logoPath = logoPaths[0];
          const logoModule = logoModules[logoPath];
          const logoUrl = (logoModule as any).default;
          
          setLogo(logoUrl);
          console.log(`✅ Footer dynamically loaded logo: ${logoPath}`);
        } else {
          console.warn('⚠️ No logo found in assets/logo/ folder for footer');
        }
        
      } catch (error) {
        console.error('❌ Error loading footer logo:', error);
      } finally {
        setLogoLoading(false);
      }
    };

    loadLogo();
  }, []);

  return (
    <footer className="bg-gradient-to-br from-[#0B0B0B] via-[#111111] to-[#1A1A1A] text-white mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 sm:py-16 grid gap-8 sm:gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2 space-y-6 sm:space-y-0">
          <Link to="/" className="flex items-center gap-3 font-display font-bold text-xl group">
            <div className="h-12 w-12 rounded-xl bg-[#D8C2A0]/10 flex items-center justify-center group-hover:bg-[#D8C2A0]/20 transition-all duration-300">
              {logoLoading ? (
                <div className="h-8 w-8 bg-[#D8C2A0]/30 rounded-lg animate-pulse" />
              ) : logo ? (
                <img
                  src={logo}
                  alt="BJ & R Maintenance"
                  className="h-8 w-8 object-contain"
                  onError={(e) => {
                    console.error('Footer logo failed to load:', e);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Footer logo loaded successfully');
                  }}
                />
              ) : (
                <div className="h-8 w-8 bg-[#D8C2A0]/30 rounded-lg flex items-center justify-center">
                  <span className="text-[#D8C2A0] font-bold text-xs">BJ&R</span>
                </div>
              )}
            </div>
            <span className="bg-gradient-to-r from-white to-[#D8C2A0] bg-clip-text text-transparent">BJ & R Maintenance</span>
          </Link>
          <p className="mt-4 sm:mt-6 text-sm text-white/75 leading-relaxed max-w-md">
            Premium artificial grass installation and trusted construction site services across Western
            Australia. Residential & commercial excellence delivered with precision.
          </p>
          <div className="flex gap-3 mt-4 sm:mt-8">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => {
              const socialUrls = {
                '0': siteConfig.socials.facebook,
                '1': siteConfig.socials.instagram,
                '2': siteConfig.socials.linkedin
              } as const;
              
              return (
                <a
                  key={i}
                  href={socialUrls[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300 hover:scale-110"
                  aria-label={`Visit our ${i === 0 ? 'Facebook' : i === 1 ? 'Instagram' : 'LinkedIn'}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-3">
            {siteConfig.services.slice(0, 4).map((service) => (
              <li key={service.slug}>
                <Link
                  to={`/services/${service.slug}`}
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <div className="space-y-3">
            <a 
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <Mail className="h-4 w-4" />
              <span>{siteConfig.contact.email}</span>
            </a>
            <a 
              href={`tel:${siteConfig.contact.phone}`}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.contact.displayPhone}</span>
            </a>
          </div>
          
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4" />
              <span>{siteConfig.contact.address}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white/80 hover:text-white transition-colors duration-200">
                All Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-white/80 hover:text-white transition-colors duration-200">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-white/80 hover:text-white transition-colors duration-200">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/80 hover:text-white transition-colors duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
          <p>&copy; 2024 BJ & R Maintenance PTY. LTD. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
