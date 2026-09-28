import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Building, MapPin, Quote, User, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PresidentMessage } from '@/components/about/PresidentMessage';
import { PageHero } from '@/components/layout/PageHero';
import storyFallback from '@/assets/placeholder-academy-training.jpg';

/* ---------------------------------------------------------------- */
/* Manifesto — the club's voice, set large and unhurried            */
/* ---------------------------------------------------------------- */
const Manifesto = ({ vision }: { vision: string }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.25 });
  return (
    <section className="border-b border-border bg-background py-20 sm:py-28">
      <div className="container-premium">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mx-auto max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[hsl(var(--royal-blue))]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
              Why we exist
            </span>
          </div>
          <p className="mt-7 text-[1.9rem] leading-[1.15] font-black tracking-[-0.035em] text-foreground sm:text-[2.9rem] lg:text-[3.4rem]">
            {vision}
          </p>
          <p className="mt-8 max-w-xl text-[15px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Kano built. Nigeria proven. Europe next.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- */
/* Club DNA — mission lines as an editorial bento                    */
/* ---------------------------------------------------------------- */
const dnaMeta = [
  { tag: '01', kicker: 'Attack' },
  { tag: '02', kicker: 'Standards' },
  { tag: '03', kicker: 'Community' },
  { tag: '04', kicker: 'Export' },
];

const ClubDNA = ({ mission }: { mission: string[] }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  return (
    <section className="bg-[hsl(var(--midnight-blue))] py-20 text-white sm:py-28">
      <div className="container-premium">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[hsl(var(--electric-cyan))]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--electric-cyan))]">
            Club DNA
          </span>
        </div>
        <h2 className="mt-5 max-w-2xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
          Four things we refuse to compromise on.
        </h2>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="mt-12 grid gap-4 sm:grid-cols-2">
          {mission.map((line, index) => {
            const meta = dnaMeta[index % dnaMeta.length];
            const wide = index === 0;
            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 transition-all duration-700 hover:border-[hsl(var(--electric-cyan))]/40 hover:bg-white/[0.07] sm:p-9 ${wide ? 'sm:col-span-2' : ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <span className="pointer-events-none absolute -right-2 -top-6 select-none text-[6rem] font-black leading-none text-white/[0.05]">
                  {meta.tag}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[hsl(var(--electric-cyan))]">
                  {meta.kicker}
                </span>
                <p
                  className={`mt-4 font-black tracking-[-0.03em] ${wide ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}`}
                >
                  {line}
                </p>
                <div className="mt-6 h-px w-8 bg-[hsl(var(--electric-cyan))]/60 transition-all duration-500 group-hover:w-16" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- */
/* Timeline                                                          */
/* ---------------------------------------------------------------- */
const Timeline = ({ milestones }: { milestones: { year: string; title: string; description: string }[] }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <section className="section-padding">
      <div className="container-premium">
        <div className="flex items-center gap-3">
          <span className="h-[2px] w-8 bg-[hsl(var(--royal-blue))]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
            2022 — present
          </span>
        </div>
        <h2 className="heading-section mt-5 max-w-2xl">Three seasons. One direction.</h2>

        <div ref={ref as React.RefObject<HTMLDivElement>} className="relative mt-12">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[hsl(var(--primary-blue))] via-[hsl(var(--royal-blue))] to-[hsl(var(--electric-cyan))] sm:left-1/2" />
          <div className="space-y-8">
            {milestones.map((m, index) => (
              <div
                key={index}
                className={`relative pl-12 transition-all duration-700 sm:grid sm:grid-cols-2 sm:gap-12 sm:pl-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${index * 110}ms` }}
              >
                <span className="absolute left-0 top-1.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-background bg-[hsl(var(--primary-blue))] text-[9px] font-black text-white sm:left-1/2 sm:-translate-x-1/2">
                  {index + 1}
                </span>
                <div className={index % 2 === 0 ? 'sm:text-right' : 'sm:col-start-2'}>
                  <span className="text-3xl font-black tracking-[-0.04em] text-[hsl(var(--midnight-blue))] sm:text-4xl">
                    {m.year}
                  </span>
                  <h3 className="mt-1 text-lg font-black tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------- */

const About = () => {
  const { content } = useContent();
  const storyAnim = useScrollAnimation({ threshold: 0.2 });
  const founderAnim = useScrollAnimation({ threshold: 0.2 });
  const facilitiesAnim = useScrollAnimation({ threshold: 0.2 });

  return (
    <Layout>
      <PageHero
        eyebrow="Our story"
        title={content.about.heroTitle}
        subtitle={content.about.heroSubtitle}
        image={content.images?.aboutHero || storyFallback}
        imageMobile={content.images?.aboutHeroMobile}
      />

      <Manifesto vision={content.visionMission.vision} />

      {/* Story — editorial two-column with a drop opening line */}
      <section className="section-padding">
        <div className="container-premium">
          <div ref={storyAnim.ref as React.RefObject<HTMLDivElement>} className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div
              className={`transition-all duration-1000 ${storyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="text-label-blue">History</span>
              <h2 className="heading-section mt-2 mb-8">{content.about.storyTitle}</h2>
              <div className="space-y-6">
                {content.about.storyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed text-muted-foreground ${index === 0 ? 'text-xl text-foreground/85 first-letter:float-left first-letter:mr-3 first-letter:text-[3.4rem] first-letter:font-black first-letter:leading-[0.8] first-letter:text-[hsl(var(--primary-blue))]' : 'text-[17px]'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div
              className={`relative transition-all duration-1000 delay-200 ${storyAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              {content.images.aboutStoryImages && content.images.aboutStoryImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {content.images.aboutStoryImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Club story ${index + 1}`}
                      loading="lazy"
                      className={`w-full rounded-[1.25rem] object-cover ${index === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'}`}
                    />
                  ))}
                </div>
              ) : (
                <figure className="overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_40px_80px_-45px_hsl(217_100%_12%/0.3)]">
                  <img
                    src={content.images?.showcaseTraining || storyFallback}
                    alt="AMTAY FC club story"
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover object-center"
                  />
                </figure>
              )}
              <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                Training ground · {content.contact.location}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClubDNA mission={content.visionMission.mission} />

      {/* Founder — portrait frame with pull quote */}
      <section className="section-padding bg-muted/40">
        <div className="container-premium">
          <div
            ref={founderAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div
              className={`relative order-2 transition-all duration-1000 lg:order-1 ${founderAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.97]'}`}
            >
              {content.images.founderPhoto ? (
                <figure className="relative overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_45px_90px_-45px_hsl(217_100%_12%/0.4)]">
                  <img
                    src={content.images.founderPhoto}
                    alt={content.about.founderName}
                    loading="lazy"
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/70">
                      {content.about.founderTitle}
                    </p>
                    <p className="mt-1 text-lg font-black text-white">{content.about.founderName}</p>
                  </figcaption>
                </figure>
              ) : (
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[hsl(var(--midnight-blue))] to-[hsl(var(--primary-blue))]">
                  <User className="h-32 w-32 text-white/20" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                    <Quote className="mb-3 h-8 w-8 text-[hsl(var(--electric-cyan))]" />
                    <p className="text-sm italic leading-relaxed text-white/90">
                      "I believe in youth. I believe in speed. I believe in football that changes lives."
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`order-1 transition-all duration-1000 delay-200 lg:order-2 ${founderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <span className="text-label-blue">Leadership</span>
              <h2 className="heading-section mt-2 mb-3">{content.about.founderTitle}</h2>
              <h3 className="mb-7 text-xl font-black tracking-tight text-[hsl(var(--primary-blue))]">
                {content.about.founderName}
              </h3>
              <p className="text-[17px] leading-relaxed text-muted-foreground">{content.about.founderBio}</p>
              <a
                href="/academy#apply"
                className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary-blue))]"
              >
                Join the academy <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <PresidentMessage />

      <Timeline milestones={content.milestones} />

      {/* Facilities */}
      <section className="section-padding relative overflow-hidden bg-[hsl(var(--midnight-blue))] text-white">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[hsl(var(--royal-blue))]/10 blur-[150px]" />
        <div className="container-premium relative">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[hsl(var(--electric-cyan))]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--electric-cyan))]">
              Infrastructure
            </span>
          </div>
          <h2 className="heading-section mt-5 max-w-2xl">Where the work happens.</h2>

          <div
            ref={facilitiesAnim.ref as React.RefObject<HTMLDivElement>}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {content.facilities.map((facility, index) => (
              <div
                key={index}
                className={`group rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7 transition-all duration-700 hover:-translate-y-1 hover:border-[hsl(var(--electric-cyan))]/40 hover:bg-white/[0.07] ${facilitiesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--royal-blue))]/20 transition-colors group-hover:bg-[hsl(var(--royal-blue))]">
                  <Building className="h-6 w-6 text-[hsl(var(--electric-cyan))] transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-lg font-black tracking-tight">{facility.name}</h3>
                <div className="mt-2 flex items-center gap-2 text-sm text-white/60">
                  <MapPin className="h-4 w-4" />
                  <span>{facility.location}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
