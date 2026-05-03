const builders = [
  "BuildCo", "UrbanWorks", "Coastal Group", "Stratton Homes",
  "Northline Constructions", "Apex Builders", "Greenfield Co",
];

export function Builders() {
  return (
    <section className="py-16 border-y bg-secondary/40">
      <div className="container-x">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-8">
          Trusted by Builders & Contractors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {builders.map((b) => (
            <span
              key={b}
              className="font-display font-bold text-lg md:text-xl text-foreground/40 hover:text-primary transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
