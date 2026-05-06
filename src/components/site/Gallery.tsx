import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { siteConfig } from "@/config/siteConfig";

const items = siteConfig.gallery;

const gallerySizes: Record<
  string,
  {
    figure: string;
    image: string;
  }
> = {
  small: {
    figure: "",
    image: "aspect-square",
  },
  medium: {
    figure: "",
    image: "aspect-[4/3]",
  },
  large: {
    figure: "sm:col-span-2 lg:col-span-2",
    image: "aspect-[16/9]",
  },
  normal: {
    figure: "",
    image: "aspect-[4/3]",
  },
  square: {
    figure: "",
    image: "aspect-square",
  },
  tall: {
    figure: "",
    image: "aspect-[3/4]",
  },
  wide: {
    figure: "sm:col-span-2",
    image: "aspect-[16/7]",
  },
};

function getGallerySize(item: (typeof items)[number]) {
  if ("size" in item && item.size && gallerySizes[item.size]) {
    return gallerySizes[item.size];
  }

  if ("wide" in item && item.wide) {
    return gallerySizes.wide;
  }

  if ("tall" in item && item.tall) {
    return gallerySizes.tall;
  }

  return gallerySizes.medium;
}

export function Gallery({ heading = true }: { heading?: boolean }) {
  const [selectedItem, setSelectedItem] = useState<(typeof items)[number] | null>(null);

  useEffect(() => {
    if (!selectedItem) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedItem(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <div className="max-w-2xl mb-12">
            <p className="text-black font-semibold uppercase tracking-widest text-xs mb-3">
              Our work
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-balance text-black">
              Recent projects across Perth & WA
            </h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, idx) => {
            const size = getGallerySize(it);

            return (
              <figure
                key={idx}
                className={`relative group overflow-hidden rounded-2xl shadow-card ${size.figure}`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(it)}
                  className="block w-full cursor-zoom-in text-left"
                  aria-label={`View ${it.label} fullscreen`}
                >
                  <img
                    src={it.src}
                    alt={it.label}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${size.image}`}
                  />
                </button>
                <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                  {it.label}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.label}
          onClick={() => setSelectedItem(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedItem(null)}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gray-800 text-white transition hover:bg-gray-700"
            aria-label="Close fullscreen image"
          >
            <X className="h-6 w-6" />
          </button>

          <figure
            className="relative max-h-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={selectedItem.src}
              alt={selectedItem.label}
              className="max-h-[82vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm font-medium text-white">
              {selectedItem.label}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
