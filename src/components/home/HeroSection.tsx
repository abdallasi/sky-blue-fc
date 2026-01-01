import { Link } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const HeroSection = () => {
  const { content } = useContent();
  const { hero, stats } = content;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-hero-overlay" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[hsl(var(--primary-blue))]/10 rounded-full blur-[80px]" />
      </div>

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative container-premium text-center text-white py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-10 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-medium tracking-wide">{hero.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="heading-hero max-w-5xl mx-auto mb-8 animate-fade-up-delay-1">
          {hero.headline.split('Elite Football').map((part, i) => (
            i === 0 ? (
              <span key={i}>
                {part}
                <span className="relative inline-block">
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
              </span>
            ) : null
          ))}
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-14 leading-relaxed font-light animate-fade-up-delay-2">
          {hero.subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
          <Link to="/team" className="btn-hero group">
            {hero.button1}
            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/about" className="btn-hero-outline group">
            <Play className="mr-2 w-4 h-4" />
            {hero.button2}
          </Link>
        </div>

        {/* Stats Preview */}
        <div className="mt-24 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { value: stats[3]?.value || '68%', label: 'Win Rate' },
            { value: stats[4]?.value || '298', label: 'Goals Scored' },
            { value: stats[1]?.value || '120', label: 'Match Streak' },
            { value: '4', label: 'U-17 Call-ups' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="text-3xl sm:text-4xl font-black mb-2 group-hover:scale-105 transition-transform">{stat.value}</div>
              <div className="text-xs text-white/50 uppercase tracking-[0.2em] font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up" style={{ animationDelay: '1s' }}>
        <div className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};
