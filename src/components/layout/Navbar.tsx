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
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-premium">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${
              scrolled ? 'bg-amtay-blue text-white' : 'bg-white text-amtay-blue'
            }`}>
              A
            </div>
            <span className={`font-bold text-xl tracking-tight ${
              scrolled ? 'text-amtay-midnight' : 'text-white'
            }`}>
              AMTAY FC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === link.href
                    ? scrolled
                      ? 'text-amtay-royal'
                      : 'text-white'
                    : scrolled
                    ? 'text-muted-foreground hover:text-amtay-blue'
                    : 'text-white/80 hover:text-white'
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
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                scrolled
                  ? 'bg-amtay-blue text-white hover:bg-amtay-midnight'
                  : 'bg-white text-amtay-blue hover:bg-white/90'
              }`}
            >
              Join Academy
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-amtay-midnight' : 'text-white'
            }`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="container-premium py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`block py-3 text-base font-medium transition-colors ${
                location.pathname === link.href
                  ? 'text-amtay-royal'
                  : 'text-muted-foreground hover:text-amtay-blue'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block w-full py-3 mt-4 text-center bg-amtay-blue text-white rounded-lg font-semibold"
          >
            Join Academy
          </Link>
        </div>
      </div>
    </nav>
  );
};
