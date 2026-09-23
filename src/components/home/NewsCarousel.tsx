import { useContent } from '@/context/ContentContext';
import { Rail } from '@/components/ui/rail';
import newsFallback from '@/assets/placeholder-academy-training.jpg';
import { ArrowUpRight } from 'lucide-react';

export const NewsCarousel = () => {
  const { content } = useContent();
  const news = content.news ?? [];
  if (news.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-background">
      <Rail eyebrow="Club news">
        {news.map((item) => {
          const Wrapper = item.link ? 'a' : 'div';
          return (
            <Wrapper
              key={item.id}
              {...(item.link ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="group shrink-0 w-[76vw] sm:w-[330px] lg:w-[360px] snap-start rounded-[1.25rem] border border-border overflow-hidden bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_hsl(217_100%_12%/0.25)]"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image || newsFallback}
                  alt={item.title}
                  className="w-full aspect-[16/9] object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em]">
                  <span className="text-[hsl(var(--primary-blue))]">{item.tag}</span>
                  <span className="h-px w-4 bg-border" />
                  <span className="text-muted-foreground">{item.date}</span>
                </div>
                <h3 className="mt-3 text-lg font-black tracking-tight leading-snug text-foreground line-clamp-2">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-snug text-muted-foreground line-clamp-2">{item.excerpt}</p>
                {item.link && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary-blue))]">
                    Read more
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                )}
              </div>
            </Wrapper>
          );
        })}
      </Rail>
    </section>
  );
};
