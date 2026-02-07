import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { User, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const positionColors: Record<string, string> = {
  GK: 'bg-amber-500/20 text-amber-400',
  DF: 'bg-emerald-500/20 text-emerald-400',
  RB: 'bg-emerald-500/20 text-emerald-400',
  LB: 'bg-emerald-500/20 text-emerald-400',
  CB: 'bg-emerald-500/20 text-emerald-400',
  MF: 'bg-sky-500/20 text-sky-400',
  CM: 'bg-sky-500/20 text-sky-400',
  DM: 'bg-sky-500/20 text-sky-400',
  FW: 'bg-rose-500/20 text-rose-400',
  RW: 'bg-rose-500/20 text-rose-400',
  LW: 'bg-rose-500/20 text-rose-400',
  ST: 'bg-rose-500/20 text-rose-400',
};

const AnimatedStat = ({ value, label }: { value: number; label: string }) => {
  const { formattedCount, ref } = useCountUp({ end: value, duration: 1500 });
  return (
    <div className="text-center" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="text-2xl font-black">{formattedCount}</div>
      <div className="text-xs text-white/60 uppercase">{label}</div>
    </div>
  );
};

const Team = () => {
  const { content } = useContent();
  const mgmtAnim = useScrollAnimation({ threshold: 0.1 });
  const xiAnim = useScrollAnimation({ threshold: 0.1 });
  const extAnim = useScrollAnimation({ threshold: 0.1 });
  const notableAnim = useScrollAnimation({ threshold: 0.1 });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero-dynamic text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/3 left-1/6 w-[300px] h-[300px] bg-[hsl(var(--electric-cyan))]/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-premium relative">
          <span className="text-label animate-fade-up">The Squad</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            Meet the Team
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2 leading-relaxed">
            The dedicated players and management driving AMTAY FC's success.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Management Team */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label-blue">Leadership</span>
            <h2 className="heading-section mt-2">Management Team</h2>
          </div>

          <div ref={mgmtAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.management.map((member, index) => (
              <div
                key={index}
                className={`card-premium text-center group transition-all duration-700 ${mgmtAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[hsl(var(--royal-blue))]/20 transition-shadow">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-[hsl(var(--royal-blue))] font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starting XI */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label-blue">First Team</span>
            <h2 className="heading-section mt-2">Starting XI</h2>
          </div>

          <div ref={xiAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.startingXI.map((player, index) => (
              <div
                key={index}
                className={`card-premium card-3d group relative overflow-hidden transition-all duration-700 ${xiAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {player.captain && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center animate-pulse-glow">
                      <span className="text-xs font-bold text-white">C</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[hsl(var(--royal-blue))]/30 transition-shadow">
                    <span className="text-2xl font-black text-white">{player.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{player.name}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${positionColors[player.position] || 'bg-muted'}`}>
                      {player.role || player.position}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Squad */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label-blue">Reserves</span>
            <h2 className="heading-section mt-2">Extended Squad</h2>
          </div>

          <div ref={extAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.extendedSquad.map((player, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted hover-lift transition-all duration-700 ${extAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-[hsl(var(--primary-blue))]">{player.number}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{player.name}</h3>
                  <span className={`text-xs font-medium ${positionColors[player.position] || 'text-muted-foreground'}`}>
                    {player.position}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notable Players */}
      <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[150px]" />
        <div className="container-premium relative">
          <div className="text-center mb-16">
            <span className="text-label">Star Players</span>
            <h2 className="heading-section mt-2">Notable Players</h2>
          </div>

          <div ref={notableAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.notablePlayers.map((player, index) => (
              <div
                key={index}
                className={`card-glass group hover:bg-white/10 transition-all duration-700 ${notableAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span>{player.age} years</span>
                      <span>•</span>
                      <span className="text-[hsl(var(--electric-cyan))] font-medium">{player.position}</span>
                    </div>
                  </div>
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <AnimatedStat value={player.matches} label="Matches" />
                  <div className="text-center">
                    <div className="text-2xl font-black text-[hsl(var(--electric-cyan))]">{player.goals}</div>
                    <div className="text-xs text-white/60 uppercase">Goals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black">{player.assists}</div>
                    <div className="text-xs text-white/60 uppercase">Assists</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
