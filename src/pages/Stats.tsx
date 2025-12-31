import { Layout } from '@/components/layout/Layout';
import { Shield, Zap, Trophy, TrendingUp, Target, BarChart3 } from 'lucide-react';

const mainStats = [
  { value: '310', label: 'Clean Sheets', icon: Shield, description: 'Defensive excellence' },
  { value: '120', label: 'Match Unbeaten Streak', icon: Zap, description: 'Dominant run' },
  { value: '98', label: 'Championships Won', icon: Trophy, description: 'Winners mentality' },
  { value: '68%', label: 'Win Rate', icon: TrendingUp, description: 'Consistent success' },
  { value: '298', label: 'Total Goals Scored', icon: Target, description: 'Attacking power' },
];

const seasonBreakdown = [
  { season: '2023/24', wins: 24, draws: 6, losses: 4, goalsFor: 72, goalsAgainst: 18 },
  { season: '2022/23', wins: 22, draws: 8, losses: 4, goalsFor: 68, goalsAgainst: 22 },
];

const Stats = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">Performance</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6">
            Club Statistics
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Numbers that tell the story of AMTAY FC's rise to dominance.
          </p>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {mainStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card-premium text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-amtay-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amtay-blue transition-colors">
                    <Icon className="w-8 h-8 text-amtay-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-4xl font-black text-amtay-midnight mb-2">{stat.value}</div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Season Breakdown */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Performance</span>
            <h2 className="heading-section mt-2">Season Breakdown</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {seasonBreakdown.map((season, index) => (
              <div key={index} className="card-premium">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold">{season.season}</h3>
                  <BarChart3 className="w-6 h-6 text-amtay-royal" />
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
                    <Target className="w-4 h-4 text-amtay-blue" />
                    <span className="text-sm text-muted-foreground">Goals Scored:</span>
                    <span className="font-bold">{season.goalsFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amtay-royal" />
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
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label text-amtay-royal">At a Glance</span>
            <h2 className="heading-section mt-2">Performance Overview</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Win Rate Visual */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Win Rate</h3>
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#winGradient)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${68 * 2.83} ${100 * 2.83}`}
                  />
                  <defs>
                    <linearGradient id="winGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0058FF" />
                      <stop offset="100%" stopColor="#0036A3" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-black">68%</span>
                </div>
              </div>
            </div>

            {/* Goals Breakdown */}
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-6">Goal Distribution</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Goals Scored</span>
                    <span className="font-bold">298</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amtay-blue to-amtay-royal rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Clean Sheets</span>
                    <span className="font-bold">310</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Unbeaten Streak</span>
                    <span className="font-bold">120</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Stats;
