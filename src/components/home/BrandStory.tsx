import Image from 'next/image';
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder';

export function BrandStory() {
  return (
    <section className="grid grid-cols-1 items-center md:grid-cols-[0.9fr_1.1fr]">
      <ImagePlaceholder
        label="foto de Max, el beagle"
        className="min-h-[300px] items-center justify-center md:min-h-[440px] md:self-stretch"
      />
      <div className="flex flex-col gap-5.5 px-6 py-16 md:px-14 md:py-19">
        <Image
          src="/images/logo-maxwear.png"
          alt="MAXWEAR"
          width={612}
          height={500}
          className="h-24 w-auto self-start"
        />
        <h2 className="font-serif text-[34px] leading-[1.05] font-normal text-tinta md:text-[52px]">
          Max nunca ha usado un boxer, pero tiene <span className="text-terracota italic">criterio</span>.
        </h2>
        <p className="max-w-[520px] text-lg leading-[1.6] text-pretty text-texto">
          Le pusimos su nombre a la marca porque él entiende de comodidad mejor que nadie: duerme 16
          horas al día. Nosotros solo tradujimos eso a tela fría, elástico que no aprieta y colores que
          combinan con todo.
        </p>
        <a
          href="#"
          className="self-start border-b-2 border-terracota pb-1 text-sm font-bold tracking-[0.08em] text-marron uppercase"
        >
          Conocer la marca
        </a>
      </div>
    </section>
  );
}
