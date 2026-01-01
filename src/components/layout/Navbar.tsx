import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Academy', href: '/academy' },
  { name: 'Stats', href: '/stats' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg transition-all duration-200 ${
              scrolled 
                ? 'bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] text-white shadow-lg shadow-[hsl(var(--primary-blue))]/20' 
                : 'bg-white text-[hsl(var(--primary-blue))] shadow-lg'
            } group-hover:scale-105`}>
              A
            </div>
            <span className={`font-bold text-xl tracking-tight transition-colors duration-200 ${
              scrolled ? 'text-foreground' : 'text-white'
            }`}>
              AMTAY FC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                  location.pathname === link.href
                    ? scrolled
                      ? 'text-[hsl(var(--primary-blue))] bg-[hsl(var(--primary-blue))]/10'
                      : 'text-white bg-white/15'
                    : scrolled
                    ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'bg-gradient-to-r from-[hsl(var(--primary-blue))] to-[hsl(var(--royal-blue))] text-white hover:shadow-lg hover:shadow-[hsl(var(--primary-blue))]/30 hover:-translate-y-0.5'
                  : 'bg-white text-[hsl(var(--primary-blue))] hover:bg-white/90 hover:shadow-lg'
              }`}
            >
              Join Academy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-colors ${
              scrolled ? 'text-foreground hover:bg-muted' : 'text-white hover:bg-white/10'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 ${
          isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
        }`}
      >
        <div className="container-premium py-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
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
            className="block w-full py-3.5 mt-4 text-center bg-gradient-to-r from-[hsl(var(--primary-blue))] to-[hsl(var(--royal-blue))] text-white rounded-xl font-semibold"
          >
            Join Academy
          </Link>
        </div>
      </div>
    </nav>
  );
};
