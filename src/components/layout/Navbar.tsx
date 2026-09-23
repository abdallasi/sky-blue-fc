import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react';
import amtayLogo from '@/assets/amtay-logo.png';
import { useContent } from '@/context/ContentContext';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'First Team', href: '/team' },
  { name: 'Academy', href: '/academy' },
  { name: 'Trials', href: '/apply' },
  { name: 'About', href: '/about' },
  { name: 'Stats', href: '/stats' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { content } = useContent();

  const nextMatch = (content.fixtures ?? []).find((f) => !f.result);
  const waNumber = (content.contact?.whatsapp || content.contact?.phone || '').replace(/[^\d]/g, '');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Every page opens on full-bleed photography, so the bar rides over the
  // image until the reader scrolls into the light editorial body.
  const overImage = !scrolled && !isOpen;
  const onDark = overImage || isOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpen
          ? 'bg-[hsl(217_100%_6%)] border-b border-white/10'
          : overImage
            ? 'bg-gradient-to-b from-black/45 to-transparent border-b border-transparent'
            : 'bg-background/90 backdrop-blur-xl border-b border-border'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-[72px] lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={amtayLogo}
              alt="AMTAY FC"
              className="w-11 h-11 lg:w-12 lg:h-12 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span
                className={`font-black text-lg lg:text-xl tracking-[-0.03em] transition-colors ${
                  onDark ? 'text-white' : 'text-foreground'
                }`}
              >
                AMTAY FC
              </span>
              <span
                className={`mt-1 text-[9px] font-bold uppercase tracking-[0.22em] transition-colors ${
                  onDark ? 'text-white/70' : 'text-muted-foreground'
                }`}
              >
                Kano, Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-3 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                    overImage
                      ? active
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                      : active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-transform duration-300 origin-left ${
                      overImage ? 'bg-[hsl(var(--electric-cyan))]' : 'bg-[hsl(var(--royal-blue))]'
                    } ${active ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/apply"
              className={`group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                overImage
                  ? 'bg-white text-[hsl(var(--midnight-blue))]'
                  : 'bg-[hsl(var(--midnight-blue))] text-white hover:bg-[hsl(var(--primary-blue))]'
              }`}
            >
              Join Academy
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className={`lg:hidden min-h-11 min-w-11 flex items-center justify-center rounded-full border transition-colors ${
              onDark
                ? 'border-white/40 text-white hover:bg-white/10'
                : 'border-border text-foreground hover:bg-muted'
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — stadium tunnel takeover */}
      <div
        className={`lg:hidden absolute inset-x-0 top-full h-[calc(100dvh-72px)] overflow-hidden bg-[hsl(217_100%_6%)] transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-[hsl(var(--royal-blue))]/25 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[hsl(var(--electric-cyan))]/10 blur-[120px]" />

        <div className="relative container-premium h-full overflow-y-auto py-5">
          {/* Next matchday widget */}
          {nextMatch && (
            <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--electric-cyan))] animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[hsl(var(--electric-cyan))]">
                  Next matchday
                </span>
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-black tracking-tight text-white">
                    vs {nextMatch.opponent}
                  </div>
                  <div className="truncate text-[11px] text-white/50">{nextMatch.venue}</div>
                </div>
                <div className="shrink-0 rounded-lg bg-white/10 px-2.5 py-1 text-right">
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/60">{nextMatch.date}</div>
                  <div className="text-xs font-black text-white">{nextMatch.kickoff}</div>
                </div>
              </div>
            </div>
          )}

          <div className="divide-y divide-white/10 border-y border-white/10">
            {navLinks.map((link, index) => {
              const active = location.pathname === link.href;
              return (
                <Link key={link.name} to={link.href} className="flex items-center gap-4 py-3.5 group">
                  <span className="w-6 font-mono text-[11px] font-bold tracking-[0.1em] text-white/30">
                    0{index + 1}
                  </span>
                  <span
                    className={`flex-1 text-xl font-black uppercase tracking-[-0.01em] transition-colors ${
                      active ? 'text-[hsl(var(--electric-cyan))]' : 'text-white group-hover:text-white/70'
                    }`}
                  >
                    {link.name}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 ${active ? 'text-[hsl(var(--electric-cyan))]' : 'text-white/30'}`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            to="/apply"
            className="mt-5 flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[hsl(var(--electric-cyan))] text-[hsl(var(--midnight-blue))] text-xs font-bold uppercase tracking-[0.2em]"
          >
            Apply for trials
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          {/* Fast actions */}
          <div className="mt-4 mb-6 flex items-center justify-center gap-3">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp the club"
                className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            )}
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
