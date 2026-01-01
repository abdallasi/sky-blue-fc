import { Link } from 'react-router-dom';
import { ChevronRight, Users, GraduationCap } from 'lucide-react';

export const CTASection = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--midnight-blue))] via-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))]" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container-premium relative">
        <div className="text-center text-white mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <span className="text-sm font-medium">Join the Movement</span>
          </span>
          <h2 className="heading-section max-w-3xl mx-auto mb-6">
            Be Part of AMTAY FC's Journey to Excellence
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Whether you're a young talent, a supporter, or a potential partner — there's a place for you in our story.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Join Academy Card */}
          <Link 
            to="/academy" 
            className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Join the Academy</h3>
              <p className="text-white/60 mb-6">Start your journey with structured training and professional development.</p>
              
              <div className="flex items-center gap-2 text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors">
                <span className="text-sm font-semibold">Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Meet the Team Card */}
          <Link 
            to="/team" 
            className="group relative overflow-hidden rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/15 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Meet the Squad</h3>
              <p className="text-white/60 mb-6">Discover the talented players and staff driving our success.</p>
              
              <div className="flex items-center gap-2 text-[hsl(var(--royal-blue))] group-hover:text-white transition-colors">
                <span className="text-sm font-semibold">View Team</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[hsl(var(--primary-blue))] rounded-xl font-semibold hover:bg-white/90 hover:-translate-y-1 transition-all duration-200 shadow-xl shadow-black/20"
          >
            Get in Touch
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
