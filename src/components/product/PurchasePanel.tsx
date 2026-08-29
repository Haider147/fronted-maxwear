'use client';

import { useState } from 'react';
import { Accordion } from '@/components/ui/Accordion';
import { cn, formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import type { ProductDetail } from '@/lib/mocks/product';

export function PurchasePanel({ product }: { product: ProductDetail }) {
  const { addItems } = useCart();
  const [colorIndex, setColorIndex] = useState(Math.min(2, product.colors.length - 1));
  const [sizeIndex, setSizeIndex] = useState(Math.min(2, product.sizes.length - 1));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const color = product.colors[colorIndex];
  const size = product.sizes[sizeIndex];
  const unitPrice = formatPrice(Number(product.price), product.currency);

  function handleAddToBag() {
    addItems(quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const stockNote =
    size.stock === 0
      ? `Talla ${size.label} agotada · avísame cuando llegue`
      : size.stock <= 3
        ? `Últimas ${size.stock} unidades en talla ${size.label}`
        : `Disponible en talla ${size.label} · llega en 24-48h`;

  return (
    <>
      <div className="flex flex-col gap-6.5">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-bold tracking-[0.1em] uppercase">Color</span>
            <span className="font-mono text-[13px] text-[#7A6960]">{color.name}</span>
          </div>
          <div className="flex gap-3">
            {product.colors.map((c, index) => (
              <button
                key={c.name}
                type="button"
                title={c.name}
                onClick={() => setColorIndex(index)}
                style={{ background: c.hex }}
                className={cn(
                  'h-[38px] w-[38px] rounded-full border shadow-[0_0_0_2px_var(--color-crema)_inset]',
                  index === colorIndex ? 'border-2 border-terracota' : 'border-[#D8CBBF]'
                )}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[13px] font-bold tracking-[0.1em] uppercase">Talla</span>
              <span className="font-mono text-[13px] text-[#7A6960]">{size.label}</span>
            </div>
            <a
              href="#tallas"
              className="border-b border-terracota pb-0.5 font-mono text-xs tracking-[0.12em] text-terracota uppercase"
            >
              Guía de tallas
            </a>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((s, index) => (
              <button
                key={s.label}
                type="button"
                disabled={s.stock === 0}
                onClick={() => setSizeIndex(index)}
                className={cn(
                  'h-[52px] min-w-[60px] text-[15px] font-bold tracking-[0.04em]',
                  s.stock === 0
                    ? 'cursor-not-allowed border border-[#E2D7CC] bg-[#F6EEE5] text-[#BBAAA0] line-through'
                    : index === sizeIndex
                      ? 'border border-terracota bg-terracota text-crema-2'
                      : 'border border-linea-fuerte text-tinta hover:border-terracota hover:text-terracota'
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-texto-soft">{stockNote}</span>
        </div>

        <div className="flex items-stretch gap-3">
          <div className="flex items-center border border-linea-fuerte bg-crema">
            <button
              type="button"
              aria-label="Quitar uno"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-[58px] w-12 text-xl text-marron"
            >
              −
            </button>
            <span className="w-[34px] text-center font-mono text-base">{quantity}</span>
            <button
              type="button"
              aria-label="Agregar uno"
              onClick={() => setQuantity((q) => Math.min(9, q + 1))}
              className="h-[58px] w-12 text-xl text-marron"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToBag}
            className="h-[58px] flex-1 bg-terracota text-[15px] font-bold tracking-[0.08em] text-crema-2 uppercase hover:bg-terracota-dark"
          >
            {added ? 'Agregado a la bolsa ✓' : `Agregar a la bolsa · ${unitPrice}`}
          </button>
        </div>
        <button
          type="button"
          className="-mt-3 h-14 border border-linea-fuerte text-[15px] font-bold tracking-[0.08em] text-marron uppercase hover:border-terracota hover:text-terracota"
        >
          Comprar ahora · pago en 1 clic
        </button>

        <div className="flex items-center justify-between gap-5 border border-[#E2D7CC] bg-crema-2 px-6 py-5.5">
          <div className="flex flex-col gap-1.5">
            <strong className="text-[17px]">{product.packUpsell.title}</strong>
            <p className="m-0 text-[15px] text-texto">{product.packUpsell.description}</p>
          </div>
          <a
            href={product.packUpsell.ctaHref}
            className="shrink-0 bg-marron px-5.5 py-3.5 font-mono text-[13px] font-bold tracking-[0.1em] text-crema-3 uppercase hover:bg-terracota hover:text-crema-2"
          >
            {product.packUpsell.ctaLabel}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3.5 border-t border-linea pt-5.5 text-sm text-texto sm:grid-cols-2">
          {product.guarantees.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <Accordion items={product.details} />
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center border-t border-[#E2D7CC] bg-crema">
        <div className="flex w-full max-w-[1440px] items-center justify-between gap-6 px-6 py-3.5 md:px-12">
          <div className="flex items-center gap-4">
            <div className="h-16 w-[52px] bg-[repeating-linear-gradient(135deg,#F0E5D9_0_8px,#EADCCD_8px_16px)]" />
            <div className="flex flex-col gap-0.5">
              <strong className="text-[15px]">{product.name}</strong>
              <span className="font-mono text-[13px] text-[#7A6960]">
                {color.name} · Talla {size.label} · {quantity} und.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddToBag}
            className="bg-terracota px-8 py-4 text-sm font-bold tracking-[0.08em] text-crema-2 uppercase hover:bg-terracota-dark"
          >
            Agregar · {unitPrice}
          </button>
        </div>
      </div>
    </>
  );
}
