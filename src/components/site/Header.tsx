import { Link, linkOptions } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { siteConfig } from "@/config/siteConfig";

const nav = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/careers", label: "Career" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setIsHeaderHidden(true);
      } else {
        setIsHeaderHidden(false);
      }
      lastScrollY.current = currentScrollY;
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
      className={`sticky top-0 z-50 bg-white border-b shadow-sm transition-transform duration-300 ${
        isHeaderHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20 lg:h-24">
        <Link
          to="/"
          className="flex items-center h-full transition-transform duration-200 hover:scale-[1.02]"
          aria-label="BJ & R Maintenance PTY. LTD"
        >
          <div className="flex h-16 w-[13rem] items-center justify-center overflow-visible md:h-20 md:w-[16rem] lg:h-24 lg:w-[19rem]">
            <img
              src={logo}
              alt="BJ & R Maintenance"
              className="h-full w-full scale-125 object-contain"
            />
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.slice(0, 1).map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
              activeProps={{
                className: "px-3 py-2 rounded-md text-sm font-semibold text-primary bg-secondary",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
          <div className="relative services-dropdown">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition-colors flex items-center gap-1"
            >
              Service
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg py-2 z-50">
                {siteConfig.services.map((s) => (
                  <Link
                    key={s.slug}
                    {...linkOptions({ to: "/services/$slug", params: { slug: s.slug } })}
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-primary"
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
              className="px-3 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
              activeProps={{
                className: "px-3 py-2 rounded-md text-sm font-semibold text-primary bg-secondary",
              }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <a href={`tel:${siteConfig.contact.phone}`}>
            <Button variant="ghost" size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> {siteConfig.contact.displayPhone}
            </Button>
          </a>
          <Link to="/contact">
            <Button
              size="sm"
              className="bg-gradient-primary text-primary-foreground hover:opacity-95"
            >
              Get Free Quote
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-background animate-fade-in">
          <div className="container-x py-4 flex flex-col gap-1">
            {nav.slice(0, 1).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-md text-base font-medium hover:bg-secondary"
                activeProps={{
                  className:
                    "px-3 py-3 rounded-md text-base font-semibold text-primary bg-secondary",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="border-t border-border mt-2 pt-2">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((value) => !value)}
                className="w-full flex items-center justify-between px-3 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-md transition-colors"
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
                      className="block px-6 py-2 text-sm hover:bg-secondary"
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
                className="px-3 py-3 rounded-md text-base font-medium hover:bg-secondary"
                activeProps={{
                  className:
                    "px-3 py-3 rounded-md text-base font-semibold text-primary bg-secondary",
                }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2">
              <Button className="w-full bg-gradient-primary text-primary-foreground">
                Get Free Quote
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
