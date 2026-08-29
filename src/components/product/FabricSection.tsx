import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn } from '@/lib/utils';
import type { ProductDetail } from '@/lib/mocks/product';

export function FabricSection({ product }: { product: ProductDetail }) {
  return (
    <section className="mt-22 grid grid-cols-1 bg-marron text-crema-3 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-6 px-6 py-16 md:px-14 md:py-19">
        <span className="font-mono text-xs tracking-[0.22em] text-terracota-light uppercase">
          {product.fabricEyebrow}
        </span>
        <h2 className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.03em] md:text-[52px]">
          {product.fabricHeadingLine1}
          <br />
          {product.fabricHeadingLine2}
          <span className="font-serif text-terracota-light italic font-normal">.</span>
        </h2>
        <div className="flex max-w-[460px] flex-col gap-3.5">
          {product.fabricSpecs.map((spec, index) => (
            <div
              key={spec.label}
              className={cn(
                'flex justify-between py-3.5',
                index < product.fabricSpecs.length - 1 && 'border-b border-marron-border'
              )}
            >
              <span className="text-base">{spec.label}</span>
              <span className="font-mono text-sm text-[#D9C7BA]">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
      <ImagePlaceholder
        label={product.fabricPlaceholderLabel}
        variant="dark"
        className="min-h-[360px] items-center justify-center md:min-h-[520px]"
      />
    </section>
  );
}
