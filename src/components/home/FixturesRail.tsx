import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import { MapPin, Clock } from 'lucide-react';

export const FixturesRail = () => {
  const { content } = useContent();
  const fixtures = content.fixtures ?? [];
  if (fixtures.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-muted/40 border-y border-border">
      <Rail
        eyebrow="Fixtures"
        title="Next on the calendar"
        description="Turn up early. The warm-up is worth watching."
      >
        {fixtures.map((f) => (
          <article
            key={f.id}
            className="shrink-0 w-[78vw] sm:w-[320px] snap-start rounded-[1.5rem] border border-border bg-background p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--royal-blue))]/40"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--primary-blue))]">
                {f.competition}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-muted text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {f.home ? 'Home' : 'Away'}
              </span>
            </div>

            <div className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              AMTAY FC
            </div>
            <div className="mt-1 text-2xl font-black tracking-tight text-foreground leading-tight">
              vs {f.opponent}
            </div>

            {f.result && (
              <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-[hsl(var(--midnight-blue))] text-xs font-bold text-white">
                {f.result}
              </div>
            )}

            <div className="mt-6 h-px w-full bg-border" />

            <div className="mt-5 space-y-2.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 shrink-0 text-[hsl(var(--royal-blue))]" />
                <span>
                  {f.date} · {f.kickoff}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[hsl(var(--royal-blue))]" />
                <span>{f.venue}</span>
              </div>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
};
