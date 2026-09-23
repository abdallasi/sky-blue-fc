import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import joinFallback from '@/assets/placeholder-trials-portrait.jpg';

export const JoinUs = () => {
  const { content } = useContent();
  const { visionMission } = content;
  const image = content.images?.trialsHero || content.images?.showcaseTraining || joinFallback;

  /* Three short promises, drawn from the CMS mission list */
  const promises = (visionMission.mission ?? []).slice(0, 3);

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="container-premium">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure className="relative overflow-hidden rounded-[1.75rem] bg-muted">
            <img
              src={image}
              alt="Trials at AMTAY FC"
              className="h-full w-full object-cover aspect-[4/5] lg:aspect-[4/5]"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[hsl(217_100%_8%)]/85 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--electric-cyan))]">
                Trials open
              </span>
            </figcaption>
          </figure>

          <div>
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[hsl(var(--royal-blue))]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[hsl(var(--primary-blue))]">
                Join us
              </span>
            </div>

            <h2 className="mt-5 text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Bring your boots.
            </h2>

            <div className="mt-8 divide-y divide-border border-y border-border">
              {promises.map((item, index) => (
                <div key={index} className="flex items-start gap-5 py-5">
                  <span className="text-xs font-black tracking-[0.1em] text-[hsl(var(--royal-blue))]">
                    0{index + 1}
                  </span>
                  <p className="text-base leading-snug text-foreground/80 line-clamp-2">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/apply"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[hsl(var(--midnight-blue))] px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                Apply for trials
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/academy"
                className="inline-flex items-center justify-center rounded-full border border-border px-7 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:border-[hsl(var(--royal-blue))]"
              >
                The academy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
