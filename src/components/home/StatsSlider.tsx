import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';

const parse = (value: string) => {
  const m = value.match(/^(\d+)/);
  return { num: m ? parseInt(m[1]) : 0, suffix: value.replace(/^\d+/, '') };
};

/** Hero metric: spans the full width with a glowing progress bar. */
const HeroStat = ({ stat }: { stat: { value: string; label: string } }) => {
  const { num, suffix } = parse(stat.value);
  const { formattedCount, ref } = useCountUp({ end: num, duration: 1800, suffix });
  const pct = suffix.includes('%') ? Math.min(num, 100) : 100;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="col-span-2 relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[hsl(var(--electric-cyan))]/10 blur-3xl" />
      <div className="relative">
        <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-white/50">{stat.label}</div>
        <div className="mt-2 text-6xl font-black tracking-[-0.055em] text-white sm:text-7xl">{formattedCount}</div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] shadow-[0_0_16px_hsl(168_100%_50%/0.5)] transition-[width] duration-[1600ms] ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/** Compact square tile — two per row on mobile. */
const MiniStat = ({ stat, index }: { stat: { value: string; label: string }; index: number }) => {
  const { num, suffix } = parse(stat.value);
  const { formattedCount, ref } = useCountUp({ end: num, duration: 1600, delay: index * 120, suffix });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="group relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] p-5 transition-colors duration-500 hover:border-[hsl(var(--electric-cyan))]/40 sm:p-6"
    >
      <div className="absolute right-4 top-3 text-[9px] font-bold tracking-[0.2em] text-white/15">
        0{index + 2}
      </div>
      <div className="text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{formattedCount}</div>
      <div className="mt-2.5 h-px w-6 bg-[hsl(var(--electric-cyan))]/70 transition-all duration-500 group-hover:w-12" />
      <div className="mt-2.5 text-[9px] font-bold uppercase leading-snug tracking-[0.2em] text-white/55 sm:text-[10px]">
        {stat.label}
      </div>
    </div>
  );
};

export const StatsSlider = () => {
  const { content } = useContent();
  const { stats } = content;
  if (!stats?.length) return null;

  const [hero, ...rest] = stats;
  const tickerItems = ['UNBEATEN', '298 GOALS', 'U-17 CALL-UPS', 'NLO 2025', 'PRIDE OF AMTAY', 'KANO BORN'];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--midnight-blue))] py-12 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--midnight-blue))] via-[hsl(217,100%,11%)] to-[hsl(var(--midnight-blue))]" />

      {/* Ticker keeps the section alive without a headline */}
      <div className="relative mb-10 overflow-hidden border-y border-white/10 bg-white/[0.02] py-3 sm:mb-16">
        <div className="flex gap-10 whitespace-nowrap animate-[marquee_30s_linear_infinite]">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-10 text-sm font-black uppercase tracking-[0.3em] text-white/60 sm:text-base"
            >
              <span>{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--electric-cyan))]" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-premium relative">
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="h-[2px] w-8 bg-[hsl(var(--electric-cyan))]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))]">
            Performance
          </span>
        </div>

        {/* Asymmetric bento: hero metric, then a 2x2 grid of tiles on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <HeroStat stat={hero} />
          {rest.map((stat, index) => (
            <MiniStat key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
