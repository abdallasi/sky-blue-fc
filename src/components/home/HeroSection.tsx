import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero-overlay" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-float" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative container-premium text-center text-white py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm font-medium">Kano State Premier League</span>
        </div>

        {/* Main Headline */}
        <h1 className="heading-hero max-w-5xl mx-auto mb-6 animate-fade-up-delay-1">
          AMTAY FC — The Future of{' '}
          <span className="relative">
            Elite Football
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 10C50 4 100 2 150 2C200 2 250 4 298 10" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                  <stop stopColor="#0058FF" />
                  <stop offset="1" stopColor="#0058FF" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up-delay-2">
          A rising professional club from Kano, built to develop young talent and compete at the highest levels.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
          <Link to="/team" className="btn-hero group">
            Meet the Squad
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/about" className="btn-hero-outline group">
            <Play className="mr-2 w-4 h-4" />
            Our Vision
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {[
            { value: '68%', label: 'Win Rate' },
            { value: '298', label: 'Goals Scored' },
            { value: '120', label: 'Match Streak' },
            { value: '4', label: 'U-17 Call-ups' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <div className="text-3xl sm:text-4xl font-black mb-1">{stat.value}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
