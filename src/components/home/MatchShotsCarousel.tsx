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
            <div className="overflow-hidden rounded-[1.25rem]">
              <img
                src={s.image || shotFallback}
                alt={s.caption}
                className="w-full aspect-[16/9] object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-4 flex items-start gap-3">
              <span className="mt-2 h-px w-6 shrink-0 bg-[hsl(var(--electric-cyan))]" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-white leading-snug line-clamp-1">{s.caption}</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">{s.meta}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </Rail>
    </section>
  );
};
