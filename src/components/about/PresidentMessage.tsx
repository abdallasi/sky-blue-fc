import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Quote } from 'lucide-react';
import presidentAsset from '@/assets/president-message.jpg.asset.json';

export const PresidentMessage = () => {
  const anim = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="section-padding bg-gradient-to-br from-[hsl(var(--midnight-blue))] via-[hsl(var(--primary-blue))] to-[hsl(var(--midnight-blue))] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[hsl(var(--royal-blue))]/20 rounded-full blur-[150px]" />

      <div ref={anim.ref as React.RefObject<HTMLDivElement>} className="container-premium relative">
        <div className="text-center mb-10">
          <span className="text-label">Together, We Are AMTAY</span>
          <h2 className="heading-section mt-2">A Message of Appreciation</h2>
          <p className="text-white/70 mt-3 max-w-2xl mx-auto">From the President — Engr. Muhammad T. Abdulwahab</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          <div className={`lg:col-span-2 transition-all duration-1000 ${anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/40 ring-1 ring-white/10">
              <img
                src={presidentAsset.url}
                alt="A Message of Appreciation from the President — Engr. Muhammad T. Abdulwahab"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className={`lg:col-span-3 transition-all duration-1000 delay-200 ${anim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Quote className="w-10 h-10 text-[hsl(var(--electric-cyan))] mb-4" />
            <div className="space-y-5 text-white/85 leading-relaxed text-lg">
              <p>
                As the NLO League season comes to a close, I want to extend my heartfelt appreciation
                to every member of the AMTAY Football Club family for your unwavering dedication,
                passion, and support.
              </p>
              <p>
                <strong className="text-white">To the Management</strong> — thank you for your leadership, vision, and
                tireless efforts behind the scenes. <strong className="text-white">To the Players</strong> — you gave
                your all on the pitch and made us proud. <strong className="text-white">To our Fans</strong> — your
                belief and presence at every game fuel our spirit. You are our 12th player.
              </p>
              <p>
                This season had its challenges, but it showed our strength, resilience, and unity.
                We will learn, we will grow, and we will come back stronger.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-2xl font-black tracking-wide text-[hsl(var(--electric-cyan))]">UP AMTAY!</div>
              <div className="text-white/70 text-sm mt-1">One Club. One Family. One Dream.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
