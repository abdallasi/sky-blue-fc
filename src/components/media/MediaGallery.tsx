import { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Filter, Grid, LayoutGrid } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

interface MediaGalleryProps {
  items: GalleryItem[];
  categories?: string[];
}

const placeholderItems: GalleryItem[] = [
  { id: '1', src: '/placeholder.svg', alt: 'Match day action', category: 'Matches', caption: 'AMTAY FC in competitive action' },
  { id: '2', src: '/placeholder.svg', alt: 'Training session', category: 'Training', caption: 'Tactical preparation' },
  { id: '3', src: '/placeholder.svg', alt: 'Academy players', category: 'Academy', caption: 'Young talent development' },
  { id: '4', src: '/placeholder.svg', alt: 'Community event', category: 'Community', caption: 'Giving back to Kano' },
  { id: '5', src: '/placeholder.svg', alt: 'Team celebration', category: 'Matches', caption: 'Victory celebration' },
  { id: '6', src: '/placeholder.svg', alt: 'Gym session', category: 'Training', caption: 'Fitness & conditioning' },
  { id: '7', src: '/placeholder.svg', alt: 'Academy drill', category: 'Academy', caption: 'Technical skill sessions' },
  { id: '8', src: '/placeholder.svg', alt: 'Fan interaction', category: 'Community', caption: 'Fan meet and greet' },
  { id: '9', src: '/placeholder.svg', alt: 'Pre-match huddle', category: 'Matches', caption: 'Team unity before kickoff' },
];

export const MediaGallery = ({ items, categories }: MediaGalleryProps) => {
  const displayItems = items.length > 0 ? items : placeholderItems;
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [compact, setCompact] = useState(false);
  const gridAnim = useScrollAnimation({ threshold: 0.1 });

  const allCategories = categories || ['All', ...Array.from(new Set(displayItems.map(i => i.category)))];
  if (!allCategories.includes('All')) allCategories.unshift('All');

  const filtered = activeFilter === 'All' ? displayItems : displayItems.filter(i => i.category === activeFilter);

  const openViewer = (index: number) => setSelectedIndex(index);
  const closeViewer = () => setSelectedIndex(null);

  const navigate = useCallback((dir: 1 | -1) => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      const next = prev + dir;
      if (next < 0) return filtered.length - 1;
      if (next >= filtered.length) return 0;
      return next;
    });
  }, [selectedIndex, filtered.length]);

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-[hsl(var(--primary-blue))] text-white shadow-lg shadow-[hsl(var(--primary-blue))]/30'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCompact(!compact)}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Toggle grid size"
        >
          {compact ? <LayoutGrid className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
        </button>
      </div>

      {/* Gallery Grid */}
      <div
        ref={gridAnim.ref as React.RefObject<HTMLDivElement>}
        className={`grid gap-4 ${compact ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}
      >
        {filtered.map((item, index) => (
          <div
            key={item.id}
            onClick={() => openViewer(index)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer hover-lift transition-all duration-700 ${gridAnim.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${Math.min(index * 60, 600)}ms` }}
          >
            <div className={`${compact ? 'aspect-square' : 'aspect-[4/3]'} bg-muted`}>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--electric-cyan))]">{item.category}</span>
                {item.caption && <p className="text-white text-sm mt-1">{item.caption}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No media found in this category.</p>
        </div>
      )}

      {/* Fullscreen Viewer */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center" onClick={closeViewer}>
          <button onClick={closeViewer} className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10">
            <X className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={filtered[selectedIndex].src}
              alt={filtered[selectedIndex].alt}
              className="max-w-full max-h-[75vh] object-contain mx-auto rounded-lg"
            />
            <div className="text-center mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[hsl(var(--electric-cyan))]">
                {filtered[selectedIndex].category}
              </span>
              {filtered[selectedIndex].caption && (
                <p className="text-white/80 mt-1">{filtered[selectedIndex].caption}</p>
              )}
              <p className="text-white/40 text-sm mt-2">{selectedIndex + 1} / {filtered.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
