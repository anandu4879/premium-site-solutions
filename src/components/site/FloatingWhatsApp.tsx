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
        bottom-6
        right-6
        z-50
        grid
        place-items-center
        h-16
        w-16
        rounded-full
        bg-[#25D366]
        text-white
        shadow-2xl
        hover:scale-110
        transition-all duration-300
        hover:shadow-[#25D366]/50
        group
        border-2 border-white/20
      "
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-[#25D366]/20 scale-0 group-hover:scale-150 transition-all duration-500 blur-xl" />
    </a>
  );
}