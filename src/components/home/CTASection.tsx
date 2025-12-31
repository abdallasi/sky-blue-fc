import { Link } from 'react-router-dom';
import { ArrowRight, Users, GraduationCap } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Join Academy CTA */}
          <div className="card-premium group cursor-pointer bg-gradient-to-br from-amtay-blue to-amtay-midnight text-white">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7" />
              </div>
              <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Join the Academy</h3>
            <p className="text-white/70 mb-6">
              Discover your potential with structured training, national exposure, 
              and a clear pathway to professional football.
            </p>
            <Link 
              to="/academy" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
            >
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Meet the Team CTA */}
          <div className="card-premium group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-amtay-blue/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-amtay-blue" />
              </div>
              <ArrowRight className="w-6 h-6 text-amtay-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-foreground">Meet the Squad</h3>
            <p className="text-muted-foreground mb-6">
              Get to know the players, coaches, and management driving 
              AMTAY FC's rise to the top.
            </p>
            <Link 
              to="/team" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-amtay-blue hover:text-amtay-midnight"
            >
              View Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
