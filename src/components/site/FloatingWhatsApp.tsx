import { MessageCircle } from "lucide-react";

import { siteConfig } from "@/config/siteConfig";

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${siteConfig.contact.whatsapp}?text=Hi%20I%20would%20like%20a%20quote`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed
        bottom-5
        right-5
        z-50
        grid
        place-items-center
        h-14
        w-14
        rounded-full
        bg-whatsapp
        text-white
        shadow-elevated
        hover:scale-110
        transition-transform
      "
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}