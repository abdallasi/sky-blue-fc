import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';

const StatCell = ({
  stat,
  index,
  wide,
}: {
  stat: { value: string; label: string };
  index: number;
  wide?: boolean;
}) => {
  const numericMatch = stat.value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = stat.value.replace(/^\d+/, '');
  const { formattedCount, ref } = useCountUp({
    end: numericValue,
    duration: 1800,
    delay: index * 120,
    suffix,
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 sm:p-8 transition-colors duration-500 hover:border-[hsl(var(--electric-cyan))]/40 ${
        wide ? 'sm:col-span-2' : ''
      }`}
    >
      <div className="absolute right-6 top-5 text-[10px] font-bold tracking-[0.2em] text-white/15">
        0{index + 1}
      </div>
      <div
        className={`font-black tracking-[-0.05em] text-white ${
          wide ? 'text-5xl sm:text-7xl' : 'text-4xl sm:text-5xl'
        }`}
      >
        {formattedCount}
      </div>
      <div className="mt-3 h-px w-8 bg-[hsl(var(--electric-cyan))]/70 transition-all duration-500 group-hover:w-14" />
      <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.24em] text-white/55">
        {stat.label}
      </div>
    </div>
  );
};

export const StatsSlider = () => {
  const { content } = useContent();
  const { stats } = content;

  const tickerItems = ['UNBEATEN', '298 GOALS', 'U-17 CALL-UPS', 'NLO 2025', 'PRIDE OF AMTAY', 'KANO BORN'];

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--midnight-blue))] py-14 sm:py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--midnight-blue))] via-[hsl(217,100%,11%)] to-[hsl(var(--midnight-blue))]" />

      {/* Ticker keeps the section alive without a headline */}
      <div className="relative mb-12 overflow-hidden border-y border-white/10 bg-white/[0.02] py-3 sm:mb-16">
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
        <div className="mb-8 flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[hsl(var(--electric-cyan))]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))]">
            Performance
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {stats.map((stat, index) => (
            <StatCell key={stat.label} stat={stat} index={index} wide={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
