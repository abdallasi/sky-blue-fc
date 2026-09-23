import { CheckCircle2, Sparkles, Trophy, Star } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useRef, useState, useEffect } from 'react';
import clubMoment from '@/assets/placeholder-club-moment.jpg';

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

          {/* Photography-led panel */}
          <div className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <figure className="overflow-hidden rounded-[1.75rem] bg-muted shadow-[0_40px_80px_-40px_hsl(217_100%_12%/0.35)]">
              <img
                src={content.images?.showcaseMoment || clubMoment}
                alt="AMTAY FC club moment"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover object-center"
              />
            </figure>

            {/* Floating plates */}
            <div className={`absolute -top-5 -right-3 sm:-right-6 bg-background rounded-2xl shadow-2xl px-5 py-4 border border-border transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[hsl(var(--royal-blue))]" />
                <div>
                  <div className="text-2xl font-black tracking-tighter text-foreground">2023</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.18em]">Founded</div>
                </div>
              </div>
            </div>

            <div className={`absolute -bottom-5 -left-3 sm:-left-6 bg-background rounded-2xl shadow-2xl px-5 py-4 border border-border transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-amber-500" />
                <div>
                  <div className="text-lg font-black tracking-tight text-foreground">U-17 Stars</div>
                  <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.18em]">4 National Call-ups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
