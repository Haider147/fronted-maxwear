import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { cn, formatPrice } from '@/lib/utils';
import { packs } from '@/lib/mocks/home';

export function Packs() {
  return (
    <section className="grid grid-cols-1 bg-marron text-crema-3 md:grid-cols-2">
      <div className="flex flex-col justify-center gap-6.5 px-6 py-16 md:px-14 md:py-19">
        <span className="font-mono text-xs tracking-[0.22em] text-terracota-light uppercase">
          Packs y ahorro
        </span>
        <h2 className="text-[40px] leading-[0.98] font-extrabold tracking-[-0.025em] md:text-[56px]">
          Compra 3,
          <br />
          paga como 2<span className="font-serif text-terracota-light italic font-normal">.</span>
        </h2>
        <p className="max-w-[420px] text-lg leading-[1.55] text-[#D9C7BA]">
          Escoge tus colores, escoge tu talla y deja de lavar a media noche. Mientras más llevas, más
          barato sale cada uno.
        </p>
        <div className="flex max-w-[440px] flex-col gap-3">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className={cn(
                'flex items-center justify-between border px-5 py-4',
                pack.featured ? 'border-terracota-light bg-marron-soft' : 'border-marron-border'
              )}
            >
              <span className={cn('text-base', pack.featured && 'font-bold')}>
                {pack.label}
                {pack.featuredNote && (
                  <span className="ml-1.5 font-mono text-xs tracking-[0.12em] text-terracota-light uppercase">
                    · {pack.featuredNote}
                  </span>
                )}
              </span>
              <span className={cn('font-mono text-[15px]', pack.featured ? 'text-crema-3' : 'text-[#D9C7BA]')}>
                {formatPrice(pack.totalPrice, 'COP')} · {formatPrice(pack.unitPrice, 'COP')} c/u
              </span>
            </div>
          ))}
        </div>
        <Button variant="inverse" className="self-start">
          Armar mi pack
        </Button>
      </div>
      <ImagePlaceholder
        label="foto pack · boxers doblados"
        variant="dark"
        className="min-h-[360px] items-center justify-center md:min-h-[560px]"
      />
    </section>
  );
}
