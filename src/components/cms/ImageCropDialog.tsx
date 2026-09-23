import { useEffect, useMemo, useRef, useState } from 'react';
import { X, ZoomIn, Check, Loader2 } from 'lucide-react';

export type AspectPreset = { label: string; ratio: number | null };

export const CROP_PRESETS: AspectPreset[] = [
  { label: 'Wide 16:9', ratio: 16 / 9 },
  { label: 'Phone 3:4', ratio: 3 / 4 },
  { label: 'Tall 9:16', ratio: 9 / 16 },
  { label: 'Portrait 4:5', ratio: 4 / 5 },
  { label: 'Landscape 16:10', ratio: 16 / 10 },
  { label: 'Square 1:1', ratio: 1 },
  { label: 'Full image', ratio: null },
];

/** Suggested shape per CMS field so the frame matches where the photo will show. */
export function suggestedRatio(field: string): number | null {
  if (/Mobile$/.test(field)) return 3 / 4;
  if (/^hero|Hero$/.test(field) || field.startsWith('__item:matchShots')) return 16 / 9;
  if (field.startsWith('__item:spotlights')) return 4 / 5;
  if (field.startsWith('__item:news')) return 16 / 10;
  if (field === 'founderPhoto' || field === 'presidentMessageImage' || field === 'featuredPlayerImage')
    return 4 / 5;
  if (field === '__gallery' || field === '__aboutStory') return null;
  return 16 / 9;
}

const FRAME_W = 520;
const MAX_OUT = 2000;

const prettyBytes = (n: number) => (n > 1024 * 1024 ? `${(n / 1048576).toFixed(1)} MB` : `${Math.round(n / 1024)} KB`);

type Props = {
  file: File;
  initialRatio: number | null;
  onCancel: () => void;
  onConfirm: (result: File) => void;
};

export const ImageCropDialog = ({ file, initialRatio, onCancel, onConfirm }: Props) => {
  const [src, setSrc] = useState<string>('');
  const [natural, setNatural] = useState({ w: 0, h: 0 });
  const [ratio, setRatio] = useState<number | null>(initialRatio);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [working, setWorking] = useState(false);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    const img = new window.Image();
    img.onload = () => setNatural({ w: img.naturalWidth, h: img.naturalHeight });
    img.src = url;
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const frame = useMemo(() => {
    if (!natural.w) return { w: FRAME_W, h: FRAME_W * 0.5625 };
    const r = ratio ?? natural.w / natural.h;
    return { w: FRAME_W, h: Math.round(FRAME_W / r) };
  }, [ratio, natural]);

  // Scale that makes the image cover the frame
  const baseScale = useMemo(() => {
    if (!natural.w) return 1;
    return Math.max(frame.w / natural.w, frame.h / natural.h);
  }, [frame, natural]);

  const scale = baseScale * zoom;
  const drawW = natural.w * scale;
  const drawH = natural.h * scale;

  const clamp = (o: { x: number; y: number }) => ({
    x: Math.min(0, Math.max(frame.w - drawW, o.x)),
    y: Math.min(0, Math.max(frame.h - drawH, o.y)),
  });

  // Re-centre whenever the frame or zoom changes
  useEffect(() => {
    if (!natural.w) return;
    setOffset((prev) => {
      const centred = { x: (frame.w - drawW) / 2, y: (frame.h - drawH) / 2 };
      const keep = prev.x === 0 && prev.y === 0 ? centred : prev;
      return {
        x: Math.min(0, Math.max(frame.w - drawW, keep.x === centred.x ? centred.x : keep.x)),
        y: Math.min(0, Math.max(frame.h - drawH, keep.y === centred.y ? centred.y : keep.y)),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frame.w, frame.h, drawW, drawH, natural.w]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const d = drag.current;
    setOffset(clamp({ x: d.ox + (e.clientX - d.x), y: d.oy + (e.clientY - d.y) }));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  const confirm = async () => {
    if (!natural.w) return;
    setWorking(true);
    try {
      const sx = -offset.x / scale;
      const sy = -offset.y / scale;
      const sw = frame.w / scale;
      const sh = frame.h / scale;

      const outScale = Math.min(1, MAX_OUT / Math.max(sw, sh));
      const outW = Math.max(1, Math.round(sw * outScale));
      const outH = Math.max(1, Math.round(sh * outScale));

      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Cannot prepare the photo');
      ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, outW, outH);
      bitmap.close?.();

      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/jpeg', 0.85));
      if (!blob) throw new Error('Cannot prepare the photo');
      onConfirm(new File([blob], file.name.replace(/\.[^/.]+$/, '') + '.jpg', { type: 'image/jpeg' }));
    } finally {
      setWorking(false);
    }
  };

  const rawW = frame.w / scale;
  const rawH = frame.h / scale;
  const outFit = Math.min(1, MAX_OUT / Math.max(rawW || 1, rawH || 1));
  const cropW = Math.round(rawW * outFit);
  const cropH = Math.round(rawH * outFit);


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 overflow-y-auto">
      <div className="w-full max-w-[600px] rounded-2xl bg-background border border-border p-5 my-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Position your photo</h3>
          <button onClick={onCancel} className="p-2 rounded-full hover:bg-muted" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          Original {natural.w || '—'} × {natural.h || '—'} px · {prettyBytes(file.size)} · drag to move, slide to zoom
        </p>

        <div
          className="relative mx-auto overflow-hidden rounded-xl bg-muted touch-none select-none cursor-grab active:cursor-grabbing"
          style={{ width: '100%', maxWidth: FRAME_W, aspectRatio: `${frame.w} / ${frame.h}` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="absolute inset-0"
            style={{ transform: `scale(${1})`, transformOrigin: 'top left' }}
          >
            {src && (
              <img
                src={src}
                alt=""
                draggable={false}
                style={{
                  position: 'absolute',
                  left: `${(offset.x / frame.w) * 100}%`,
                  top: `${(offset.y / frame.h) * 100}%`,
                  width: `${(drawW / frame.w) * 100}%`,
                  height: `${(drawH / frame.h) * 100}%`,
                  maxWidth: 'none',
                }}
              />
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 border border-white/50 rounded-xl" />
          <div className="pointer-events-none absolute inset-0 grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="border border-white/15" />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ZoomIn className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="range"
            min={1}
            max={4}
            step={0.01}
            value={zoom}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Shape</p>
          <div className="flex flex-wrap gap-2">
            {CROP_PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setRatio(p.ratio);
                  setZoom(1);
                  setOffset({ x: 0, y: 0 });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  ratio === p.ratio
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          Saved size: {cropW || '—'} × {cropH || '—'} px
        </p>

        <div className="mt-5 flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-border font-semibold">
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={working || !natural.w}
            className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {working ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
            Use photo
          </button>
        </div>
      </div>
    </div>
  );
};
