import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { Gallery } from '@/components/product/Gallery';
import { PurchasePanel } from '@/components/product/PurchasePanel';
import { FabricSection } from '@/components/product/FabricSection';
import { SizeGuide } from '@/components/product/SizeGuide';
import { Reviews } from '@/components/product/Reviews';
import { RelatedProducts } from '@/components/product/RelatedProducts';
import { getProductBySlug, products } from '@/lib/mocks/product';
import { formatPrice } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<'/productos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product?.name ?? 'Producto' };
}

export default async function ProductPage({ params }: PageProps<'/productos/[slug]'>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Inicio', href: '/' },
          { label: product.category, href: '#' },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 items-start md:grid-cols-[1.15fr_1fr]">
        <Gallery labels={product.galleryLabels} badge={product.galleryBadge} />

        <div className="flex flex-col gap-6.5 px-6 pt-2 md:px-12 md:pr-14">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">{product.eyebrow}</span>
            <h1 className="text-[40px] leading-[0.95] font-extrabold tracking-[-0.03em] md:text-[54px]">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 font-mono text-[13px] text-[#7A6960]">
              <span className="text-terracota">★★★★★</span> {product.rating.toFixed(1).replace('.', ',')} ·{' '}
              <a href="#resenas" className="border-b border-linea-fuerte">
                {product.reviewCount.toLocaleString('es-CO')} reseñas
              </a>
            </div>
          </div>

          <div className="flex items-baseline gap-3.5">
            <strong className="text-4xl tracking-[-0.02em]">
              {formatPrice(Number(product.price), product.currency)}
            </strong>
            {product.compareAtPrice && (
              <span className="font-mono text-[15px] text-[#A79890] line-through">
                {formatPrice(Number(product.compareAtPrice), product.currency)}
              </span>
            )}
            {product.discountLabel && (
              <span className="bg-[#F4E4DA] px-2.5 py-1.5 font-mono text-xs tracking-[0.12em] text-terracota-dark uppercase">
                {product.discountLabel}
              </span>
            )}
          </div>

          <p className="max-w-[520px] text-lg leading-[1.6] text-texto">{product.description}</p>

          <PurchasePanel product={product} />
        </div>
      </div>

      <FabricSection product={product} />
      <SizeGuide />
      <Reviews rating={product.rating} reviewCount={product.reviewCount} reviews={product.reviews} />
      <RelatedProducts excludeSlug={product.slug} />
    </>
  );
}
