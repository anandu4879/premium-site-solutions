import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Richard Gordon",
    role: "Director of Baldvis Builder",
    text: `I am pleased to provide this reference for BJ & R Maintenance. Having worked closely with our team for over 12 years, they have proven to be a dependable partner across numerous projects. They consistently handle everything from routine site cleans to complex maintenance tasks with remarkable speed and attention to detail. B&J Maintenance stands out for their proactive "can-do" attitude and their ability to deliver high-quality results under tight deadlines. Their reliability and professional integrity have made them an invaluable asset to our operations. I recommend BJ&R Maintenance without reservation to anyone seeking a dedicated and efficient contractor.`},
  {
    name: "Tom Crackel ",
    role: "Construction Supervisor",
    text: `BJ and his team have been crucial to the successful completion of numerous projects across Perth that I have been involved with. He is responsive, reliable, and professional in the way he conducts himself onsite and with me as a building supervisor. I am consistently surprised at how they can approach sometimes quite difficult tasks and move through them as if they aren’t a problem. The service that BJ and his team offer simply makes my life so much easier. I have had the pleasure of working with BJ for number of years and I plan to continue this working relationship for as long as I’m in the industry.`
  },
  {
    name: "Fred Ha",
    role: "Construction Supervisor",
    text: `BJ&R Maintenance Pty Ltd is highly recommended if you are chasing up any manual handling works / minor maintenance items. BJ and his boys are very reliable, not missing any tasks given (even sometimes they go extra miles), and they showed up on time as they promised. My sites are always cleaned and well maintained thanks to BJ and his boys.`},
  {
    name: "Louie Kajmakoski",
    role: "Project Manager at TRENDSETER",
    text: `I will only use BJ labour hire for my all building works, always on time to do the job, best workers in WA very professional at what they do not just labour work also attend defects items for hand overs etc - no job is too big for them - always attend my jobs even if I organise last minute call ups BJ will go out of his way to help me out with whatever I need. Highly recommend them I do not use any other labour hire as they can not meet there qualifications.`
  },
  {
    name: "Bill Armaro",
    role: "Construction Supervisor at Averna Homes",
    text: `BJ and the boys are always willing and able to tackle all aspects of site works. Professional and knowledgeable. No matter what difficulty job I ask of them it gets done right and quickly. Best in the business 👌`
  },
  {
    name: "Dave ",
    role: " Site Supervisor at Valento Homes",
    text: `I have always found that (bj and team) are always on time very obliging when you book them in. They listen to what you have to say do the work you have outlined and do in the time frame that you want. Very good pricing tidy and are allways a pleasure to work with. I have had BJ on my sites for the last 10 years and wouldn't change a thing`
  },
];

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.8;
    let direction = 1;
    let animationId: number;

    const autoScroll = () => {
      if (!container) return;

      if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
        direction = -1;
      } else if (container.scrollLeft <= 0) {
        direction = 1;
      }

      container.scrollLeft += direction * scrollSpeed;
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-x">
        <div className="max-w-2xl mb-14">
          <p className="text-primary-glow font-semibold uppercase tracking-widest text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">What our clients say</h2>
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="shrink-0 w-[85vw] md:w-[400px] rounded-2xl bg-background/5 backdrop-blur p-7 border border-background/10 relative"
            >
              <Quote className="h-8 w-8 text-primary-glow opacity-60" />
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
                ))}
              </div>
              <p className="mt-4 text-background/90 leading-relaxed">"{r.text}"</p>
              <div className="mt-6 pt-4 border-t border-background/10">
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-background/60">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
