import { Eye, Target, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const VisionMission = () => {
  const { content } = useContent();
  const { visionMission } = content;

  return (
    <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
      <div className="container-premium">
        <div className="text-center mb-16">
          <span className="text-label">Purpose</span>
          <h2 className="heading-section mt-3">Vision & Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative card-premium h-full group-hover:bg-transparent group-hover:text-white transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--primary-blue))]/10 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Eye className="w-7 h-7 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold">Vision</h3>
              </div>
              
              <p className="text-lg leading-relaxed text-muted-foreground group-hover:text-white/80 transition-colors">
                {visionMission.vision}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-[hsl(var(--royal-blue))] group-hover:text-white/70 transition-colors">
                <span className="text-sm font-semibold uppercase tracking-wider">Our Purpose</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--royal-blue))] to-[hsl(var(--primary-blue))] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative card-premium h-full group-hover:bg-transparent group-hover:text-white transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--royal-blue))]/10 group-hover:bg-white/10 flex items-center justify-center transition-colors">
                  <Target className="w-7 h-7 text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-bold">Mission</h3>
              </div>
              
              <ul className="space-y-4">
                {visionMission.mission.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[hsl(var(--royal-blue))]/10 group-hover:bg-white/10 flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                      <span className="text-xs font-bold text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors">{index + 1}</span>
                    </div>
                    <span className="text-muted-foreground group-hover:text-white/80 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex items-center gap-2 text-[hsl(var(--royal-blue))] group-hover:text-white/70 transition-colors">
                <span className="text-sm font-semibold uppercase tracking-wider">Our Goals</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
