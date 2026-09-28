import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Clock3 } from 'lucide-react';

interface StoryComingSoonProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

/**
 * Shown when a news card has no full article written yet. Keeps the promise
 * honest instead of dropping the reader onto an empty page.
 */
export const StoryComingSoon = ({ open, onOpenChange, title }: StoryComingSoonProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-md rounded-[1.5rem] border-border p-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[hsl(var(--royal-blue))]/10">
        <Clock3 className="h-7 w-7 text-[hsl(var(--primary-blue))]" />
      </div>
      <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
        AMTAY FC Media
      </p>
      <h2 className="mt-3 text-2xl font-black tracking-[-0.03em]">Story coming soon</h2>
      {title && <p className="mt-2 text-sm font-semibold text-foreground/70">{title}</p>}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        Our media team is still writing this one up and selecting the photography. Check back shortly — the full
        report will land here.
      </p>
      <button
        type="button"
        onClick={() => onOpenChange(false)}
        className="mx-auto mt-7 rounded-full bg-[hsl(var(--primary-blue))] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[hsl(var(--royal-blue))]"
      >
        Got it
      </button>
    </DialogContent>
  </Dialog>
);
