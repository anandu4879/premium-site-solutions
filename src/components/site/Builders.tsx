import { siteConfig } from "@/config/siteConfig";

const builders = siteConfig.builders;

export function Builders() {
  return (
    <section className="py-16 border-y bg-secondary/40 overflow-hidden">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by Builders & Contractors
        </p>

        <div className="relative overflow-hidden">
          <div className="flex items-center whitespace-nowrap animate-marquee gap-10 md:gap-14">
            {[...builders, ...builders].map((builder, index) => (
              <div
                key={index}
                className="
                  flex
                  h-16
                  w-36
                  md:h-20
                  md:w-44
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  border
                  bg-background/80
                  px-5
                  py-3
                  opacity-80
                  transition
                  hover:opacity-100
                "
              >
                <img
                  src={builder.image}
                  alt={builder.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
