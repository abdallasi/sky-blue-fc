import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube, Zap, Globe } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import amtayLogo from '@/assets/amtay-logo.png';

export const Footer = () => {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="relative bg-[hsl(var(--midnight-blue))] text-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[hsl(var(--electric-cyan))]/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container-premium py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={amtayLogo} 
                  alt="AMTAY FC Logo" 
                  className="w-16 h-16 object-contain"
                />
                <div className="absolute inset-0 bg-[hsl(var(--electric-cyan))]/20 rounded-full blur-xl" />
              </div>
              <div>
                <div className="font-black text-xl tracking-tight">AMTAY FC</div>
                <div className="text-[hsl(var(--electric-cyan))] text-xs font-semibold uppercase tracking-widest">Est. 2023</div>
              </div>
            </div>
            <p className="text-white/55 text-sm leading-relaxed">
              From Kano to the World — Developing Africa's future football stars with excellence and ambition.
            </p>
            
            {/* Brand Message */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-xs text-white/40 italic">
                "Built for Development. Built for Export."
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Youtube, label: 'YouTube' },
              ].map(({ Icon, label }) => (
                <a 
                  key={label}
                  href="#" 
                  aria-label={label}
                  className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center hover:bg-[hsl(var(--electric-cyan))] hover:text-[hsl(var(--midnight-blue))] transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
              Quick Links
            </h4>
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
                    className="text-white/55 hover:text-[hsl(var(--electric-cyan))] transition-all duration-300 text-sm inline-flex items-center gap-2 hover:gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Club */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
              The Club
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'History', href: '/about' },
                { name: 'Management', href: '/team' },
                { name: 'Facilities', href: '/about' },
                { name: 'Scouting', href: '/academy' },
                { name: 'Partners', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-white/55 hover:text-[hsl(var(--electric-cyan))] transition-all duration-300 text-sm inline-flex items-center gap-2 hover:gap-3"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-cyan))]/20 to-[hsl(var(--royal-blue))]/20 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin size={16} className="text-[hsl(var(--electric-cyan))]" />
                </div>
                <div>
                  <p className="text-white/75 text-sm font-medium">{contact.locationDetail}</p>
                  <p className="text-white/45 text-sm">{contact.location}</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-cyan))]/20 to-[hsl(var(--royal-blue))]/20 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone size={16} className="text-[hsl(var(--electric-cyan))]" />
                </div>
                <span className="text-white/55 text-sm">{contact.phone}</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-cyan))]/20 to-[hsl(var(--royal-blue))]/20 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail size={16} className="text-[hsl(var(--electric-cyan))]" />
                </div>
                <span className="text-white/55 text-sm">{contact.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <p className="text-white/35 text-sm">
              © {new Date().getFullYear()} AMTAY FC. All rights reserved.
            </p>
            <span className="hidden md:inline text-white/20">|</span>
            <p className="hidden md:block text-white/30 text-xs">
              Developing Nigeria's Future Football Legends
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/cms" className="text-white/35 hover:text-[hsl(var(--electric-cyan))] transition-colors">
              CMS
            </Link>
            <Link to="#" className="text-white/35 hover:text-[hsl(var(--electric-cyan))] transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/35 hover:text-[hsl(var(--electric-cyan))] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
