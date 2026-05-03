const builders = [
  "BuildCo",
  "UrbanWorks",
  "Coastal Group",
  "Stratton Homes",
  "Northline Constructions",
  "Apex Builders",
  "Greenfield Co",
];

export function Builders() {
  return (
    <section className="py-16 border-y bg-secondary/40 overflow-hidden">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by Builders & Contractors
        </p>

        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-marquee gap-14">
            {[...builders, ...builders].map((b, index) => (
              <span
                key={index}
                className="
                  font-display
                  font-bold
                  text-lg
                  md:text-2xl
                  text-foreground/40
                  hover:text-primary
                  transition-colors
                "
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}