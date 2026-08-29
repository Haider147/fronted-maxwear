import { products, toProductCard } from '@/lib/mocks/product';

export const featuredProducts = products.filter((product) => product.featured).map(toProductCard);

export type Pack = {
  id: string;
  label: string;
  totalPrice: number;
  unitPrice: number;
  featured?: boolean;
  featuredNote?: string;
};

export const packs: Pack[] = [
  { id: 'x2', label: 'Pack x2', totalPrice: 109900, unitPrice: 54950 },
  {
    id: 'x3',
    label: 'Pack x3',
    totalPrice: 149900,
    unitPrice: 49966,
    featured: true,
    featuredNote: 'más elegido',
  },
  { id: 'x5', label: 'Pack x5', totalPrice: 229900, unitPrice: 45980 },
];
