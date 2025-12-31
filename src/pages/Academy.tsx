import { Layout } from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { 
  Search, 
  GraduationCap, 
  Users, 
  Globe, 
  Briefcase, 
  ChevronRight,
  Star,
  Trophy,
  Target
} from 'lucide-react';

const pathway = [
  { step: 1, title: 'Talent Discovery', description: 'Scouts identify promising young players across Kano', icon: Search },
  { step: 2, title: 'Academy Training', description: 'Structured development with professional coaches', icon: GraduationCap },
  { step: 3, title: 'Senior Team Integration', description: 'Top performers join the first team squad', icon: Users },
  { step: 4, title: 'National Trials & Exposure', description: 'Opportunities at national team screenings', icon: Globe },
  { step: 5, title: 'Professional Opportunities', description: 'Pathways to professional contracts', icon: Briefcase },
];

const Academy = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">Youth Development</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6">
            AMTAY Academy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Developing the next generation of Nigerian football stars through 
            structured training and professional pathways.
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-label">Our Approach</span>
              <h2 className="heading-section mt-2 mb-6">Academy Philosophy</h2>
              <p className="text-body mb-8">
                AMTAY Academy focuses on structured player development, technical excellence, 
                discipline, and national exposure. Every player progresses through a proven 
                pathway designed to maximize potential.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Star, title: 'Technical Excellence', desc: 'Master fundamental skills' },
                  { icon: Target, title: 'Tactical Awareness', desc: 'Understand the game deeply' },
                  { icon: Trophy, title: 'Competitive Spirit', desc: 'Build winning mentality' },
                  { icon: Users, title: 'Team Values', desc: 'Grow together as one' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-accent/50">
                      <div className="w-10 h-10 rounded-lg bg-amtay-blue/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-amtay-blue" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amtay-blue/10 to-amtay-royal/5 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <GraduationCap className="w-24 h-24 text-amtay-blue mx-auto mb-6" />
                  <div className="text-3xl font-black text-amtay-midnight">AMTAY Academy</div>
                  <div className="text-muted-foreground mt-2">Building Champions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Pathway */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">The Journey</span>
            <h2 className="heading-section mt-2">Player Pathway</h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {pathway.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  <div className="card-premium text-center h-full">
                    <div className="w-12 h-12 rounded-2xl bg-amtay-blue flex items-center justify-center mx-auto mb-4 text-white font-black text-lg">
                      {step.step}
                    </div>
                    <Icon className="w-8 h-8 text-amtay-royal mx-auto mb-3" />
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {index < pathway.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 -right-2 w-6 h-6 text-amtay-blue/30 -translate-y-1/2 z-10" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-label text-amtay-royal">Success Story</span>
            <h2 className="heading-section mt-2 mb-8">National Recognition</h2>
            
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-12">
              <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-6" />
              <p className="text-xl lg:text-2xl leading-relaxed mb-8">
                Four AMTAY Academy players were invited to Nigeria's{' '}
                <strong className="text-amtay-royal">U-17 National Team Screening</strong> at the 
                Abuja Goal Project Stadium — an early validation of the club's development model.
              </p>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black">4</div>
                  <div className="text-sm text-white/60">Players Called Up</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-4xl font-black">U-17</div>
                  <div className="text-sm text-white/60">National Team</div>
                </div>
              </div>
            </div>

            <Link to="/contact" className="btn-hero mt-12 inline-flex">
              Join the Academy
              <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academy;
