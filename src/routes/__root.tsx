import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BJ & R Maintenance — Artificial Grass & Site Services in WA" },
      {
        name: "description",
        content:
          "Premium artificial grass installation, construction maintenance, labour hire, sand removal & handyman services across Perth & WA. Free quotes, fully insured.",
      },
      { name: "author", content: "BJ & R Maintenance" },
      { property: "og:title", content: "BJ & R Maintenance — Artificial Grass & Site Services" },
      {
        property: "og:description",
        content:
          "Premium artificial grass, construction cleanup, labour hire & more. Free quotes across WA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.bjrmaintenance.com" },
      { property: "og:image", content: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png" },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { property: "og:image:alt", content: "BJ & R Maintenance Logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BJ & R Maintenance — Artificial Grass & Site Services" },
      {
        name: "twitter:description",
        content: "Premium artificial grass, construction cleanup, labour hire & more. Free quotes across WA.",
      },
      { name: "twitter:image", content: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png" },
      { name: "twitter:image:alt", content: "BJ & R Maintenance Logo" },
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.bjrmaintenance.com",
    name: "BJ & R Maintenance",
    description:
      "Premium artificial grass installation, construction maintenance, labour hire, sand removal & handyman services across Perth & WA.",
    url: "https://www.bjrmaintenance.com",
    logo: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png",
    image: "https://www.bjrmaintenance.com/web-app-manifest-512x512.png",
    telephone: "+61406183393",
    email: "hellobjrmaintenance@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Honeywood Avenue",
      addressLocality: "Wandi",
      postalCode: "6167",
      addressRegion: "WA",
      addressCountry: "AU",
    },
    sameAs: [
      "https://www.facebook.com/share/1EDpqJJpvY/?mibextid=wwXIfr",
      "https://www.instagram.com/bj_and_r_maintenance?igsh=NWdwazBkZGY0NTJq&utm_source=qr",
      "https://www.linkedin.com/company/bj-r-maintenance-pty-ltd/?viewAsMember=true",
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Perth",
    },
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
