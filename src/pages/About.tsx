import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { Award, Building, Calendar, MapPin, User, Quote } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useCountUp } from '@/hooks/useCountUp';

const AnimatedMilestone = ({ milestone, index }: { milestone: { year: string; title: string; description: string }; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`card-premium w-72 shrink-0 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--primary-blue))]/10 flex items-center justify-center group-hover:bg-[hsl(var(--primary-blue))] transition-colors">
          <Calendar className="w-6 h-6 text-[hsl(var(--primary-blue))] group-hover:text-white transition-colors" />
        </div>
        <span className="text-2xl font-black text-[hsl(var(--midnight-blue))]">{milestone.year}</span>
      </div>
      <h3 className="font-bold text-lg mb-2">{milestone.title}</h3>
      <p className="text-muted-foreground text-sm">{milestone.description}</p>
    </div>
  );
};

const About = () => {
  const { content } = useContent();
  const heroAnim = useScrollAnimation({ threshold: 0.1 });
  const storyAnim = useScrollAnimation({ threshold: 0.2 });
  const founderAnim = useScrollAnimation({ threshold: 0.2 });
  const facilitiesAnim = useScrollAnimation({ threshold: 0.2 });

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
          <span className="text-label animate-fade-up">Our Story</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6 animate-fade-up-delay-1">
            {content.about.heroTitle}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl animate-fade-up-delay-2 leading-relaxed">
            {content.about.heroSubtitle}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Club Story - Split Screen */}
      <section className="section-padding">
        <div className="container-premium">
          <div
            ref={storyAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className={`transition-all duration-1000 ${storyAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <span className="text-label-blue">History</span>
              <h2 className="heading-section mt-2 mb-8">{content.about.storyTitle}</h2>
              <div className="space-y-6">
                {content.about.storyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 ${storyAnim.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              {content.images.aboutStoryImages && content.images.aboutStoryImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {content.images.aboutStoryImages.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Club story ${index + 1}`}
                      className={`rounded-2xl object-cover w-full ${index === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="aspect-square rounded-3xl bg-gradient-to-br from-[hsl(var(--primary-blue))]/10 to-[hsl(var(--royal-blue))]/10 flex items-center justify-center overflow-hidden">
                  <Award className="w-32 h-32 text-[hsl(var(--primary-blue))]/30" />
                </div>
              )}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-gradient-to-br from-[hsl(var(--royal-blue))] to-[hsl(var(--primary-blue))] rounded-3xl blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div
            ref={founderAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className={`order-2 lg:order-1 relative transition-all duration-1000 ${founderAnim.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {content.images.founderPhoto ? (
                <img
                  src={content.images.founderPhoto}
                  alt={content.about.founderName}
                  className="w-full aspect-[4/5] object-cover rounded-3xl"
                />
              ) : (
                <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-[hsl(var(--midnight-blue))] to-[hsl(var(--primary-blue))] flex items-center justify-center relative overflow-hidden">
                  <User className="w-32 h-32 text-white/20" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
                    <Quote className="w-8 h-8 text-[hsl(var(--electric-cyan))] mb-3" />
                    <p className="text-white/90 text-sm italic leading-relaxed">
                      "I believe in youth. I believe in speed. I believe in football that changes lives."
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className={`order-1 lg:order-2 transition-all duration-1000 delay-200 ${founderAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-label-blue">Leadership</span>
              <h2 className="heading-section mt-2 mb-4">Founder & Chairman</h2>
              <h3 className="text-2xl font-bold text-[hsl(var(--primary-blue))] mb-6">{content.about.founderName}</h3>
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
            <span className="text-label-blue">Journey</span>
            <h2 className="heading-section mt-2">Our Milestones</h2>
          </div>

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 min-w-max">
              {content.milestones.map((milestone, index) => (
                <AnimatedMilestone key={index} milestone={milestone} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="section-padding bg-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-30" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[hsl(var(--royal-blue))]/10 rounded-full blur-[150px]" />
        <div className="container-premium relative">
          <div className="text-center mb-16">
            <span className="text-label">Infrastructure</span>
            <h2 className="heading-section mt-2">Our Facilities</h2>
          </div>

          <div
            ref={facilitiesAnim.ref as React.RefObject<HTMLDivElement>}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {content.facilities.map((facility, index) => (
              <div
                key={index}
                className={`card-glass group hover:bg-white/10 transition-all duration-700 ${facilitiesAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--royal-blue))]/20 flex items-center justify-center mb-4 group-hover:bg-[hsl(var(--royal-blue))] transition-colors">
                  <Building className="w-7 h-7 text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors" />
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
