import { Link } from 'react-router-dom';
import { ArrowUpRight, Play } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';
import heroFallback from '@/assets/placeholder-hero-matchday.jpg';

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
  const heroImage = content.images?.heroBackground || heroFallback;

  return (
    <section className="relative bg-background pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
      {/* Whisper-soft editorial wash — keeps the page bright, never muddy */}
      <div className="pointer-events-none absolute -top-40 -right-32 w-[620px] h-[620px] rounded-full bg-[hsl(var(--royal-blue))]/[0.05] blur-[160px]" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-[hsl(var(--electric-cyan))]/[0.06] blur-[150px]" />

      <div className="container-premium relative">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 sm:gap-4 animate-fade-up">
          <span className="h-[2px] w-8 sm:w-12 bg-[hsl(var(--royal-blue))]" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
            {hero.badge}
          </span>
        </div>

        {/* Editorial split: type left, breathing room right */}
        <div className="mt-8 sm:mt-10 grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h1 className="animate-fade-up-delay-1 text-[2.75rem] leading-[0.92] sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-black tracking-[-0.045em] text-foreground">
              {hero.headline}
            </h1>
            <p className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground animate-fade-up-delay-2">
              {hero.subheadline}
            </p>
          </div>

          <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-border animate-fade-up-delay-3">
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-foreground/80">
              120 matches unbeaten. 298 goals. Four players called into Nigeria's U-17 screening.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/team"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[hsl(var(--midnight-blue))] text-white text-sm font-bold tracking-wide transition-all duration-300 hover:bg-[hsl(var(--primary-blue))] hover:-translate-y-0.5"
              >
                {hero.button1}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border bg-background text-sm font-bold tracking-wide text-foreground transition-all duration-300 hover:border-[hsl(var(--royal-blue))] hover:text-[hsl(var(--primary-blue))]"
              >
                <Play className="w-3.5 h-3.5" />
                {hero.button2}
              </Link>
            </div>
          </div>
        </div>

        {/* Master shot — full clarity, no blur, no colour wash */}
        <figure className="mt-12 sm:mt-16 relative animate-fade-up-delay-4">
          <div className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-muted shadow-[0_40px_80px_-40px_hsl(217_100%_12%/0.35)]">
            <img
              src={heroImage}
              alt="AMTAY FC matchday"
              width={1920}
              height={1080}
              loading="eager"
              className="w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] object-cover object-center"
            />
            {/* Caption plate only — the photograph itself stays untouched */}
            <figcaption className="absolute bottom-0 left-0 right-0 flex flex-wrap items-center justify-between gap-2 px-5 sm:px-8 py-4 sm:py-5 bg-gradient-to-t from-[hsl(var(--midnight-blue))]/85 to-transparent">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white">
                Matchday · Kano, Nigeria
              </span>
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/80">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--electric-cyan))] animate-pulse" />
                International League
              </span>
            </figcaption>
          </div>
        </figure>

        {/* Stat rail with hairline dividers */}
        <div className="mt-12 sm:mt-16 flex flex-wrap divide-x divide-border border-t border-border pt-8 sm:pt-10">
          <HeroStat value={stats[3]?.value || '68%'} label="Win Rate" delay={0} />
          <HeroStat value={stats[4]?.value || '298'} label="Goals Scored" delay={150} />
          <HeroStat value={stats[1]?.value || '120'} label="Match Streak" delay={300} />
          <HeroStat value="4" label="U-17 Call-ups" delay={450} />
        </div>
      </div>
    </section>
  );
};
