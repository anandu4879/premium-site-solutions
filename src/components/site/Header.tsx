import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "bg-background/85 backdrop-blur-lg border-b shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-lg">
          <img
            src={logo}
            alt="BJ & R Maintenance"
            className="h-11 w-11 rounded-xl object-contain bg-foreground/5 p-1"
          />
          <span className="leading-tight">
            BJ & R<span className="text-primary"> </span>
            <span className="block text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
              Maintenance
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
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
          <a href="tel:+61400000000">
            <Button variant="ghost" size="sm" className="gap-2">
              <Phone className="h-4 w-4" /> 0400 000 000
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
            {nav.map((n) => (
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
