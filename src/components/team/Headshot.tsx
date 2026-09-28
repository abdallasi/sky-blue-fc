import avatarPlaceholder from '@/assets/placeholder-avatar.jpg';

interface HeadshotProps {
  name: string;
  photo?: string;
  /** Tailwind size classes, e.g. "h-14 w-14" */
  size?: string;
  /** Rounded shape, defaults to a soft squircle */
  shape?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/**
 * Portrait for any named person on the site. Falls back to a neutral avatar
 * until a real headshot is uploaded through the admin area.
 */
export const Headshot = ({
  name,
  photo,
  size = 'h-14 w-14',
  shape = 'rounded-2xl',
  tone = 'light',
  className = '',
}: HeadshotProps) => (
  <div
    className={`relative ${size} ${shape} shrink-0 overflow-hidden border ${
      tone === 'dark' ? 'border-white/15 bg-white/[0.06]' : 'border-border bg-muted'
    } ${className}`}
  >
    <img
      src={photo || avatarPlaceholder}
      alt={name}
      loading="lazy"
      className="h-full w-full object-cover object-top"
    />
    {!photo && (
      <span
        className={`absolute inset-x-0 bottom-0 text-center text-[7px] font-black uppercase tracking-[0.16em] ${
          tone === 'dark' ? 'bg-black/40 text-white/60' : 'bg-white/70 text-foreground/50'
        }`}
      >
        AFC
      </span>
    )}
  </div>
);
