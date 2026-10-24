import { useEffect, useRef, useState } from 'react';
import { ArrowUpDown, Menu } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Headshot } from '@/components/team/Headshot';
import { moveItem } from './ReorderControls';

interface Item {
  name: string;
  photo?: string;
  number?: number;
  position?: string;
  role?: string;
}

interface Props<T extends Item> {
  title: string;
  items: T[];
  onDone: (next: T[]) => void;
}

const ROW = 60;

/** Apple-style "Organize" sheet: compact rows, touch-friendly drag handle, Cancel / Done. */
export function OrganizeOrderSheet<T extends Item>({ title, items, onDone }: Props<T>) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<T[]>(items);
  const [drag, setDrag] = useState<{ index: number; startY: number; dy: number } | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => { if (open) setList(items); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const target = drag ? Math.max(0, Math.min(list.length - 1, drag.index + Math.round(drag.dy / ROW))) : -1;

  const offsetFor = (i: number) => {
    if (!drag) return 0;
    if (i === drag.index) return drag.dy;
    if (drag.index < target && i > drag.index && i <= target) return -ROW;
    if (drag.index > target && i < drag.index && i >= target) return ROW;
    return 0;
  };

  const onPointerDown = (index: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDrag({ index, startY: e.clientY, dy: 0 });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    setDrag({ ...drag, dy: e.clientY - drag.startY });
  };
  const onPointerUp = () => {
    if (!drag) return;
    setList(moveItem(list, drag.index, target));
    setDrag(null);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70"
      >
        <ArrowUpDown className="h-4 w-4" /> Organize
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85vh] w-[calc(100%-1.5rem)] max-w-md flex-col gap-0 overflow-hidden rounded-3xl border-0 p-0 shadow-2xl [&>button]:hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <button type="button" onClick={() => setOpen(false)} className="text-[15px] text-primary">Cancel</button>
            <div className="text-center">
              <DialogTitle className="text-[15px] font-semibold">{title}</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">Hold ≡ and drag</DialogDescription>
            </div>
            <button
              type="button"
              onClick={() => { onDone(list); setOpen(false); }}
              className="text-[15px] font-semibold text-primary"
            >
              Done
            </button>
          </div>

          <ul ref={listRef} className="relative overflow-y-auto bg-muted/40 py-2" style={{ touchAction: drag ? 'none' : 'pan-y' }}>
            {list.map((item, i) => {
              const active = drag?.index === i;
              return (
                <li
                  key={`${item.name}-${i}`}
                  style={{ height: ROW, transform: `translateY(${offsetFor(i)}px)`, transition: active ? 'none' : 'transform 200ms cubic-bezier(.2,.8,.2,1)' }}
                  className={`relative mx-3 flex items-center gap-3 px-3 ${active ? 'z-10 rounded-2xl bg-card shadow-xl scale-[1.02]' : 'bg-card'} ${i === 0 ? 'rounded-t-2xl' : ''} ${i === list.length - 1 ? 'rounded-b-2xl' : 'border-b border-border/60'}`}
                >
                  <Headshot name={item.name} photo={item.photo} size="h-10 w-10" shape="rounded-full" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[15px] font-medium">{item.name || 'Unnamed'}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.number != null ? `#${item.number} · ${item.position ?? ''}` : item.role}
                    </p>
                  </div>
                  <span
                    onPointerDown={onPointerDown(i)}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    aria-label={`Drag ${item.name}`}
                    className="flex h-full w-11 cursor-grab touch-none items-center justify-center text-muted-foreground active:cursor-grabbing"
                  >
                    <Menu className="h-5 w-5" />
                  </span>
                </li>
              );
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
