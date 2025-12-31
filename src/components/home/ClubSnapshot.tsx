import { CheckCircle2 } from 'lucide-react';

const achievements = [
  'Promotion to the Kano State Premier League',
  'Strong performance in the Ahlan League',
  'Four players invited to Nigeria\'s U-17 screening',
  'Rapid growth and national-level visibility',
];

export const ClubSnapshot = () => {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="text-label">Our Story</span>
            <h2 className="heading-section mt-2 mb-6">
              A Club Built for{' '}
              <span className="text-gradient-blue">Excellence</span>
            </h2>
            <p className="text-body mb-8">
              AMTAY FC is one of Kano's fastest-rising football institutions. Built in 2023 
              with a mission to develop young athletes, the club has earned recognition for 
              its professionalism, dominance, and player development approach.
            </p>

            {/* Achievements Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                >
                  <CheckCircle2 className="w-5 h-5 text-amtay-royal shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{achievement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="order-1 lg:order-2 relative">
            <div className="aspect-square relative">
              {/* Background Decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-amtay-blue/10 to-amtay-royal/5 rounded-3xl" />
              
              {/* Main Card */}
              <div className="absolute inset-8 bg-gradient-hero rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 rounded-2xl bg-white text-amtay-blue flex items-center justify-center font-black text-5xl mx-auto mb-6 shadow-xl">
                    A
                  </div>
                  <div className="font-bold text-2xl tracking-tight">AMTAY FC</div>
                  <div className="text-white/70 text-sm mt-1">Est. 2023 • Kano, Nigeria</div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="text-2xl font-black text-amtay-blue">68%</div>
                <div className="text-xs text-muted-foreground">Win Rate</div>
              </div>

              <div className="absolute -left-4 bottom-1/4 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-2xl font-black text-amtay-blue">2023</div>
                <div className="text-xs text-muted-foreground">Founded</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
