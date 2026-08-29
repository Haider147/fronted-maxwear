import type { ProductReview } from '@/lib/mocks/product';

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-terracota">
      {'★'.repeat(rating)}
      <span className="text-linea-fuerte">{'★'.repeat(5 - rating)}</span>
    </span>
  );
}

export function Reviews({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}) {
  return (
    <section id="resenas" className="flex flex-col gap-9 border-t border-linea bg-crema-2 px-6 py-16 md:px-12 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-2.5">
          <span className="font-mono text-xs tracking-[0.22em] text-terracota uppercase">
            {reviewCount.toLocaleString('es-CO')} reseñas
          </span>
          <h2 className="text-[32px] leading-none font-extrabold tracking-[-0.02em] text-tinta md:text-[44px]">
            Qué dicen los que ya lo usan
          </h2>
        </div>
        <div className="flex items-baseline gap-3">
          <strong className="text-5xl tracking-[-0.03em]">{rating.toFixed(1).replace('.', ',')}</strong>
          <Stars rating={Math.round(rating)} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5.5 md:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.title} className="flex flex-col gap-3 border border-[#E2D7CC] bg-crema p-6.5">
            <Stars rating={review.rating} />
            <strong className="text-[17px]">{review.title}</strong>
            <p className="m-0 text-[15px] leading-[1.6] text-texto">{review.body}</p>
            <span className="font-mono text-xs text-texto-soft">{review.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
