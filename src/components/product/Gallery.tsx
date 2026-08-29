'use client';

import { useState } from 'react';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/utils';

export function Gallery({ labels, badge }: { labels: string[]; badge?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex gap-4 px-6 md:pl-12 md:pr-6">
      <div className="flex w-[92px] shrink-0 flex-col gap-3">
        {labels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              'flex aspect-[3/4] items-center justify-center border bg-[repeating-linear-gradient(135deg,#F0E5D9_0_14px,#EADCCD_14px_28px)] font-mono text-[10px] text-[#8A7264]',
              index === activeIndex ? 'border-2 border-terracota' : 'border-[#E2D7CC] hover:border-linea-fuerte'
            )}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>
      <ImagePlaceholder label={labels[activeIndex]} className="aspect-[4/5] flex-1 items-center justify-center">
        {badge && (
          <span className="absolute top-4.5 left-4.5 bg-marron px-2.5 py-1.5 font-mono text-[11px] tracking-[0.14em] text-crema-3 uppercase">
            {badge}
          </span>
        )}
      </ImagePlaceholder>
    </div>
  );
}
