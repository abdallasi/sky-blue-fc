import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';
import heroFallback from '@/assets/placeholder-hero-matchday.jpg';
import heroMobileFallback from '@/assets/placeholder-trials-portrait.jpg';

const HeroStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, '');
  const { formattedCount, ref } = useCountUp({ end: numericValue, duration: 1800, delay, suffix });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="px-5 sm:px-8 first:pl-0 last:pr-0">
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-foreground">
        {formattedCount}
      </div>
      <div className="mt-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  const { content } = useContent();
  const { hero, stats } = content;
  const desktop = content.images?.heroBackground || heroFallback;
  const mobile = content.images?.heroBackgroundMobile || content.images?.heroBackground || heroMobileFallback;

  return (
    <>
      {/* Picture first: the club is seen before it is read */}
      <section className="relative h-[88svh] min-h-[560px] w-full overflow-hidden bg-[hsl(var(--midnight-blue))]">
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
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[hsl(217_100%_8%)] via-[hsl(217_100%_8%)]/70 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-premium pb-10 sm:pb-14 lg:pb-16">
            <div className="flex items-center gap-3 sm:gap-4 animate-fade-up">
              <span className="h-[2px] w-8 sm:w-12 bg-[hsl(var(--electric-cyan))]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">
                {hero.badge}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-[2.6rem] leading-[0.92] sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-black tracking-[-0.045em] text-white animate-fade-up-delay-1">
              {hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-white/75 animate-fade-up-delay-2">
              {hero.subheadline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-up-delay-3">
              <Link
                to="/team"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-[hsl(var(--midnight-blue))] text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5"
              >
                {hero.button1}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/apply"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-white/30 text-white text-sm font-bold tracking-wide backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/60"
              >
                {hero.button2}
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 right-5 hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white/50">
          Scroll
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </section>

      {/* The numbers that back the picture */}
      <section className="bg-background">
        <div className="container-premium">
          <div className="flex flex-wrap divide-x divide-border py-10 sm:py-12">
            <HeroStat value={stats[3]?.value || '68%'} label="Win Rate" delay={0} />
            <HeroStat value={stats[4]?.value || '298'} label="Goals Scored" delay={150} />
            <HeroStat value={stats[1]?.value || '120'} label="Unbeaten Run" delay={300} />
            <HeroStat value="4" label="U-17 Call-ups" delay={450} />
          </div>
        </div>
      </section>
    </>
  );
};
