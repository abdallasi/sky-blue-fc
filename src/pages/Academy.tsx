import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { GraduationCap, Target, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Academy = () => {
  const { content } = useContent();
  const philAnim = useScrollAnimation({ threshold: 0.2 });
  const pathAnim = useScrollAnimation({ threshold: 0.1 });
  const successAnim = useScrollAnimation({ threshold: 0.2 });
  const statsAnim = useScrollAnimation({ threshold: 0.2 });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero-dynamic text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--electric-cyan))]/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        </div>
        <div className="absolute inset-0 bg-noise opacity-40" />
        <div className="container-premium relative">
          <span className="text-label animate-fade-up">Youth Development</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            {content.academy.heroTitle}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2 leading-relaxed">
            {content.academy.heroSubtitle}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Philosophy Section - Split Screen */}
      <section className="section-padding">
        <div className="container-premium">
          <div ref={philAnim.ref as React.RefObject<HTMLDivElement>} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${philAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <span className="text-label-blue">Our Approach</span>
              <h2 className="heading-section mt-2 mb-8">Academy Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {content.academy.philosophy}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Technical Excellence', 'Tactical Awareness', 'Physical Development', 'Mental Strength'].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover-lift transition-all duration-500 ${philAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <CheckCircle className="w-5 h-5 text-[hsl(var(--electric-cyan))] shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${philAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              {content.images.academyHero ? (
                <img src={content.images.academyHero} alt="AMTAY Academy" className="w-full aspect-square object-cover rounded-3xl" />
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(var(--primary-blue))]/10 to-[hsl(var(--royal-blue))]/10 flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-[hsl(var(--primary-blue))]/30" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Player Pathway */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label-blue">Development</span>
            <h2 className="heading-section mt-2">Player Pathway</h2>
          </div>

          <div ref={pathAnim.ref as React.RefObject<HTMLDivElement>} className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(var(--primary-blue))] via-[hsl(var(--royal-blue))] to-[hsl(var(--electric-cyan))] -translate-y-1/2" />

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {content.pathway.map((step, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 ${pathAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="card-premium text-center group hover-lift">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] flex items-center justify-center mx-auto mb-4 relative z-10 group-hover:shadow-lg group-hover:shadow-[hsl(var(--royal-blue))]/30 transition-shadow">
                      <span className="text-2xl font-black text-white">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {index < content.pathway.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-[hsl(var(--electric-cyan))]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Highlight */}
      <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[200px]" />
        <div className="container-premium relative">
          <div
            ref={successAnim.ref as React.RefObject<HTMLDivElement>}
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${successAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
              <Award className="w-10 h-10 text-amber-400" />
            </div>
            <span className="text-label">Achievement</span>
            <h2 className="heading-section mt-2 mb-8">Success Story</h2>
            <p className="text-xl text-white/80 leading-relaxed">
              {content.academy.successHighlight}
            </p>
          </div>
        </div>
      </section>

      {/* Academy Stats */}
      <section className="section-padding">
        <div className="container-premium">
          <div ref={statsAnim.ref as React.RefObject<HTMLDivElement>} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '50+', label: 'Academy Players' },
              { icon: GraduationCap, value: '15+', label: 'Graduated to Senior Team' },
              { icon: Target, value: '4', label: 'National Team Invites' },
              { icon: Award, value: '100%', label: 'Scholarship Rate' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`card-premium text-center group hover-lift transition-all duration-700 ${statsAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[hsl(var(--primary-blue))] transition-colors">
                    <Icon className="w-8 h-8 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-4xl font-black text-[hsl(var(--midnight-blue))] mb-2">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academy;
