import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { GraduationCap, Target, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

const Academy = () => {
  const { content } = useContent();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-amtay-blue/10 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">Youth Development</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-in">
            {content.academy.heroTitle}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {content.academy.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-label">Our Approach</span>
              <h2 className="heading-section mt-2 mb-8">Academy Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {content.academy.philosophy}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Technical Excellence', 'Tactical Awareness', 'Physical Development', 'Mental Strength'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                    <CheckCircle className="w-5 h-5 text-amtay-royal shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {content.images.academyHero ? (
                <img 
                  src={content.images.academyHero} 
                  alt="AMTAY Academy"
                  className="w-full aspect-square object-cover rounded-3xl"
                />
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-amtay-blue/10 to-amtay-royal/10 flex items-center justify-center">
                  <GraduationCap className="w-32 h-32 text-amtay-blue/30" />
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
            <span className="text-label">Development</span>
            <h2 className="heading-section mt-2">Player Pathway</h2>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-amtay-blue via-amtay-royal to-amtay-midnight -translate-y-1/2" />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {content.pathway.map((step, index) => (
                <div key={index} className="relative">
                  <div className="card-premium text-center group">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amtay-blue to-amtay-midnight flex items-center justify-center mx-auto mb-4 relative z-10">
                      <span className="text-2xl font-black text-white">{step.step}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.description}</p>
                  </div>
                  {index < content.pathway.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-amtay-royal" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Highlight */}
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-8">
              <Award className="w-10 h-10 text-amber-400" />
            </div>
            <span className="text-label text-amtay-royal">Achievement</span>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '50+', label: 'Academy Players' },
              { icon: GraduationCap, value: '15+', label: 'Graduated to Senior Team' },
              { icon: Target, value: '4', label: 'National Team Invites' },
              { icon: Award, value: '100%', label: 'Scholarship Rate' },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="card-premium text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-amtay-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amtay-blue transition-colors">
                    <Icon className="w-8 h-8 text-amtay-blue group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-4xl font-black text-amtay-midnight mb-2">{stat.value}</div>
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
