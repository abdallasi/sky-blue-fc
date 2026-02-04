import { Eye, Target, ArrowRight, Rocket, Flag } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useRef, useState, useEffect } from 'react';

export const VisionMission = () => {
  const { content } = useContent();
  const { visionMission } = content;
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
    <section ref={sectionRef} className="section-padding bg-gradient-to-b from-muted/30 via-background to-muted/20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[hsl(var(--royal-blue))]/5 rounded-full blur-[200px]" />
      
      <div className="container-premium relative">
        <div className="text-center mb-20">
          <span className="text-label">Purpose</span>
          <h2 className="heading-section mt-4">Vision & Mission</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Our north star for building a world-class football institution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card - Slides from Left */}
          <div 
            className={`group relative transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative card-premium h-full group-hover:bg-transparent group-hover:text-white transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--electric-cyan))] to-[hsl(var(--royal-blue))] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Vision</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/60">Our Ultimate Goal</p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed text-muted-foreground group-hover:text-white/85 transition-colors">
                {visionMission.vision}
              </p>
              
              <div className="mt-10 flex items-center gap-2 text-[hsl(var(--electric-cyan))] group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Our Purpose</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mission Card - Slides from Right */}
          <div 
            className={`group relative transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--royal-blue))] to-[hsl(var(--primary-blue))] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative card-premium h-full group-hover:bg-transparent group-hover:text-white transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[hsl(var(--royal-blue))] to-[hsl(var(--primary-blue))] flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Mission</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-white/60">How We Achieve It</p>
                </div>
              </div>
              
              <ul className="space-y-5">
                {visionMission.mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-[hsl(var(--royal-blue))]/10 group-hover:bg-white/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <span className="text-sm font-black text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground group-hover:text-white/85 transition-colors leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 flex items-center gap-2 text-[hsl(var(--royal-blue))] group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                <Flag className="w-4 h-4" />
                <span className="text-sm font-bold uppercase tracking-wider">Our Goals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
