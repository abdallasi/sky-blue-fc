import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import amtayLogo from '@/assets/amtay-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Academy', href: '/academy' },
  { name: 'Stats', href: '/stats' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Trials', href: '/apply' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        overImage
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
                  overImage ? 'text-white' : 'text-foreground'
                }`}
              >
                AMTAY FC
              </span>
              <span
                className={`mt-1 text-[9px] font-bold uppercase tracking-[0.22em] transition-colors ${
                  overImage ? 'text-white/70' : 'text-muted-foreground'
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
                  className={`relative px-3.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
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
                    className={`absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full transition-transform duration-300 origin-left ${
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
            className={`lg:hidden p-2.5 rounded-full border transition-colors ${
              overImage
                ? 'border-white/40 text-white hover:bg-white/10'
                : 'border-border text-foreground hover:bg-muted'
            }`}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>


      {/* Mobile Menu — fully opaque, maximum legibility */}
      <div
        className={`lg:hidden absolute inset-x-0 top-full h-[calc(100vh-72px)] bg-background border-t border-border transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="container-premium h-full overflow-y-auto py-6">
          <div className="divide-y divide-border">
            {navLinks.map((link) => {
              const active = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center justify-between py-4 group"
                >
                  <span
                    className={`text-2xl font-black tracking-[-0.03em] ${
                      active ? 'text-[hsl(var(--primary-blue))]' : 'text-foreground'
                    }`}
                  >
                    {link.name}
                  </span>
                  <ArrowUpRight
                    className={`w-5 h-5 ${active ? 'text-[hsl(var(--royal-blue))]' : 'text-muted-foreground'}`}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            to="/apply"
            className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-full bg-[hsl(var(--midnight-blue))] text-white font-bold tracking-wide"
          >
            Join Academy
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
