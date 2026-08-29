import { ProductCard } from '@/components/ui/ProductCard';
import { featuredProducts } from '@/lib/mocks/home';

export function BestSellers() {
  return (
    <section className="flex flex-col gap-9 px-6 py-16 md:px-12 md:py-21">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">
            Lo que más se va
          </span>
          <h2 className="text-[32px] leading-none font-extrabold tracking-[-0.02em] text-tinta md:text-[44px]">
            Más vendidos
          </h2>
        </div>
        <a
          href="#"
          className="border-b-2 border-terracota pb-1 text-sm font-bold tracking-[0.08em] text-marron uppercase"
        >
          Ver todo
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
