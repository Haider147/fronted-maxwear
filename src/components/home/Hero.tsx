import { Button } from '@/components/ui/Button';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';
import { formatPrice } from '@/lib/utils';

export function Hero() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1.05fr_1fr]">
      <div className="flex flex-col justify-center gap-7 bg-crema px-6 py-16 md:px-14 md:py-22">
        <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">
          Nueva temporada · Tela fría
        </span>
        <h1 className="text-[52px] leading-[0.92] font-extrabold tracking-[-0.03em] text-balance text-tinta md:text-[86px]">
          El boxer que
          <br />
          no te vas a
          <br />
          querer quitar
          <span className="font-serif text-terracota italic font-normal">.</span>
        </h1>
        <p className="max-w-[430px] text-lg leading-[1.55] text-pretty text-texto md:text-[19px]">
          Tela fría, costuras planas y una cintura que se queda donde la dejaste. Aprobado por Max, y él
          es exigente.
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          <Button variant="primary">Comprar ahora</Button>
          <Button variant="outline">Armar pack x3</Button>
        </div>
        <div className="flex items-center gap-2.5 font-mono text-[13px] text-[#7A6960]">
          <span className="text-terracota">★★★★★</span> 1.284 reseñas · tallas S a XXL
        </div>
      </div>
      <ImagePlaceholder
        label="foto hero · modelo en boxer, plano medio"
        className="min-h-[420px] items-end justify-center p-7 md:min-h-[620px]"
      >
        <div className="flex w-full max-w-[320px] flex-col gap-1 bg-crema px-5 py-4">
          <strong className="text-[15px] text-tinta">Boxer Trunk Tela Fría</strong>
          <span className="font-mono text-[13px] text-[#7A6960]">
            {formatPrice(59900, 'COP')} · 6 colores
          </span>
        </div>
      </ImagePlaceholder>
    </section>
  );
}
