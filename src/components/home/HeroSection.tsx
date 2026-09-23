import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import heroFallback from '@/assets/placeholder-hero-matchday.jpg';
import heroMobileFallback from '@/assets/placeholder-trials-portrait.jpg';

export const HeroSection = () => {
  const { content } = useContent();
  const { hero } = content;
  const desktop = content.images?.heroBackground || heroFallback;
  const mobile = content.images?.heroBackgroundMobile || content.images?.heroBackground || heroMobileFallback;

  return (
    /* Picture only: the club is seen, not read */
    <section className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-[hsl(var(--midnight-blue))]">
      <picture>
        <source media="(min-width: 768px)" srcSet={desktop} />
        <img
          src={mobile}
          alt="AMTAY FC matchday"
          width={1920}
          height={1080}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* One gradient, bottom only — the photograph stays sharp */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(217_100%_8%)]/90 via-[hsl(217_100%_8%)]/40 to-transparent" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="container-premium pb-12 sm:pb-16">
          <div className="flex items-center gap-3 sm:gap-4 animate-fade-up">
            <span className="h-[2px] w-8 sm:w-12 bg-[hsl(var(--electric-cyan))]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.32em] text-white/85">
              {hero.badge}
            </span>
          </div>

          <div className="mt-6 animate-fade-up-delay-1">
            <Link
              to="/team"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[hsl(var(--midnight-blue))]"
            >
              {hero.button1}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
        Scroll
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
};
