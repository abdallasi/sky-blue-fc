import { Link } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import portraitFallback from '@/assets/placeholder-trials-portrait.jpg';

/** Position pill colour, the way an official squad card codes it. */
const positionTone = (position: string) => {
  const p = (position || '').toUpperCase();
  if (p.startsWith('G')) return 'bg-amber-400/20 text-amber-300 border-amber-300/30';
  if (/^(D|CB|RB|LB)/.test(p)) return 'bg-emerald-400/20 text-emerald-300 border-emerald-300/30';
  if (/^(M|CM|DM|AM)/.test(p)) return 'bg-sky-400/20 text-sky-300 border-sky-300/30';
  return 'bg-rose-400/20 text-rose-300 border-rose-300/30';
};

const shortPosition = (position: string) => {
  const p = (position || '').trim();
  if (p.length <= 3) return p.toUpperCase();
  const map: Record<string, string> = {
    goalkeeper: 'GK',
    defender: 'DF',
    midfielder: 'MF',
    winger: 'WG',
    striker: 'ST',
    forward: 'FW',
  };
  return map[p.toLowerCase()] || p.slice(0, 2).toUpperCase();
};

export const SpotlightCarousel = () => {
  const { content } = useContent();
  const spotlights = content.spotlights ?? [];
  if (spotlights.length === 0) return null;

  return (
    <section className="pt-12 pb-10 sm:pt-20 sm:pb-14 bg-background">
      <Rail
        eyebrow="Selected players"
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
            className="group relative shrink-0 w-[66vw] sm:w-[260px] lg:w-[290px] snap-start overflow-hidden rounded-[1.5rem] bg-[hsl(var(--midnight-blue))]"
          >
            <img
              src={p.image || portraitFallback}
              alt={p.name}
              className="w-full aspect-[3/4] object-cover object-center transition-transform duration-[900ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[hsl(217_100%_8%)] via-[hsl(217_100%_8%)]/60 to-transparent" />

            {/* Jersey number watermark */}
            <span className="absolute top-3 right-4 text-5xl font-black leading-none text-white/20 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {p.number}
            </span>

            {/* Colour-coded position pill */}
            <span
              className={`absolute top-4 left-4 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] backdrop-blur-md ${positionTone(p.position)}`}
            >
              {shortPosition(p.position)}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
              <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">{p.name}</h3>
              <div className="mt-2 h-px w-8 bg-white/30" />
              <p className="mt-2 text-xs text-white/75">{p.line1}</p>
              <p className="text-xs text-white/55">{p.line2}</p>
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
};
