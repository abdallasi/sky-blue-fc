import { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Desktop / primary image */
  image?: string;
  /** Portrait crop used on phones for the same section */
  imageMobile?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

/**
 * Image-first page header. The photograph is the first thing seen on phone and
 * desktop; type sits on the lower third so the picture stays sharp and uncropped
 * where it matters. Falls back to a light editorial header when no image is set.
 */
export const PageHero = ({ eyebrow, title, subtitle, image, imageMobile, align = 'left', children }: PageHeroProps) => {
  const centered = align === 'center';

  if (image) {
    const mobile = imageMobile || image;
    return (
      <section className="relative h-[72svh] min-h-[460px] w-full overflow-hidden bg-[hsl(var(--midnight-blue))]">
        <picture>
          <source media="(min-width: 768px)" srcSet={image} />
          <img
            src={mobile}
            alt={title}
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[hsl(217_100%_8%)] via-[hsl(217_100%_8%)]/65 to-transparent" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-premium pb-10 sm:pb-14">
            <div className={centered ? 'max-w-3xl mx-auto text-center' : 'max-w-4xl'}>
              <div className={`flex items-center gap-3 sm:gap-4 animate-fade-up ${centered ? 'justify-center' : ''}`}>
                <span className="h-[2px] w-8 sm:w-12 bg-[hsl(var(--electric-cyan))]" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-white/80">
                  {eyebrow}
                </span>
              </div>

              <h1 className="mt-5 text-[2.5rem] leading-[0.94] sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.04em] text-white animate-fade-up-delay-1">
                {title}
              </h1>

              {subtitle && (
                <p
                  className={`mt-5 text-base sm:text-lg leading-relaxed text-white/75 animate-fade-up-delay-2 ${
                    centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
                  }`}
                >
                  {subtitle}
                </p>
              )}

              {children && <div className="mt-7 animate-fade-up-delay-3">{children}</div>}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-background pt-28 sm:pt-32 lg:pt-36 pb-0 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[hsl(var(--royal-blue))]/[0.05] blur-[150px]" />

      <div className="container-premium relative">
        <div className={centered ? 'max-w-3xl mx-auto text-center' : 'max-w-4xl'}>
          <div className={`flex items-center gap-3 sm:gap-4 animate-fade-up ${centered ? 'justify-center' : ''}`}>
            <span className="h-[2px] w-8 sm:w-12 bg-[hsl(var(--royal-blue))]" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
              {eyebrow}
            </span>
          </div>

          <h1 className="mt-6 sm:mt-8 text-[2.5rem] leading-[0.95] sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-[-0.04em] text-foreground animate-fade-up-delay-1">
            {title}
          </h1>

          {subtitle && (
            <p
              className={`mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground animate-fade-up-delay-2 ${
                centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
              }`}
            >
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8 animate-fade-up-delay-3">{children}</div>}
        </div>

        <div className="mt-10 sm:mt-14 h-px w-full bg-border" />
      </div>
    </section>
  );
};
