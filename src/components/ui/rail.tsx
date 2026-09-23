import { ReactNode, useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface RailProps {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  /** dark surfaces flip the control colours */
  tone?: 'light' | 'dark';
}

/**
 * Horizontal snap carousel used for player spotlights, match photography,
 * news and fixtures. Drag/swipe on touch, arrow controls on pointer devices.
 */
export const Rail = ({ eyebrow, title, description, action, children, tone = 'light' }: RailProps) => {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: 'smooth' });
  };

  const isDark = tone === 'dark';
  const btn = `w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed ${
    isDark
      ? 'border-white/20 text-white hover:bg-white/10'
      : 'border-border text-foreground hover:border-[hsl(var(--royal-blue))] hover:text-[hsl(var(--primary-blue))]'
  }`;

  return (
    <div>
      {(eyebrow || title || description || action) && (
        <div className="container-premium flex flex-wrap items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            {eyebrow && (
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-[hsl(var(--royal-blue))]" />
                <span
                  className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] ${
                    isDark ? 'text-[hsl(var(--electric-cyan))]' : 'text-[hsl(var(--primary-blue))]'
                  }`}
                >
                  {eyebrow}
                </span>
              </div>
            )}
            {title && (
              <h2
                className={`mt-4 text-3xl sm:text-4xl lg:text-5xl font-black tracking-[-0.04em] ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {title}
              </h2>
            )}
            {description && (
              <p className={`mt-4 text-base sm:text-lg leading-relaxed ${isDark ? 'text-white/60' : 'text-muted-foreground'}`}>
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {action}
            <div className="hidden sm:flex items-center gap-2">
              <button type="button" aria-label="Previous" onClick={() => nudge(-1)} disabled={atStart} className={btn}>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button type="button" aria-label="Next" onClick={() => nudge(1)} disabled={atEnd} className={btn}>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        ref={scroller}
        className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-5 sm:px-6 lg:px-8 pb-2"
      >
        {children}
        <div className="shrink-0 w-1 sm:w-2" aria-hidden />
      </div>
    </div>
  );
};
