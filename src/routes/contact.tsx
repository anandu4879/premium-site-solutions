import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Free Quote — BJ & R Maintenance" },
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
  return (
    <SiteLayout>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-primary text-primary-foreground">
        <div className="container-x">
          <p className="uppercase tracking-widest text-xs font-semibold opacity-80">Get in touch</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-bold text-balance max-w-3xl">
            Free quotes within 24 hours
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/90 text-lg">
            Tell us about your project. We'll respond fast with honest pricing.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid lg:grid-cols-3 gap-10">
          <div className="space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+61 406183393 ", href: "tel:+61406183393" },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Chat with us",
                href: "https://wa.me/61406183393",
              },
              {
                icon: Mail,
                label: "Email",
                value: "hello@bjrmaintenance.com.au",
                href: "mailto:hello@bjrmaintenance.com.au",
              },
              { icon: MapPin, label: "Location", value: "186 Honeywood Avenue, WANDI WA 6167" },
              { icon: Clock, label: "Hours", value: "Mon–Sat · 7am – 7pm" },
            ].map((c) => {
              const Inner = (
                <div className="flex gap-4 rounded-2xl border bg-card p-5 hover:border-primary/40 hover:shadow-card transition-all">
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                      {c.label}
                    </p>
                    <p className="font-semibold mt-1">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block"
                >
                  {Inner}
                </a>
              ) : (
                <div key={c.label}>{Inner}</div>
              );
            })}
          </div>

          <div className="lg:col-span-2 rounded-2xl bg-card border p-6 md:p-10 shadow-card">
            <h2 className="text-2xl md:text-3xl font-bold">Request a free quote</h2>
            <p className="text-muted-foreground mt-1">All fields marked are required.</p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
<div className="container-x mt-16">
  <div className="rounded-3xl overflow-hidden border shadow-card aspect-[16/7]">
    <iframe
      title="Service area map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3376.7069320110395!2d115.85764157599156!3d-32.1851767338374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2a3290a3b039f2eb%3A0xb2f4ebc1d064c9ce!2s186%20Honeywood%20Ave%2C%20Wandi%20WA%206167%2C%20Australia!5e0!3m2!1sen!2sin!4v1777814582235!5m2!1sen!2sin"
      className="w-full h-full"
      style={{ border: 0 }}
      
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
      </section>
    </SiteLayout>
  );
}
