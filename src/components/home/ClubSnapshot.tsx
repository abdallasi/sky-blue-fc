import { CheckCircle2, Sparkles } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const ClubSnapshot = () => {
  const { content } = useContent();
  const { snapshot } = content;

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[hsl(var(--royal-blue))]/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="container-premium relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--royal-blue))]" />
              <span className="text-sm font-medium text-[hsl(var(--primary-blue))]">Est. 2023</span>
            </div>
            
            <h2 className="heading-section mb-6">
              {snapshot.headline}
            </h2>
            
            <p className="text-body text-lg mb-10">
              {snapshot.description}
            </p>

            {/* Achievements */}
            <div className="space-y-4">
              {snapshot.achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 rounded-2xl bg-accent/50 hover:bg-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center shrink-0 group-hover:bg-[hsl(var(--primary-blue))] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">{achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-[hsl(var(--primary-blue))] via-[hsl(var(--royal-blue))] to-[hsl(var(--midnight-blue))] p-1">
              <div className="rounded-[22px] bg-gradient-to-br from-white to-accent p-10">
                <div className="aspect-square flex items-center justify-center relative">
                  {/* Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary-blue)) 1px, transparent 0)`,
                      backgroundSize: '24px 24px'
                    }}
                  />
                  
                  <div className="text-center relative">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <span className="text-5xl font-black text-white">A</span>
                    </div>
                    <h3 className="text-3xl font-black text-foreground mb-2">AMTAY FC</h3>
                    <p className="text-muted-foreground font-medium">Kano, Nigeria</p>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-semibold">Premier League</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-border">
              <div className="text-3xl font-black text-[hsl(var(--royal-blue))]">2023</div>
              <div className="text-xs text-muted-foreground font-medium">Founded</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
