import { Shield, Trophy, Target, TrendingUp, Zap } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useState, useEffect } from 'react';

const icons = [Shield, Zap, Trophy, TrendingUp, Target];
const colors = [
  'from-[hsl(var(--royal-blue))] to-[hsl(var(--electric-cyan))]',
  'from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))]',
  'from-amber-400 to-orange-500',
  'from-violet-500 to-fuchsia-500',
  'from-rose-500 to-pink-500',
];

const AnimatedStatCard = ({
  stat,
  index,
  Icon,
  color,
}: {
  stat: { value: string; label: string };
  index: number;
  Icon: typeof Shield;
  color: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const numericMatch = stat.value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = stat.value.replace(/^\d+/, '');

  const { formattedCount, ref: countRef } = useCountUp({
    end: numericValue,
    duration: 2000,
    delay: index * 150,
    suffix,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex-shrink-0 w-[260px] sm:w-[300px] snap-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl p-7 sm:p-8 text-center bg-white/[0.03] border border-white/10 backdrop-blur-xl hover:border-[hsl(var(--electric-cyan))]/40 hover:-translate-y-2 transition-all duration-500 group">
        {/* Top accent line */}
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color}`} />

        {/* Glow */}
        <div
          className={`absolute -inset-1 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 bg-gradient-to-br ${color} -z-10`}
        />

        {/* Watermark number */}
        <div className="absolute -right-3 -top-3 text-7xl font-black text-white/[0.04] select-none pointer-events-none">
          0{index + 1}
        </div>

        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </div>

        <div
          ref={countRef as React.RefObject<HTMLDivElement>}
          className="relative text-4xl sm:text-5xl font-black text-white mb-2 sm:mb-3 tracking-tight"
        >
          {formattedCount}
        </div>

        <div className="relative text-[11px] sm:text-xs text-white/60 font-semibold uppercase tracking-[0.18em]">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

export const StatsSlider = () => {
  const { content } = useContent();
  const { stats } = content;

  const tickerItems = ['UNBEATEN', '298 GOALS', 'U-17 CALL-UPS', 'NLO 2025', 'PRIDE OF AMTAY', 'KANO BORN'];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[hsl(var(--midnight-blue))]">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--midnight-blue))] via-[hsl(217,100%,12%)] to-[hsl(var(--midnight-blue))]" />
      <div className="absolute inset-0 bg-noise opacity-40" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] bg-[hsl(var(--electric-cyan))]/10 rounded-full blur-[120px]" />

      {/* Top marquee ticker */}
      <div className="relative border-y border-white/10 bg-white/[0.02] py-3 mb-16 sm:mb-20 overflow-hidden">
        <div className="flex gap-10 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-10 text-white/70 font-black uppercase tracking-[0.3em] text-sm sm:text-base">
              <span>{item}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--electric-cyan))]" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative container-premium mb-12 sm:mb-16">
        <div className="text-center">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))]">
            Performance
          </span>
          <h2 className="mt-3 sm:mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white">
            By <span className="bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] bg-clip-text text-transparent">The Numbers</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 mt-3 sm:mt-4 max-w-xl mx-auto px-4">
            Numbers that tell the story of our relentless pursuit of excellence.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="flex gap-5 sm:gap-6 px-5 sm:px-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <AnimatedStatCard
                key={stat.label}
                stat={stat}
                index={index}
                Icon={Icon}
                color={color}
              />
            );
          })}
        </div>

        <div className="absolute left-0 top-0 bottom-8 w-12 sm:w-24 bg-gradient-to-r from-[hsl(var(--midnight-blue))] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-8 w-12 sm:w-24 bg-gradient-to-l from-[hsl(var(--midnight-blue))] to-transparent pointer-events-none" />
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};
