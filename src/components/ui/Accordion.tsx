'use client';

import { useState } from 'react';

type AccordionItem = { title: string; body: string };

export function Accordion({ items, defaultOpenIndex = 0 }: { items: AccordionItem[]; defaultOpenIndex?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <div className="flex flex-col border-t border-linea">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className="border-b border-linea">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between py-5 text-left text-sm font-bold tracking-[0.08em] text-tinta uppercase"
            >
              {item.title}
              <span className="font-mono text-lg text-terracota">{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && (
              <div className="max-w-[520px] pb-5.5 text-[15px] leading-[1.65] text-texto">{item.body}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
