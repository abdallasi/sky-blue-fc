import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Lock } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import heroFallback from '@/assets/placeholder-hero-matchday.jpg';

export const ComingSoon = () => {
  const { content } = useContent();
  const { site, contact, images } = content;

  const desktopImage = images?.comingSoonImage || images?.heroBackground || heroFallback;
  const mobileImage = images?.comingSoonImageMobile || images?.heroBackgroundMobile || desktopImage;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[hsl(var(--background))]">
      {/* Photography */}
      <picture className="absolute inset-0">
        <source media="(max-width: 767px)" srcSet={mobileImage} />
        <img
          src={desktopImage}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/90" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-7 md:px-12">
          <span className="text-sm font-black uppercase tracking-[0.35em] text-white">AMTAY FC</span>
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/50 hover:text-white"
          >
            <Lock className="h-3 w-3" /> Staff
          </Link>
        </header>

        {/* Centre */}
        <main className="flex flex-1 items-center px-6 md:px-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[hsl(var(--accent))]" />
              {site?.comingSoonBadge}
            </span>

            <h1 className="mt-7 text-[clamp(2.4rem,7vw,5.25rem)] font-black uppercase leading-[0.92] tracking-tight text-white">
              {site?.comingSoonTitle}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              {site?.comingSoonMessage}
            </p>

            {site?.comingSoonNote && (
              <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                {site.comingSoonNote}
              </p>
            )}

            {/* Contact actions */}
            <div className="mt-5 flex flex-wrap gap-3">
              {contact?.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[hsl(var(--primary))] transition-transform hover:scale-[1.02]"
                >
                  <Mail className="h-4 w-4" /> {contact.email}
                </a>
              )}
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> {contact.phone}
                </a>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-7 text-[11px] uppercase tracking-[0.2em] text-white/45 md:px-12">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {contact?.location || 'Kano, Nigeria'}
          </span>
          <span className="inline-flex items-center gap-2">
            <Instagram className="h-3.5 w-3.5" /> Amtay Football Club
          </span>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;
