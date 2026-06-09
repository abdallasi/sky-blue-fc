import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Trophy, Target } from 'lucide-react';
import buhariAsset from '@/assets/buhari-shaho.jpg.asset.json';

const matches = [
  { goals: 2, opponent: 'Sumaila Strikers FC' },
  { goals: 2, opponent: 'Kedco FC' },
  { goals: 1, opponent: 'Kano Stars FC' },
  { goals: 2, opponent: 'Clever FC' },
];

export const FeaturedPlayer = () => {
  const anim = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--electric-cyan))]/10 rounded-full blur-[150px]" />

      <div ref={anim.ref as React.RefObject<HTMLDivElement>} className="container-premium relative">
        <div className="text-center mb-12">
          <span className="text-label">Pride of AMTAY</span>
          <h2 className="heading-section mt-2">NLO Top Performer</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className={`transition-all duration-1000 ${anim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[hsl(var(--royal-blue))]/30 group">
              <img
                src={buhariAsset.url}
                alt="Buhari Sahi Shaho — NLO Top Performer"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${anim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-[hsl(var(--electric-cyan))]" />
              <span className="text-[hsl(var(--electric-cyan))] font-semibold tracking-wider uppercase text-sm">2025 NLO Season</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-black mb-2">Buhari Sahi Shaho</h3>
            <p className="text-white/70 text-lg mb-6">Forward · 7 Goals in 4 Matches</p>

            <p className="text-white/80 leading-relaxed mb-8">
              AMTAY FC proudly celebrates the exceptional performance of prolific forward Buhari Sahi Shaho
              at the Bichi Hagagawa Centre. Through consistency, determination, and clinical finishing, he
              established himself as one of the standout players of the tournament — emerging among the
              league's leading top scorers.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {matches.map((m, i) => (
                <div key={i} className="card-glass flex items-center gap-3 py-3 px-4">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--electric-cyan))]/20 flex items-center justify-center shrink-0">
                    <Target className="w-5 h-5 text-[hsl(var(--electric-cyan))]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-xl leading-none">
                      {m.goals} <span className="text-sm font-semibold text-white/70">{m.goals === 1 ? 'GOAL' : 'GOALS'}</span>
                    </div>
                    <div className="text-xs text-white/60 truncate">vs {m.opponent}</div>
                  </div>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-[hsl(var(--electric-cyan))] pl-5 italic text-white/80">
              "Buhari Sahi Shaho demonstrated exceptional quality and consistency. His contributions
              were remarkable, and he truly represented the spirit and ambition of AMTAY Football Club."
              <footer className="mt-2 not-italic text-sm text-white/60">— AMTAY FC Management</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};
