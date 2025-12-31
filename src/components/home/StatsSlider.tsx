import { Shield, Trophy, Target, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { value: '310', label: 'Clean Sheets', icon: Shield, color: 'from-blue-500 to-blue-600' },
  { value: '120', label: 'Match Unbeaten Streak', icon: Zap, color: 'from-emerald-500 to-emerald-600' },
  { value: '98', label: 'Championships Won', icon: Trophy, color: 'from-amber-500 to-amber-600' },
  { value: '68%', label: 'Win Rate', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  { value: '298', label: 'Total Goals Scored', icon: Target, color: 'from-rose-500 to-rose-600' },
];

export const StatsSlider = () => {
  return (
    <section className="py-16 bg-muted/50 overflow-hidden">
      <div className="container-premium mb-12">
        <div className="text-center">
          <span className="text-label">Performance</span>
          <h2 className="heading-section mt-2 text-gradient-blue">Club Statistics</h2>
        </div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="flex gap-6 px-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex-shrink-0 w-72 snap-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card-stat h-full">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-4xl font-black text-amtay-midnight mb-2">
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
        <div className="absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-muted/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-muted/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
