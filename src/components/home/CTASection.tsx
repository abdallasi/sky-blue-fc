import { Link } from 'react-router-dom';
import { ChevronRight, Users, GraduationCap, Globe, Zap } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--midnight-blue))] via-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))]" />
      
      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[hsl(var(--royal-blue))]/25 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--electric-cyan))]/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Motion Lines */}
        <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[hsl(var(--electric-cyan))]/30 to-transparent animate-shimmer" />
        <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ animationDelay: '1.5s' }} />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '70px 70px'
        }}
      />

      <div className="container-premium relative">
        <div className={`text-center text-white mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-10 hover:border-[hsl(var(--electric-cyan))]/50 transition-colors">
            <Zap className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
            <span className="text-sm font-semibold">Join the Movement</span>
          </span>
          <h2 className="heading-section max-w-4xl mx-auto mb-8">
            Be Part of AMTAY FC's Journey to{' '}
            <span className="text-gradient-cyan">Excellence</span>
          </h2>
          <p className="text-xl lg:text-2xl text-white/65 max-w-2xl mx-auto font-light">
            Whether you're a young talent, a supporter, or a potential partner — there's a place for you in our story.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Join Academy Card */}
          <Link 
            to="/academy" 
            className={`group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 hover:bg-white/15 hover:border-[hsl(var(--electric-cyan))]/40 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(var(--electric-cyan))]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">Join the Academy</h3>
              <p className="text-white/55 mb-6 leading-relaxed">Start your journey with structured training and professional development.</p>
              
              <div className="flex items-center gap-2 text-[hsl(var(--electric-cyan))] font-semibold">
                <span className="text-sm">Apply Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Meet the Team Card */}
          <Link 
            to="/team" 
            className={`group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 hover:bg-white/15 hover:border-[hsl(var(--electric-cyan))]/40 transition-all duration-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '350ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-[hsl(var(--royal-blue))]/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--royal-blue))] to-[hsl(var(--primary-blue))] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">Meet the Squad</h3>
              <p className="text-white/55 mb-6 leading-relaxed">Discover the talented players and staff driving our success.</p>
              
              <div className="flex items-center gap-2 text-[hsl(var(--electric-cyan))] font-semibold">
                <span className="text-sm">View Team</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Global Vision Card */}
          <Link 
            to="/about" 
            className={`group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 hover:bg-white/15 hover:border-[hsl(var(--electric-cyan))]/40 transition-all duration-500 sm:col-span-2 lg:col-span-1 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">Global Ambition</h3>
              <p className="text-white/55 mb-6 leading-relaxed">From Kano to the World — developing Africa's future stars.</p>
              
              <div className="flex items-center gap-2 text-[hsl(var(--electric-cyan))] font-semibold">
                <span className="text-sm">Our Story</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Primary CTA Button */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link 
            to="/contact" 
            className="btn-neon inline-flex items-center gap-3"
          >
            Get in Touch
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-white/40 text-sm">
            Ready to partner with us? Let's talk.
          </p>
        </div>
      </div>
    </section>
  );
};
