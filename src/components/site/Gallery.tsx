import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

import { siteConfig } from "@/config/siteConfig";

const items = siteConfig.gallery;

export function Gallery({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        {heading && (
          <div className="max-w-2xl mb-12">
            <p className="text-primary font-semibold uppercase tracking-widest text-xs mb-3">
              Our work
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-balance">
              Recent projects across Perth & WA
            </h2>
          </div>
        )}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((it, idx) => (
            <figure
              key={idx}
              className="mb-5 break-inside-avoid relative group overflow-hidden rounded-2xl shadow-card"
            >
              <img
                src={it.src}
                alt={it.label}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  it.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-sm font-medium translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                {it.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
