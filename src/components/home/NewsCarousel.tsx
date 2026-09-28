import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import newsFallback from '@/assets/placeholder-academy-training.jpg';
import { ArrowUpRight } from 'lucide-react';
import { StoryComingSoon } from '@/components/news/StoryComingSoon';

const tagTone: Record<string, string> = {
  transfer: 'bg-rose-500/10 text-rose-600',
  'match report': 'bg-sky-500/10 text-sky-600',
  academy: 'bg-emerald-500/10 text-emerald-600',
  club: 'bg-amber-500/10 text-amber-600',
};

const readTime = (text: string) => Math.max(1, Math.round((text || '').split(/\s+/).length / 45));

export const NewsCarousel = () => {
  const { content } = useContent();
  const news = content.news ?? [];
  const [pending, setPending] = useState<string | null>(null);
  if (news.length === 0) return null;

  return (
    /* Sits tight under the player rail — one continuous run, no dead space */
    <section className="pt-2 pb-12 sm:pt-6 sm:pb-16 bg-muted/30 border-t border-border">
      <Rail eyebrow="Club news">
        {news.map((item) => {
          const tone = tagTone[(item.tag || '').toLowerCase()] || 'bg-[hsl(var(--royal-blue))]/10 text-[hsl(var(--primary-blue))]';
          const hasStory = !!(item.body && item.body.trim());
          const className =
            'group shrink-0 w-[76vw] sm:w-[320px] lg:w-[350px] snap-start text-left rounded-[1.25rem] border border-border overflow-hidden bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_hsl(217_100%_12%/0.25)]';

          const inner = (
            <>
              <div className="relative overflow-hidden">
                <img
                  src={item.image || newsFallback}
                  alt={item.title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.18em] backdrop-blur-md ${tone}`}
                >
                  {item.tag}
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2.5 text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <span>{item.date}</span>
                  <span className="h-px w-3 bg-border" />
                  <span>{readTime(item.body || item.excerpt)} min read</span>
                </div>
                <h3 className="mt-2.5 text-base font-black tracking-tight leading-snug text-foreground line-clamp-2 sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-snug text-muted-foreground line-clamp-2">{item.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary-blue))]">
                  {hasStory || item.link ? 'Read the story' : 'Story coming soon'}
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </>
          );

          if (hasStory) {
            return (
              <Link key={item.id} to={`/news/${item.id}`} className={className}>
                {inner}
              </Link>
            );
          }

          if (item.link) {
            return (
              <a key={item.id} href={item.link} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
              </a>
            );
          }

          return (
            <button key={item.id} type="button" onClick={() => setPending(item.id)} className={className}>
              {inner}
            </button>
          );
        })}
      </Rail>

      <StoryComingSoon
        open={!!pending}
        onOpenChange={(v) => setPending(v ? pending : null)}
        title={news.find((n) => n.id === pending)?.title}
      />
    </section>
  );
};
