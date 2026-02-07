import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Shield, Zap, Trophy, TrendingUp, Target, BarChart3 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const statIcons = [Shield, Zap, Trophy, TrendingUp, Target];
const statDescriptions = ['Defensive excellence', 'Dominant run', 'Winners mentality', 'Consistent success', 'Attacking power'];

const seasonBreakdown = [
  { season: '2023/24', wins: 24, draws: 6, losses: 4, goalsFor: 72, goalsAgainst: 18 },
  { season: '2022/23', wins: 22, draws: 8, losses: 4, goalsFor: 68, goalsAgainst: 22 },
];

const AnimatedStatCard = ({ stat, index, isVisible }: { stat: any; index: number; isVisible: boolean }) => {
  const Icon = stat.icon;
  const numMatch = stat.value.match(/^(\d+)/);
  const numVal = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = stat.value.replace(/^\d+/, '');
  const { formattedCount, ref } = useCountUp({ end: numVal, duration: 2000, delay: index * 200, suffix });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`card-stat group hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[hsl(var(--primary-blue))] transition-colors">
        <Icon className="w-8 h-8 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
      </div>
      <div className="text-4xl font-black text-[hsl(var(--midnight-blue))] mb-2">{formattedCount}</div>
      <div className="font-semibold text-foreground mb-1">{stat.label}</div>
      <div className="text-sm text-muted-foreground">{stat.description}</div>
    </div>
  );
};

const Stats = () => {
  const { content } = useContent();
  const statsAnim = useScrollAnimation({ threshold: 0.1 });
  const seasonAnim = useScrollAnimation({ threshold: 0.1 });
  const visualAnim = useScrollAnimation({ threshold: 0.2 });

  const mainStats = content.stats.map((stat, index) => ({
    ...stat,
    icon: statIcons[index] || Target,
    description: statDescriptions[index] || '',
  }));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero-dynamic text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px] animate-float" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-premium relative">
          <span className="text-label animate-fade-up">Performance</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            Club Statistics
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2">
            Numbers that tell the story of AMTAY FC's rise to dominance.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Stats Grid */}
      <section className="section-padding">
        <div className="container-premium">
          <div ref={statsAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {mainStats.map((stat, index) => (
              <AnimatedStatCard key={index} stat={stat} index={index} isVisible={statsAnim.isVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* Season Breakdown */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label-blue">Performance</span>
            <h2 className="heading-section mt-2">Season Breakdown</h2>
          </div>

          <div ref={seasonAnim.ref as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-8">
            {seasonBreakdown.map((season, index) => (
              <div
                key={index}
                className={`card-premium hover-lift transition-all duration-700 ${seasonAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{season.season}</h3>
                  <BarChart3 className="w-6 h-6 text-[hsl(var(--royal-blue))]" />
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-xl bg-green-500/10">
                    <div className="text-2xl font-black text-green-600">{season.wins}</div>
                    <div className="text-xs text-green-600/70 uppercase font-semibold">Wins</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-amber-500/10">
                    <div className="text-2xl font-black text-amber-600">{season.draws}</div>
                    <div className="text-xs text-amber-600/70 uppercase font-semibold">Draws</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-red-500/10">
                    <div className="text-2xl font-black text-red-600">{season.losses}</div>
                    <div className="text-xs text-red-600/70 uppercase font-semibold">Losses</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-[hsl(var(--primary-blue))]" />
                    <span className="text-sm text-muted-foreground">Goals Scored:</span>
                    <span className="font-bold">{season.goalsFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[hsl(var(--royal-blue))]" />
                    <span className="text-sm text-muted-foreground">Goals Against:</span>
                    <span className="font-bold">{season.goalsAgainst}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Stats */}
      <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[150px]" />
        <div className="container-premium relative">
          <div className="text-center mb-16">
            <span className="text-label">At a Glance</span>
            <h2 className="heading-section mt-2">Performance Overview</h2>
          </div>

          <div ref={visualAnim.ref as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 gap-8">
            {/* Win Rate Visual */}
            <div className={`card-glass transition-all duration-1000 ${visualAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <h3 className="text-xl font-bold mb-6">Win Rate</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="url(#winGradient)" strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${68 * 2.83} ${100 * 2.83}`}
                    className={`transition-all duration-2000 ${visualAnim.isVisible ? '' : 'opacity-0'}`}
                  />
                  <defs>
                    <linearGradient id="winGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(168, 100%, 50%)" />
                      <stop offset="100%" stopColor="hsl(214, 100%, 50%)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black neon-text">68%</span>
                </div>
              </div>
            </div>

            {/* Goals Breakdown */}
            <div className={`card-glass transition-all duration-1000 delay-200 ${visualAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <h3 className="text-xl font-bold mb-6">Goal Distribution</h3>
              <div className="space-y-6">
                {[
                  { label: 'Goals Scored', value: 298, pct: '100%', color: 'from-[hsl(var(--primary-blue))] to-[hsl(var(--royal-blue))]' },
                  { label: 'Clean Sheets', value: 310, pct: '85%', color: 'from-emerald-500 to-emerald-600' },
                  { label: 'Unbeaten Streak', value: 120, pct: '60%', color: 'from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))]' },
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.label}</span>
                      <span className="font-bold">{item.value}</span>
                    </div>
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1500`}
                        style={{ width: visualAnim.isVisible ? item.pct : '0%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stats;
