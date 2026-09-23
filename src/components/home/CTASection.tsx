import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

/**
 * Closing statement: stadium floodlights instead of a flat blue banner,
 * with two direct actions rather than three summary cards.
 */
export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsVisible(true)),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[hsl(217_100%_5%)] py-20 sm:py-28">
      {/* Floodlight beams */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[520px] w-[420px] -translate-x-1/2 rotate-12 bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-transparent blur-2xl" />
        <div className="absolute -top-40 right-1/4 h-[520px] w-[420px] translate-x-1/2 -rotate-12 bg-gradient-to-b from-[hsl(var(--electric-cyan))]/15 via-[hsl(var(--royal-blue))]/5 to-transparent blur-2xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[hsl(var(--royal-blue))]/20 blur-[120px]" />
      </div>

      <div className="container-premium relative">
        <div
          className={`max-w-3xl transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[hsl(var(--electric-cyan))]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))]">
              From Kano to the world
            </span>
          </div>

          <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
            The next name on this badge could be yours.
          </h2>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/apply"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--electric-cyan))] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--midnight-blue))] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a trial
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
            >
              Contact the technical crew
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
