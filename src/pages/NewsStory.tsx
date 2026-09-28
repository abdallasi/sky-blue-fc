import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import newsFallback from '@/assets/placeholder-academy-training.jpg';

const readTime = (text: string) => Math.max(1, Math.round((text || '').split(/\s+/).length / 200));

/** Renders the plain-text article body: `## ` lines become sub-headings. */
const Body = ({ body }: { body: string }) => (
  <div className="space-y-6">
    {body
      .split(/\n{2,}/)
      .map((block) => block.trim())
      .filter(Boolean)
      .map((block, i) =>
        block.startsWith('## ') ? (
          <h2 key={i} className="pt-4 text-2xl sm:text-3xl font-black tracking-[-0.03em] text-foreground">
            {block.replace(/^##\s+/, '')}
          </h2>
        ) : (
          <p key={i} className="text-lg leading-[1.75] text-foreground/80">
            {block}
          </p>
        )
      )}
  </div>
);

const NewsStory = () => {
  const { id } = useParams();
  const { content } = useContent();
  const news = content.news ?? [];
  const item = news.find((n) => n.id === id);

  if (!item) {
    return (
      <Layout>
        <section className="container-premium pt-36 pb-24 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
            AMTAY FC Media
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">Story not found</h1>
          <p className="mt-4 text-muted-foreground">This report may have been moved or is still being written.</p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary-blue))] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Back home
          </Link>
        </section>
      </Layout>
    );
  }

  const others = news.filter((n) => n.id !== item.id).slice(0, 3);

  return (
    <Layout>
      {/* Full-bleed opening frame */}
      <section className="relative h-[68svh] min-h-[420px] w-full overflow-hidden bg-[hsl(var(--midnight-blue))]">
        <img
          src={item.image || newsFallback}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[hsl(217_100%_8%)] via-[hsl(217_100%_8%)]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-premium pb-10 sm:pb-14">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[hsl(var(--electric-cyan))]/15 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--electric-cyan))]">
                  {item.tag}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">{item.date}</span>
                <span className="h-px w-4 bg-white/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">
                  {readTime(item.body || item.excerpt)} min read
                </span>
              </div>
              <h1 className="mt-5 text-[2.4rem] leading-[0.95] sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-white">
                {item.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="container-premium py-14 sm:py-20">
        <div className="mx-auto max-w-[44rem]">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-[hsl(var(--primary-blue))]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All news
          </Link>

          {item.standfirst && (
            <p className="mt-8 border-l-2 border-[hsl(var(--electric-cyan))] pl-5 text-xl sm:text-2xl font-semibold leading-snug tracking-[-0.02em] text-foreground">
              {item.standfirst}
            </p>
          )}

          <div className="mt-8 flex items-center gap-3 border-y border-border py-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--royal-blue))]/10 text-[11px] font-black text-[hsl(var(--primary-blue))]">
              AFC
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {item.author || 'AMTAY FC Media'}
            </span>
          </div>

          <div className="mt-10">
            <Body body={item.body || item.excerpt} />
          </div>

          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(var(--primary-blue))]"
            >
              External coverage <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>

      {/* More stories */}
      {others.length > 0 && (
        <section className="border-t border-border bg-muted/30 py-14 sm:py-20">
          <div className="container-premium">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[hsl(var(--royal-blue))]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
                More from the club
              </span>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {others.map((n) => {
                const hasStory = !!(n.body && n.body.trim());
                return (
                  <Link
                    key={n.id}
                    to={hasStory ? `/news/${n.id}` : '/'}
                    className="group overflow-hidden rounded-[1.25rem] border border-border bg-card transition-all duration-500 hover:-translate-y-1"
                  >
                    <img
                      src={n.image || newsFallback}
                      alt={n.title}
                      className="aspect-[16/9] w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                    />
                    <div className="p-5">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        {n.date}
                      </span>
                      <h3 className="mt-2 text-base font-black leading-snug tracking-tight line-clamp-2">{n.title}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default NewsStory;
