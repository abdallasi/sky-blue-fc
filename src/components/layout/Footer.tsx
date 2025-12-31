import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-amtay-midnight text-white">
      <div className="container-premium section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white text-amtay-blue flex items-center justify-center font-black text-xl">
                A
              </div>
              <div>
                <div className="font-bold text-xl tracking-tight">AMTAY FC</div>
                <div className="text-white/60 text-sm">Est. 2023</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              A rising professional club from Kano, built to develop young talent and compete at the highest levels.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amtay-royal transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amtay-royal transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amtay-royal transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amtay-royal transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['About Us', 'First Team', 'Academy', 'Fixtures', 'News'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Club */}
          <div>
            <h4 className="font-semibold text-lg mb-6">The Club</h4>
            <ul className="space-y-4">
              {['History', 'Management', 'Facilities', 'Partners', 'Contact'].map((link) => (
                <li key={link}>
                  <Link to="#" className="text-white/70 hover:text-white transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>Federal College of Education, Kano, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Phone size={18} className="shrink-0" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-white/70 text-sm">
                <Mail size={18} className="shrink-0" />
                <span>info@amtayfc.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 AMTAY FC. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-white/50 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-white/50 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
