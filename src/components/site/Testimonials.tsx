import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

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
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % reviews.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  const activeReview = reviews[activeIndex];

  const showPreviousReview = () => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const showNextReview = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  const handleSwipeEnd = (x: number, y: number) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;

    if (!start) return;

    const deltaX = x - start.x;
    const deltaY = y - start.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY);

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      showNextReview();
    } else {
      showPreviousReview();
    }
  };

  return (
    <section className="py-20 md:py-28 bg-foreground text-background">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-primary-glow font-semibold uppercase tracking-widest text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-balance">What our clients say</h2>
          <p className="mt-4 text-background/70 text-lg">
            Real feedback from builders, supervisors and project teams who trust BJ & R on site.
          </p>
        </div>

        <div
          className="mx-auto w-full max-w-2xl touch-pan-y"
          onPointerDown={(event) => {
            swipeStartRef.current = {
              x: event.clientX,
              y: event.clientY,
            };
          }}
          onPointerUp={(event) => handleSwipeEnd(event.clientX, event.clientY)}
          onPointerCancel={() => {
            swipeStartRef.current = null;
          }}
        >
          <article
            className="min-h-[460px] rounded-2xl border border-background/10 bg-background/5 p-7 shadow-2xl backdrop-blur md:min-h-[430px] md:p-8"
          >
            <Quote className="h-8 w-8 text-primary-glow opacity-60" />
            <div className="flex gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-primary-glow text-primary-glow" />
              ))}
            </div>
            <p
              key={`review-${activeIndex}`}
              className="mt-5 text-background/90 leading-relaxed animate-fade-in"
            >
              "{activeReview.text}"
            </p>
            <div className="mt-6 pt-4 border-t border-background/10">
              <p className="font-semibold">{activeReview.name}</p>
              <p className="text-xs text-background/60">{activeReview.role}</p>
            </div>
          </article>

          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPreviousReview}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/15 bg-background/5 text-background transition hover:bg-background/10"
              aria-label="Show previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex justify-center gap-2">
              {reviews.map((review, index) => (
                <button
                  key={review.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-8 bg-primary-glow" : "w-2.5 bg-background/25"
                  }`}
                  aria-label={`Show review from ${review.name}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={showNextReview}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/15 bg-background/5 text-background transition hover:bg-background/10"
              aria-label="Show next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
