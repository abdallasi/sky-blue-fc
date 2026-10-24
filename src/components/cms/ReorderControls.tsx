import { useState } from 'react';
import { ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

export function moveItem<T>(list: T[], from: number, to: number): T[] {
  if (from === to || from < 0 || to < 0 || from >= list.length || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/** Shared drag state so a row can be dropped onto any other row in the same list. */
export function useReorder<T>(list: T[], onChange: (next: T[]) => void) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const rowProps = (index: number) => ({
    onDragOver: (e: React.DragEvent) => {
      if (dragIndex === null) return;
      e.preventDefault();
      if (overIndex !== index) setOverIndex(index);
    },
    onDrop: (e: React.DragEvent) => {
      e.preventDefault();
      if (dragIndex !== null) onChange(moveItem(list, dragIndex, index));
      setDragIndex(null);
      setOverIndex(null);
    },
    'data-drop-target': overIndex === index && dragIndex !== index ? 'true' : undefined,
    className: overIndex === index && dragIndex !== null && dragIndex !== index ? 'ring-2 ring-primary' : dragIndex === index ? 'opacity-50' : '',
  });

  const controls = (index: number) => (
    <div className="flex shrink-0 items-center gap-1 self-center">
      <span
        draggable
        onDragStart={(e) => {
          setDragIndex(index);
          e.dataTransfer.effectAllowed = 'move';
          const row = (e.currentTarget as HTMLElement).closest('[data-reorder-row]');
          if (row) e.dataTransfer.setDragImage(row, 20, 20);
        }}
        onDragEnd={() => {
          setDragIndex(null);
          setOverIndex(null);
        }}
        title="Drag to reposition"
        className="hidden cursor-grab rounded-lg p-2 text-muted-foreground hover:bg-muted active:cursor-grabbing sm:inline-flex"
      >
        <GripVertical className="h-5 w-5" />
      </span>
      <div className="flex flex-col">
        <button
          type="button"
          aria-label="Move up"
          disabled={index === 0}
          onClick={() => onChange(moveItem(list, index, index - 1))}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Move down"
          disabled={index === list.length - 1}
          onClick={() => onChange(moveItem(list, index, index + 1))}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <span className="w-6 text-center text-xs font-bold text-muted-foreground">{index + 1}</span>
    </div>
  );

  return { rowProps, controls };
}
