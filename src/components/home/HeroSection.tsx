import { Link } from 'react-router-dom';
import { ChevronRight, Play, Zap } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useCountUp } from '@/hooks/useCountUp';
const AnimatedStat = ({
  value,
  label,
  delay
}: {
  value: string;
  label: string;
  delay: number;
}) => {
  // Extract numeric value and suffix
  const numericMatch = value.match(/^(\d+)/);
  const numericValue = numericMatch ? parseInt(numericMatch[1]) : 0;
  const suffix = value.replace(/^\d+/, '');
  const {
    formattedCount,
    ref
  } = useCountUp({
    end: numericValue,
    duration: 2000,
    delay,
    suffix
  });
  return <div className="text-center group" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 group-hover:text-[hsl(var(--electric-cyan))] transition-colors duration-300">
        {formattedCount}
      </div>
      <div className="text-xs text-white/50 uppercase tracking-[0.2em] font-semibold">{label}</div>
    </div>;
};
export const HeroSection = () => {
  const {
    content
  } = useContent();
  const {
    hero,
    stats
  } = content;
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero-dynamic" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-1/3 left-1/6 w-[400px] h-[400px] bg-[hsl(var(--electric-cyan))]/10 rounded-full blur-[120px] animate-float" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-1/2 right-1/3 w-[350px] h-[350px] bg-[hsl(var(--primary-blue))]/15 rounded-full blur-[100px] animate-float" style={{
        animationDelay: '4s'
      }} />
        
        {/* Motion blur effect lines */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--electric-cyan))]/20 to-transparent animate-shimmer" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{
        animationDelay: '1s'
      }} />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
      backgroundSize: '50px 50px'
    }} />

      <div className="relative container-premium text-center text-white py-32">
        {/* Badge with Neon Effect */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-10 animate-fade-up group hover:border-[hsl(var(--electric-cyan))]/30 transition-colors">
          <Zap className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
          <span className="text-sm font-semibold tracking-wide">{hero.badge}</span>
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--electric-cyan))] animate-pulse" />
        </div>

        {/* Main Headline - Aggressive Typography */}
        <h1 className="heading-hero max-w-5xl mx-auto mb-8 animate-fade-up-delay-1">
          <span className="block">AMTAY FC   </span>
          <span className="block mt-2">Fierce. Unstoppable. Fast 
         
        </h1>

        {/* Sub-headline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto mb-14 leading-relaxed font-light animate-fade-up-delay-2">
          From Kano to National Stardom: Developing Nigeria's future football legends.
        </p>

        {/* CTA Buttons with Neon Effects */}
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

        {/* Dynamic Stats Preview with Count-up Animation */}
        <div className="mt-24 lg:mt-32 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-12 max-w-4xl mx-auto animate-fade-up-delay-4">
          <AnimatedStat value={stats[3]?.value || '68%'} label="Win Rate" delay={0} />
          <AnimatedStat value={stats[4]?.value || '298'} label="Goals Scored" delay={200} />
          <AnimatedStat value={stats[1]?.value || '120'} label="Match Streak" delay={400} />
          <AnimatedStat value="4" label="U-17 Call-ups" delay={600} />
        </div>

        {/* Punchy Copy Line */}
        <p className="mt-12 text-white/40 text-sm font-medium tracking-wide animate-fade-up" style={{
        animationDelay: '1s'
      }}>
          120 matches unbeaten. 298 goals. And we're only getting started.
        </p>
      </div>

      {/* Scroll Indicator with Neon Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up" style={{
      animationDelay: '1.2s'
    }}>
        <div className="w-7 h-12 rounded-full border-2 border-white/20 flex items-start justify-center p-2 hover:border-[hsl(var(--electric-cyan))]/50 transition-colors group">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce group-hover:bg-[hsl(var(--electric-cyan))] transition-colors" />
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>;
};
