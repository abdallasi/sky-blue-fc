import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import amtayLogo from '@/assets/amtay-logo.png';

export const Footer = () => {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="bg-[hsl(var(--midnight-blue))] text-white">
      <div className="container-premium py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img 
                src={amtayLogo} 
                alt="AMTAY FC Logo" 
                className="w-14 h-14 object-contain"
              />
              <div>
                <div className="font-bold text-xl tracking-tight">AMTAY FC</div>
                <div className="text-white/50 text-sm">Est. 2023</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              A rising professional club from Kano, built to develop young talent and compete at the highest levels.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--royal-blue))] transition-all duration-200 hover:scale-105"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'First Team', href: '/team' },
                { name: 'Academy', href: '/academy' },
                { name: 'Statistics', href: '/stats' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-white/60 hover:text-white transition-colors text-sm inline-flex items-center gap-1 hover:gap-2"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Club */}
          <div>
            <h4 className="font-semibold text-lg mb-6">The Club</h4>
            <ul className="space-y-3">
              {[
                { name: 'History', href: '/about' },
                { name: 'Management', href: '/team' },
                { name: 'Facilities', href: '/about' },
                { name: 'Partners', href: '/contact' },
                { name: 'Media', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-white/80 text-sm">{contact.locationDetail}</p>
                  <p className="text-white/50 text-sm">{contact.location}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={16} />
                </div>
                <span className="text-white/60 text-sm">{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={16} />
                </div>
                <span className="text-white/60 text-sm">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} AMTAY FC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/cms" className="text-white/40 hover:text-white transition-colors">
              CMS
            </Link>
            <Link to="#" className="text-white/40 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/40 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
