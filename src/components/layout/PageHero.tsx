import { ReactNode } from 'react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}

/**
 * Editorial page header used across every page for one consistent, curated voice:
 * bright, generous whitespace, hairline rules and razor-sharp photography.
 */
export const PageHero = ({ eyebrow, title, subtitle, image, align = 'left', children }: PageHeroProps) => {
  const centered = align === 'center';

  return (
    <section className="relative bg-background pt-28 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 overflow-hidden">
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
            <p className={`mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground animate-fade-up-delay-2 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
              {subtitle}
            </p>
          )}

          {children && <div className="mt-8 animate-fade-up-delay-3">{children}</div>}
        </div>

        {image && (
          <figure className="mt-10 sm:mt-14 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-muted shadow-[0_40px_80px_-40px_hsl(217_100%_12%/0.3)] animate-fade-up-delay-4">
            <img
              src={image}
              alt={title}
              className="w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] object-cover object-center"
            />
          </figure>
        )}

        <div className="mt-12 sm:mt-16 h-px w-full bg-border" />
      </div>
    </section>
  );
};
