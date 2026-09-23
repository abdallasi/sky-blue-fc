import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import shotFallback from '@/assets/placeholder-club-moment.jpg';

export const MatchShotsCarousel = () => {
  const { content } = useContent();
  const shots = content.matchShots ?? [];
  if (shots.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-[hsl(var(--midnight-blue))]">
      <Rail tone="dark" eyebrow="Matchday">
        {shots.map((s) => (
          <figure key={s.id} className="group shrink-0 w-[85vw] sm:w-[480px] lg:w-[560px] snap-start">
            <div className="relative overflow-hidden rounded-[1.25rem]">
              <img
                src={s.image || shotFallback}
                alt={s.caption}
                className="w-full aspect-[16/9] object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(217_100%_8%)]/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {s.meta && (
                <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
                  {s.meta}
                </span>
              )}
            </div>
            <figcaption className="mt-3 flex items-start gap-3">
              <span className="mt-2 h-px w-6 shrink-0 bg-[hsl(var(--electric-cyan))]" />
              <p className="text-sm sm:text-base font-semibold text-white leading-snug line-clamp-1">{s.caption}</p>
            </figcaption>
          </figure>
        ))}

      </Rail>
    </section>
  );
};
