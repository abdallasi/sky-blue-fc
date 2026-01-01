import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Award, Building, Calendar, MapPin, User } from 'lucide-react';

const About = () => {
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
          <span className="text-label text-amtay-royal">Our Story</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-in">
            {content.about.heroTitle}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {content.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Club Story */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-label">History</span>
              <h2 className="heading-section mt-2 mb-8">{content.about.storyTitle}</h2>
              <div className="space-y-6">
                {content.about.storyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-amtay-blue/10 to-amtay-royal/10 flex items-center justify-center">
                <Award className="w-32 h-32 text-amtay-blue/30" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-amtay-royal to-amtay-blue rounded-3xl blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {content.images.founderPhoto ? (
                <img 
                  src={content.images.founderPhoto} 
                  alt={content.about.founderName}
                  className="w-full aspect-[4/5] object-cover rounded-3xl"
                />
              ) : (
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-amtay-midnight to-amtay-blue flex items-center justify-center">
                  <User className="w-32 h-32 text-white/20" />
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-label">Leadership</span>
              <h2 className="heading-section mt-2 mb-4">Founder & Chairman</h2>
              <h3 className="text-2xl font-bold text-amtay-blue mb-6">{content.about.founderName}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.about.founderBio}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Journey</span>
            <h2 className="heading-section mt-2">Our Milestones</h2>
          </div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {content.milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className="card-premium w-72 shrink-0 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amtay-blue/10 flex items-center justify-center group-hover:bg-amtay-blue transition-colors">
                      <Calendar className="w-6 h-6 text-amtay-blue group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-2xl font-black text-amtay-midnight">{milestone.year}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground text-sm">{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding bg-amtay-midnight text-white">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label text-amtay-royal">Infrastructure</span>
            <h2 className="heading-section mt-2">Our Facilities</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.facilities.map((facility, index) => (
              <div 
                key={index} 
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-amtay-royal/20 flex items-center justify-center mb-4 group-hover:bg-amtay-royal transition-colors">
                  <Building className="w-7 h-7 text-amtay-royal group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-lg mb-2">{facility.name}</h3>
                <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{facility.location}</span>
                </div>
                <p className="text-white/70 text-sm">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
