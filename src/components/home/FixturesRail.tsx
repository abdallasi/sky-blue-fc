import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import { MapPin } from 'lucide-react';
import amtayLogo from '@/assets/amtay-logo.png';

/**
 * Compact matchday slip — one horizontal line of crests, one slim footer.
 * Roughly 40% shorter than the old ticket card so mobile can see two at once.
 */
export const FixturesRail = () => {
  const { content } = useContent();
  const fixtures = content.fixtures ?? [];
  if (fixtures.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-muted/30 border-y border-border">
      <Rail eyebrow="Fixtures">
        {fixtures.map((f) => (
          <article
            key={f.id}
            className="group shrink-0 w-[72vw] sm:w-[280px] snap-start overflow-hidden rounded-[1.25rem] bg-[hsl(var(--midnight-blue))] text-white transition-all duration-500 hover:-translate-y-1"
          >
            {/* Competition + venue side */}
            <div className="flex items-center justify-between px-4 pt-3.5">
              <span className="truncate text-[9px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--electric-cyan))]">
                {f.competition}
              </span>
              <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.16em] text-white/70">
                {f.home ? 'Home' : 'Away'}
              </span>
            </div>

            {/* Single horizontal crest line */}
            <div className="flex items-center gap-3 px-4 py-4">
              <img src={amtayLogo} alt="AMTAY FC" className="h-8 w-8 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black leading-tight tracking-tight">
                  AMTAY <span className="text-white/35">vs</span>
                </div>
                <div className="truncate text-sm font-black leading-tight tracking-tight text-white/85">
                  {f.opponent}
                </div>
              </div>
              <div className="shrink-0 rounded-xl bg-white/[0.07] px-2.5 py-1.5 text-center">
                {f.result ? (
                  <div className="text-sm font-black tracking-tight">{f.result}</div>
                ) : (
                  <>
                    <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/55">{f.date}</div>
                    <div className="text-xs font-black tracking-tight">{f.kickoff}</div>
                  </>
                )}
              </div>
            </div>

            {/* Slim footer */}
            <div className="flex items-center gap-2 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/55">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[hsl(var(--electric-cyan))]" />
              <MapPin className="h-3 w-3 shrink-0 text-white/40" />
              <span className="truncate">{f.venue}</span>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
};
