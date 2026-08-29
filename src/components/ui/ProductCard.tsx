import Link from 'next/link';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn, formatPrice } from '@/lib/utils';
import type { ProductCardData } from '@/lib/mocks/product';

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <Link href={`/productos/${product.slug}`} className="flex flex-col gap-3.5">
      <ImagePlaceholder label={product.placeholderLabel} className="aspect-[3/4] items-center justify-center">
        {product.badge && (
          <span
            className={cn(
              'absolute top-3.5 left-3.5 px-2.5 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase',
              product.badge.startsWith('-') ? 'bg-terracota text-crema-2' : 'bg-marron text-crema-3'
            )}
          >
            {product.badge}
          </span>
        )}
      </ImagePlaceholder>
      <div className="flex flex-col gap-1.5">
        <strong className="text-base text-tinta">{product.name}</strong>
        <span className="font-mono text-sm text-texto-muted">
          {formatPrice(Number(product.price), product.currency)}
          {product.compareAtPrice && (
            <span className="ml-1.5 text-[#A79890] line-through">
              {formatPrice(Number(product.compareAtPrice), product.currency)}
            </span>
          )}
        </span>
        {product.savingsLabel ? (
          <span className="text-[13px] text-terracota">{product.savingsLabel}</span>
        ) : (
          product.colors && (
            <div className="mt-1.5 flex gap-1.5">
              {product.colors.map((color) => (
                <span key={color} className="h-3.5 w-3.5 rounded-full" style={{ background: color }} />
              ))}
            </div>
          )
        )}
      </div>
    </Link>
  );
}
