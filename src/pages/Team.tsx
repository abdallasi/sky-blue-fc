import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';
import { PageHero } from '@/components/layout/PageHero';
import { SpotlightCarousel } from '@/components/home/SpotlightCarousel';
import { Headshot } from '@/components/team/Headshot';
import teamFallback from '@/assets/placeholder-hero-matchday.jpg';

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
      <PageHero
        eyebrow="First team"
        title="Eleven start. One club they all carry."
        subtitle="Goalkeepers to strikers, and the staff who prepare them week after week."
        image={content.images?.teamHero || teamFallback}
        imageMobile={content.images?.teamHeroMobile}
      />

      {/* 1 — Selected players */}
      <SpotlightCarousel />

      {/* 2 — Starting XI */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-label-blue">First Team</span>
            <h2 className="heading-section mt-2">Starting XI</h2>
          </div>

          <div
            ref={xiAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            {content.startingXI.map((player, index) => (
              <div
                key={index}
                className={`group relative min-h-[340px] overflow-hidden rounded-[1.25rem] bg-[hsl(var(--midnight-blue))] p-5 text-white shadow-xl transition-all duration-700 hover:-translate-y-1 sm:min-h-[390px] sm:p-7 ${xiAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <span className="pointer-events-none absolute -right-1 -top-3 select-none text-6xl font-black leading-none text-white/[0.09] sm:text-7xl">
                  {player.number}
                </span>

                {player.captain && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-[10px] font-black">
                    C
                  </span>
                )}

                <div className="relative">
                  <Headshot name={player.name} photo={player.photo} tone="dark" size="h-32 w-32 sm:h-36 sm:w-36" shape="rounded-[1.25rem]" className="shadow-2xl" />
                  <span
                    className={`mt-4 inline-block rounded-full px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] ${positionColors[player.position] || 'bg-white/10 text-white/70'}`}
                  >
                    {player.position}
                  </span>
                  <h3 className="mt-3 text-xl font-black leading-tight sm:text-2xl">{player.name}</h3>
                  <div className="mt-2 h-px w-6 bg-[hsl(var(--electric-cyan))]/70 transition-all duration-500 group-hover:w-12" />
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    {player.role || player.position}
                  </p>
                  {player.level && <p className="mt-1 text-xs font-semibold text-white/70">{player.level}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 — Notable players */}
      <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[150px]" />
        <div className="container-premium relative">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-label">Star Players</span>
            <h2 className="heading-section mt-2">Notable Players</h2>
          </div>

          <div
            ref={notableAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {content.notablePlayers.map((player, index) => (
              <div
                key={index}
                className={`card-glass group hover:bg-white/10 transition-all duration-700 ${notableAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <Headshot name={player.name} photo={player.photo} tone="dark" size="h-28 w-28" shape="rounded-[1.25rem]" />
                    <div className="min-w-0">
                      <h3 className="font-bold text-xl mb-1 truncate">{player.name}</h3>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span>{player.age} years</span>
                        <span>•</span>
                        <span className="text-[hsl(var(--electric-cyan))] font-medium">{player.position}</span>
                      </div>
                    </div>
                  </div>
                  <Star className="w-6 h-6 shrink-0 text-amber-400" />
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

      {/* 4 — Extended squad */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-label-blue">Reserves</span>
            <h2 className="heading-section mt-2">Extended Squad</h2>
          </div>

          <div
            ref={extAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            {content.extendedSquad.map((player, index) => (
              <div
                key={index}
                className={`group flex min-h-[180px] items-center gap-5 rounded-[1.25rem] border border-border bg-card p-5 shadow-md transition-all duration-700 hover:-translate-y-1 hover:shadow-xl sm:min-h-[220px] sm:p-6 ${extAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <Headshot name={player.name} photo={player.photo} size="h-24 w-24 sm:h-28 sm:w-28" shape="rounded-[1.25rem]" className="shadow-lg" />
                <div className="min-w-0">
                  <h3 className="text-lg font-black leading-tight sm:text-xl">{player.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[hsl(var(--primary-blue))]">#{player.number}</span>
                    <span className="text-xs font-medium text-muted-foreground">{player.position}</span>
                  </div>
                  <p className="mt-2 text-xs font-medium text-muted-foreground">{player.level || player.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Leadership */}
      <section className="section-padding bg-muted/40">
        <div className="container-premium">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-label-blue">Leadership</span>
            <h2 className="heading-section mt-2">Management Team</h2>
          </div>

          <div
            ref={mgmtAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {content.management.map((member, index) => (
              <div
                key={index}
                className={`group relative min-h-[250px] overflow-hidden rounded-[1.25rem] border border-border bg-card p-6 shadow-md transition-all duration-700 hover:-translate-y-1 hover:shadow-xl sm:min-h-[290px] sm:p-8 ${mgmtAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <Headshot name={member.name} photo={member.photo} size="h-28 w-28 sm:h-32 sm:w-32" shape="rounded-[1.25rem]" className="shadow-lg" />
                  <div className="min-w-0">
                    <h3 className="text-xl font-black leading-tight sm:text-2xl">{member.name}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--royal-blue))]">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="mt-5 h-px w-full bg-border" />
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Official credential · AMTAY FC
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
