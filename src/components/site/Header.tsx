import { Link, linkOptions } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/siteConfig";

const nav = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Initialize scrolled state on mount
    setScrolled(window.scrollY > 0);
    
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest('.services-dropdown')) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHeaderHidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between h-30 px-6 lg:px-12 max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center transition-transform duration-200 hover:scale-[1.02] shrink-0"
          aria-label="BJ & R Maintenance PTY. LTD"
        >
          <div className="flex items-center gap-1 h-auto">
            <img
              src={logo}
              alt="BJ & R Maintenance"
              className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain"
            />
            <div className="flex flex-col leading-none gap-0">
              <span className="text-white font-bold text-xl md:text-2xl lg:text-3xl">BJ <span className="text-gray-400">&</span> R</span>
              <span className="text-[#D8C2A0] text-lg md:text-xl lg:text-2xl font-medium">MAINTENANCE</span>
              <span className="text-white text-sm md:text-base opacity-80">PTY.LTD</span>
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1 mx-8">
          {nav.slice(0, 1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
              activeProps={{
                className: "px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D8C2A0] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
          <div className="relative services-dropdown">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 relative group"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D8C2A0] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl py-2 z-50">
                {siteConfig.services.map((s) => (
                  <Link
                    key={s.slug}
                    {...linkOptions({ to: "/services/$slug", params: { slug: s.slug } })}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {nav.slice(1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
              activeProps={{
                className: "px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#D8C2A0] transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${siteConfig.contact.phone}`}>
            <Button variant="ghost" size="sm" className="gap-2 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
              <Phone className="h-4 w-4" /> {siteConfig.contact.displayPhone}
            </Button>
          </a>
          <Link to="/contact">
            <Button
              size="sm"
              className="bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Free Quote
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-3 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-4 flex flex-col gap-2 animate-slide-down">
            {nav.slice(0, 1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                activeProps={{
                  className: "px-4 py-3 rounded-lg text-base font-medium text-white bg-white/10",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="border-t border-white/10 mt-2 pt-2">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((value) => !value)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-expanded={mobileServicesOpen}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileServicesOpen && (
                <div className="mt-1 space-y-1">
                  {siteConfig.services.map((s) => (
                    <Link
                      key={s.slug}
                      {...linkOptions({ to: "/services/$slug", params: { slug: s.slug } })}
                      onClick={() => {
                        setOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="block px-6 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {nav.slice(1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                activeProps={{
                  className: "px-4 py-3 rounded-lg text-base font-medium text-white bg-white/10",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-4 space-y-3">
              <a href={`tel:${siteConfig.contact.phone}`} className="block">
                <Button variant="ghost" className="w-full gap-2 text-white/80 hover:bg-white/10 hover:text-white justify-start">
                  <Phone className="h-4 w-4" /> {siteConfig.contact.displayPhone}
                </Button>
              </a>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button className="w-full bg-[#D8C2A0] hover:bg-[#C4B090] text-black font-semibold">
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}