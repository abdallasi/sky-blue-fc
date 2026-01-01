import { Shield, Trophy, Target, TrendingUp, Zap } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const icons = [Shield, Zap, Trophy, TrendingUp, Target];
const colors = [
  'from-[hsl(var(--primary-blue))] to-[hsl(var(--royal-blue))]',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-violet-500 to-purple-500',
  'from-rose-500 to-pink-500',
];

export const StatsSlider = () => {
  const { content } = useContent();
  const { stats } = content;

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      <div className="container-premium mb-14">
        <div className="text-center">
          <span className="text-label">Performance</span>
          <h2 className="heading-section mt-3 text-gradient-blue">Club Statistics</h2>
        </div>
      </div>

      {/* Horizontal Scroll Container - Apple Fitness Style */}
      <div className="relative">
        <div className="flex gap-5 px-5 sm:px-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];
            const color = colors[index % colors.length];
            return (
              <div
                key={stat.label}
                className="flex-shrink-0 w-[280px] snap-center"
              >
                <div className="relative overflow-hidden rounded-3xl p-7 text-center bg-white border border-border/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                  {/* Gradient Background Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${color}`} />
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-5xl font-black text-foreground mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gradient Fade Edges */}
        <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
