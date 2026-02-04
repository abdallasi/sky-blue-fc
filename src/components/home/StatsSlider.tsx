import { Shield, Trophy, Target, TrendingUp, Zap } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';
import { useRef, useState, useEffect } from 'react';

const icons = [Shield, Zap, Trophy, TrendingUp, Target];
const colors = [
  'from-[hsl(var(--primary-blue))] to-[hsl(var(--royal-blue))]',
  'from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))]',
  'from-amber-500 to-orange-500',
  'from-violet-500 to-purple-500',
  'from-rose-500 to-pink-500',
];

const AnimatedStatCard = ({ 
  stat, 
  index, 
  Icon, 
  color 
}: { 
  stat: { value: string; label: string }; 
  index: number; 
  Icon: typeof Shield; 
  color: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Extract numeric value
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
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex-shrink-0 w-[300px] snap-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden rounded-3xl p-8 text-center bg-white border border-border/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
        {/* Gradient Top Accent */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`} />
        
        {/* Glow Effect on Hover */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${color} blur-3xl -z-10`} style={{ transform: 'scale(0.5)' }} />
        
        {/* Icon */}
        <div className={`w-18 h-18 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-9 h-9 text-white" />
        </div>
        
        {/* Animated Value */}
        <div 
          ref={countRef as React.RefObject<HTMLDivElement>}
          className="text-5xl font-black text-foreground mb-3 tracking-tight"
        >
          {formattedCount}
        </div>
        
        {/* Label */}
        <div className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">
          {stat.label}
        </div>
      </div>
    </div>
  );
};

export const StatsSlider = () => {
  const { content } = useContent();
  const { stats } = content;

  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="container-premium mb-16">
        <div className="text-center">
          <span className="text-label">Performance</span>
          <h2 className="heading-section mt-4 text-gradient-blue">Club Statistics</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Numbers that tell the story of our relentless pursuit of excellence.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="flex gap-6 px-6 sm:px-8 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
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

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-8 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-8 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
