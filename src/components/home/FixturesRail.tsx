import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import { MapPin } from 'lucide-react';
import amtayLogo from '@/assets/amtay-logo.png';

export const FixturesRail = () => {
  const { content } = useContent();
  const fixtures = content.fixtures ?? [];
  if (fixtures.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-muted/30 border-y border-border">
      <Rail eyebrow="Fixtures">
        {fixtures.map((f) => (
          <article
            key={f.id}
            className="group shrink-0 w-[80vw] sm:w-[340px] snap-start overflow-hidden rounded-[1.5rem] bg-[hsl(var(--midnight-blue))] text-white transition-all duration-500 hover:-translate-y-1"
          >
            {/* Pass header: competition + kickoff stamp */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--electric-cyan))]">
                {f.competition}
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/70">
                {f.home ? 'Home' : 'Away'}
              </span>
            </div>

            {/* Crest vs crest */}
            <div className="flex items-center justify-between gap-3 px-5 py-7">
              <div className="flex-1 text-center">
                <img src={amtayLogo} alt="AMTAY FC" className="mx-auto h-12 w-12 object-contain" />
                <div className="mt-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">Amtay FC</div>
              </div>

              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/35">vs</div>

              <div className="flex-1 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base font-black text-white/80">
                  {f.opponent.slice(0, 2).toUpperCase()}
                </div>
                <div className="mt-2.5 line-clamp-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
                  {f.opponent}
                </div>
              </div>
            </div>

            {/* Kickoff band */}
            <div className="bg-white/[0.06] px-5 py-3.5 text-center">
              {f.result ? (
                <div className="text-lg font-black tracking-tight">{f.result}</div>
              ) : (
                <div className="text-sm font-black uppercase tracking-[0.18em]">
                  {f.date} · {f.kickoff}
                </div>
              )}
            </div>

            {/* Perforation + venue */}
            <div className="relative">
              <div className="absolute -left-2 top-0 h-4 w-4 -translate-y-1/2 rounded-full bg-muted/30" />
              <div className="absolute -right-2 top-0 h-4 w-4 -translate-y-1/2 rounded-full bg-muted/30" />
              <div className="flex items-center gap-2.5 px-5 py-4 text-xs text-white/55">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-[hsl(var(--electric-cyan))]" />
                <span className="line-clamp-1">{f.venue}</span>
              </div>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
};
