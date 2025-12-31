import { Eye, Target, Users, Trophy, Star } from 'lucide-react';

export const VisionMission = () => {
  return (
    <section className="section-padding bg-amtay-midnight text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amtay-royal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container-premium relative">
        <div className="text-center mb-16">
          <span className="text-label text-amtay-royal">Our Purpose</span>
          <h2 className="heading-section mt-2">Vision & Mission</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amtay-royal/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 h-full">
              <div className="w-16 h-16 rounded-2xl bg-amtay-royal/20 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-amtay-royal" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                To become Nigeria's leading football club in talent development, 
                professionalism, and community impact.
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-amtay-royal/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10 h-full">
              <div className="w-16 h-16 rounded-2xl bg-amtay-royal/20 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-amtay-royal" />
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <ul className="space-y-4">
                {[
                  { icon: Users, text: 'Develop young football talent' },
                  { icon: Trophy, text: 'Achieve excellence in national & international competitions' },
                  { icon: Star, text: 'Inspire pride in fans and the community' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <li key={index} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-amtay-royal" />
                      </div>
                      <span className="text-white/80">{item.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
