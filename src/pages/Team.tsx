import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { User, Shield, Star } from 'lucide-react';

const positionColors: Record<string, string> = {
  GK: 'bg-amber-500/20 text-amber-600',
  DF: 'bg-emerald-500/20 text-emerald-600',
  RB: 'bg-emerald-500/20 text-emerald-600',
  LB: 'bg-emerald-500/20 text-emerald-600',
  CB: 'bg-emerald-500/20 text-emerald-600',
  MF: 'bg-sky-500/20 text-sky-600',
  CM: 'bg-sky-500/20 text-sky-600',
  DM: 'bg-sky-500/20 text-sky-600',
  FW: 'bg-rose-500/20 text-rose-600',
  RW: 'bg-rose-500/20 text-rose-600',
  LW: 'bg-rose-500/20 text-rose-600',
  ST: 'bg-rose-500/20 text-rose-600',
};

const Team = () => {
  const { content } = useContent();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">The Squad</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-in">
            Meet the Team
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            The dedicated players and management driving AMTAY FC's success.
          </p>
        </div>
      </section>

      {/* Management Team */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Leadership</span>
            <h2 className="heading-section mt-2">Management Team</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.management.map((member, index) => (
              <div key={index} className="card-premium text-center group">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amtay-blue to-amtay-midnight flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-amtay-royal font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Starting XI */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">First Team</span>
            <h2 className="heading-section mt-2">Starting XI</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {content.startingXI.map((player, index) => (
              <div key={index} className="card-premium group relative overflow-hidden">
                {player.captain && (
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">C</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amtay-blue to-amtay-midnight flex items-center justify-center">
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
            <span className="text-label">Reserves</span>
            <h2 className="heading-section mt-2">Extended Squad</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.extendedSquad.map((player, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amtay-blue/10 flex items-center justify-center">
                  <span className="text-lg font-bold text-amtay-blue">{player.number}</span>
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
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label text-amtay-royal">Star Players</span>
            <h2 className="heading-section mt-2">Notable Players</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.notablePlayers.map((player, index) => (
              <div key={index} className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-xl mb-1">{player.name}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span>{player.age} years</span>
                      <span>•</span>
                      <span className="text-amtay-royal font-medium">{player.position}</span>
                    </div>
                  </div>
                  <Star className="w-6 h-6 text-amber-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  <div className="text-center">
                    <div className="text-2xl font-black">{player.matches}</div>
                    <div className="text-xs text-white/60 uppercase">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amtay-royal">{player.goals}</div>
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
