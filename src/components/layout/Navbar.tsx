import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import amtayLogo from '@/assets/amtay-logo.png';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Academy', href: '/academy' },
  { name: 'Stats', href: '/stats' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-black/5 border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={amtayLogo} 
                alt="AMTAY FC Logo" 
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[hsl(var(--electric-cyan))]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className={`font-black text-xl tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-foreground' : 'text-white'
              }`}>
                AMTAY FC
              </span>
              <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                scrolled ? 'text-[hsl(var(--electric-cyan))]' : 'text-[hsl(var(--electric-cyan))]'
              }`}>
                Kano, Nigeria
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 ${
                  location.pathname === link.href
                    ? scrolled
                      ? 'text-[hsl(var(--primary-blue))] bg-[hsl(var(--primary-blue))]/10'
                      : 'text-white bg-white/15'
                    : scrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Neon Style */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className={`group px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 inline-flex items-center gap-2 ${
                scrolled
                  ? 'bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] text-white hover:shadow-lg hover:shadow-[hsl(var(--electric-cyan))]/30 hover:-translate-y-0.5'
                  : 'bg-[hsl(var(--electric-cyan))] text-[hsl(var(--midnight-blue))] hover:shadow-lg hover:shadow-[hsl(var(--electric-cyan))]/40 hover:-translate-y-0.5'
              }`}
            >
              <Zap className="w-4 h-4" />
              Join Academy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-3 rounded-xl transition-colors ${
              scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl shadow-2xl border-b border-border/50 transition-all duration-500 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <div className="container-premium py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block py-3.5 px-5 rounded-xl text-base font-semibold transition-all duration-300 ${
                location.pathname === link.href
                  ? 'text-[hsl(var(--primary-blue))] bg-[hsl(var(--primary-blue))]/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="flex items-center justify-center gap-2 w-full py-4 mt-4 text-center bg-gradient-to-r from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] text-white rounded-xl font-bold"
          >
            <Zap className="w-4 h-4" />
            Join Academy
          </Link>
        </div>
      </div>
    </nav>
  );
};
