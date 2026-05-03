import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/61406183393?text=Hi%20BJ & R Maintenance%2C%20I%27d%20like%20a%20quote"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid place-items-center h-14 w-14 rounded-full bg-whatsapp text-white shadow-elevated hover:scale-110 transition-transform animate-fade-in"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-whatsapp opacity-40 animate-ping" />
    </a>
  );
}
