import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-10 md:p-16 shadow-elevated relative overflow-hidden">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-balance">
                Ready to get started? Get your free quote today.
              </h2>
              <p className="mt-4 text-primary-foreground/90 text-lg">
                Tell us about your project — we'll respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="h-12 px-7 gap-2">
                  Get Free Quote <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={siteConfig.contact.displayPhone}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-7 gap-2 bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Phone className="h-4 w-4" /> Call Now
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
