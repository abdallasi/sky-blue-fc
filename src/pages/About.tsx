import { Layout } from '@/components/layout/Layout';
import { Building2, Heart, GraduationCap, Dumbbell, Stethoscope } from 'lucide-react';

const milestones = [
  { year: '2023', title: 'Club Founded', description: 'AMTAY FC established by Engr. Dr. Abdulwahab Tayyeb' },
  { year: '2023', title: 'Ahlan League Debut', description: 'First competitive season in Kano Ahlan League' },
  { year: '2023', title: 'National Recognition', description: '4 players invited to Nigeria U-17 screening' },
  { year: '2024', title: 'League Champions', description: 'Recognized as top team in the league' },
  { year: '2024', title: 'Premier League', description: 'Promotion to Kano State Premier League' },
];

const facilities = [
  { 
    icon: Building2, 
    name: 'Training Ground', 
    location: 'Federal College of Education, Kano',
    description: 'Professional-grade training facilities'
  },
  { 
    icon: Dumbbell, 
    name: 'Fitness Center', 
    location: 'Meeqat Gym',
    description: 'State-of-the-art fitness equipment'
  },
  { 
    icon: GraduationCap, 
    name: 'Youth Academy', 
    location: 'Dedicated Development Center',
    description: 'Programs for emerging talents'
  },
  { 
    icon: Stethoscope, 
    name: 'Medical Recovery Hub', 
    location: 'Integrated Care Facility',
    description: 'Free recovery and rehabilitation'
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-hero text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amtay-royal/20 rounded-full blur-3xl" />
        </div>
        <div className="container-premium relative">
          <span className="text-label text-amtay-royal">Our Story</span>
          <h1 className="heading-hero max-w-4xl mt-4 mb-6">
            Building the Future of Nigerian Football
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            From humble beginnings to national recognition, discover the journey of AMTAY FC.
          </p>
        </div>
      </section>

      {/* Club Story */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-label">The Beginning</span>
              <h2 className="heading-section mt-2 mb-6">Our Club Story</h2>
              <div className="space-y-4 text-body">
                <p>
                  AMTAY FC was founded in 2023 by <strong>Engr. Dr. Abdulwahab Tayyeb</strong>, 
                  a visionary leader, philanthropist, and football enthusiast committed to youth empowerment.
                </p>
                <p>
                  Established to identify, train, and elevate young players, the club quickly gained 
                  recognition for its strong performances in the Kano Ahlan League.
                </p>
                <p>
                  With disciplined management and a clear philosophy, the club earned a deserved 
                  promotion to the <strong>Kano State Premier League</strong>—marking a major milestone 
                  in its mission to shape the next generation of Nigerian stars.
                </p>
              </div>
            </div>

            {/* Founder Card */}
            <div className="card-premium bg-gradient-to-br from-accent to-background">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-2xl bg-amtay-blue/10 flex items-center justify-center shrink-0">
                  <Heart className="w-10 h-10 text-amtay-blue" />
                </div>
                <div>
                  <span className="text-label">Founder & Chairman</span>
                  <h3 className="text-2xl font-bold mt-1 mb-4">Engr. Dr. Abdulwahab Tayyeb</h3>
                  <p className="text-body">
                    A visionary engineer and philanthropist, Dr. Abdulwahab Tayyeb created AMTAY FC 
                    to empower youth through structured football development. His commitment to community 
                    upliftment and excellence has shaped the club's identity and its rapidly rising status 
                    among Nigeria's most promising football institutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/50">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Our Journey</span>
            <h2 className="heading-section mt-2">Key Milestones</h2>
          </div>

          {/* Horizontal Scroll Timeline */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 snap-center"
                >
                  <div className="card-premium h-full relative">
                    <div className="absolute top-0 left-8 w-1 h-8 bg-amtay-royal rounded-full -translate-y-full" />
                    <div className="text-4xl font-black text-amtay-royal/20 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding">
        <div className="container-premium">
          <div className="text-center mb-16">
            <span className="text-label">Infrastructure</span>
            <h2 className="heading-section mt-2">Our Facilities</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <div key={index} className="card-premium text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-amtay-blue/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-amtay-blue group-hover:text-white transition-colors">
                    <Icon className="w-8 h-8 text-amtay-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{facility.name}</h3>
                  <p className="text-sm text-amtay-royal font-medium mb-2">{facility.location}</p>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
