import { ProductCard } from '@/components/ui/ProductCard';
import { products, toProductCard } from '@/lib/mocks/product';

export function RelatedProducts({ excludeSlug }: { excludeSlug: string }) {
  const items = products
    .filter((product) => product.slug !== excludeSlug)
    .slice(0, 4)
    .map(toProductCard);

  return (
    <section className="flex flex-col gap-9 px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[32px] leading-none font-extrabold tracking-[-0.02em] text-tinta md:text-[44px]">
          Completa el cajón
        </h2>
        <a
          href="#"
          className="border-b-2 border-terracota pb-1 text-sm font-bold tracking-[0.08em] text-marron uppercase"
        >
          Ver todo
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
