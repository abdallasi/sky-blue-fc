import { Link } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import portraitFallback from '@/assets/placeholder-trials-portrait.jpg';

export const SpotlightCarousel = () => {
  const { content } = useContent();
  const spotlights = content.spotlights ?? [];
  if (spotlights.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 bg-background">
      <Rail
        eyebrow="Selected players"
        title="The names Kano already knows"
        description="Eleven start, one squad. These are the players carrying the shirt right now."
        action={
          <Link
            to="/team"
            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full border border-border text-xs font-bold uppercase tracking-[0.18em] hover:border-[hsl(var(--royal-blue))] transition-colors"
          >
            Full squad
          </Link>
        }
      >
        {spotlights.map((p) => (
          <article
            key={p.id}
            className="group relative shrink-0 w-[78vw] sm:w-[340px] lg:w-[380px] snap-start overflow-hidden rounded-[1.75rem] bg-[hsl(var(--midnight-blue))]"
          >
            <img
              src={p.image || portraitFallback}
              alt={p.name}
              className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[hsl(217_100%_8%)] via-[hsl(217_100%_8%)]/60 to-transparent" />

            <span className="absolute top-5 right-6 text-5xl font-black text-white/25 leading-none select-none">
              {p.number}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--electric-cyan))]">
                {p.position}
              </div>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white">{p.name}</h3>
              <div className="mt-3 h-px w-10 bg-white/30" />
              <p className="mt-3 text-sm text-white/75">{p.line1}</p>
              <p className="text-sm text-white/55">{p.line2}</p>
              {p.quote && (
                <p className="mt-4 text-sm italic text-white/70 opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-24">
                  “{p.quote}”
                </p>
              )}
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
};
