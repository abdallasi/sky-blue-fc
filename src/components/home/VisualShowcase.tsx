import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import matchdayImg from '@/assets/placeholder-hero-matchday.jpg';
import trainingImg from '@/assets/placeholder-academy-training.jpg';
import momentImg from '@/assets/placeholder-club-moment.jpg';

export const VisualShowcase = () => {
  const { content } = useContent();
  const images = content.images || {};

  const matchday = images.showcaseMatchday || matchdayImg;
  const training = images.showcaseTraining || trainingImg;
  const moment = images.showcaseMoment || momentImg;

  return (
    <section className="relative bg-[hsl(var(--midnight-blue))] text-white overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-40" />

      <div className="container-premium relative py-20 sm:py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))] font-bold">
              Inside the club
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-[0.95]">
              This is how we play.
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/70 hover:text-[hsl(var(--electric-cyan))] transition-colors"
          >
            View the gallery <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Large feature tile */}
          <Link
            to="/team"
            className="group relative lg:col-span-2 rounded-3xl overflow-hidden min-h-[320px] sm:min-h-[460px] border border-white/10"
          >
            <img
              src={matchday}
              alt="Matchday action"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--midnight-blue))] via-[hsl(var(--midnight-blue))]/25 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))] font-bold mb-3">
                Matchday
              </span>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight max-w-md leading-tight">
                120 matches unbeaten — and the hunger is still growing.
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/80 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                Meet the squad <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Stacked tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
            <Link
              to="/academy"
              className="group relative rounded-3xl overflow-hidden min-h-[220px] border border-white/10"
            >
              <img
                src={training}
                alt="Academy training"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary-blue))]/90 via-[hsl(var(--midnight-blue))]/40 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))] font-bold mb-2">
                  Academy
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Built in training.</h3>
              </div>
            </Link>

            <Link
              to="/apply"
              className="group relative rounded-3xl overflow-hidden min-h-[220px] border border-white/10"
            >
              <img
                src={moment}
                alt="Celebration"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--midnight-blue))] via-[hsl(var(--midnight-blue))]/30 to-transparent" />
              <div className="relative h-full flex flex-col justify-end p-6">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--electric-cyan))] font-bold mb-2">
                  Trials
                </span>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">Your turn next?</h3>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-white/80 group-hover:text-[hsl(var(--electric-cyan))] transition-colors">
                  Apply to play <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
