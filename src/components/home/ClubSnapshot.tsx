import { CheckCircle2, Sparkles, Trophy, Star } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useRef, useState, useEffect } from 'react';

export const ClubSnapshot = () => {
  const { content } = useContent();
  const { snapshot } = content;
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
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/2 right-0 w-[700px] h-[700px] bg-[hsl(var(--royal-blue))]/5 rounded-full blur-[180px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[hsl(var(--electric-cyan))]/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />
      
      <div className="container-premium relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content - Slides from left */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-[hsl(var(--electric-cyan))]/20 mb-8">
              <Sparkles className="w-4 h-4 text-[hsl(var(--electric-cyan))]" />
              <span className="text-sm font-semibold text-[hsl(var(--primary-blue))]">Est. 2023</span>
            </div>
            
            <h2 className="heading-section mb-6">
              {snapshot.headline}
            </h2>
            
            <p className="text-body text-lg mb-10 leading-relaxed">
              {snapshot.description}
            </p>

            {/* Achievements with Staggered Animation */}
            <div className="space-y-4">
              {snapshot.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-4 p-5 rounded-2xl bg-white border border-border/50 hover:border-[hsl(var(--electric-cyan))]/30 hover:shadow-lg transition-all duration-300 group ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed pt-2">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card - Slides from right */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="relative rounded-[2rem] bg-gradient-to-br from-[hsl(var(--primary-blue))] via-[hsl(var(--royal-blue))] to-[hsl(var(--midnight-blue))] p-1.5 shadow-2xl">
              <div className="rounded-[1.75rem] bg-gradient-to-br from-white to-muted p-12">
                <div className="aspect-square flex items-center justify-center relative">
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-blue)) 1px, transparent 0)`,
                      backgroundSize: '28px 28px'
                    }}
                  />
                  
                  <div className="text-center relative">
                    {/* Main Logo */}
                    <div className="w-36 h-36 rounded-[2rem] bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] flex items-center justify-center mx-auto mb-8 shadow-2xl hover:scale-105 transition-transform">
                      <span className="text-6xl font-black text-white">A</span>
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-2">AMTAY FC</h3>
                    <p className="text-muted-foreground font-medium text-lg">Kano, Nigeria</p>
                    
                    {/* Status Badge */}
                    <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[hsl(var(--electric-cyan))]/10 border border-[hsl(var(--electric-cyan))]/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--electric-cyan))] animate-pulse" />
                      <span className="text-sm font-bold text-[hsl(var(--primary-blue))]">International League</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className={`absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 border border-border/50 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-[hsl(var(--electric-cyan))]" />
                <div>
                  <div className="text-3xl font-black text-[hsl(var(--royal-blue))]">2023</div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Founded</div>
                </div>
              </div>
            </div>
            
            <div className={`absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-2xl p-5 border border-border/50 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-amber-500" />
                <div>
                  <div className="text-xl font-black text-foreground">U-17 Stars</div>
                  <div className="text-xs text-muted-foreground font-semibold">4 National Call-ups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
