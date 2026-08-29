import type { Product } from '@/types';

export type ProductColor = { name: string; hex: string };
export type ProductSize = { label: string; stock: number };
export type ProductDetailSection = { title: string; body: string };
export type ProductSpec = { label: string; value: string };
export type ProductReview = { rating: number; title: string; body: string; author: string };

// Shape mock de solo lectura: omite los campos de administración del backend
// (isActive, categoryId) que este catálogo de ejemplo no necesita modelar.
type MockProductBase = Omit<Product, 'isActive' | 'categoryId'>;

// Tarjeta liviana usada en grillas (home, relacionados) — se deriva de
// ProductDetail vía toProductCard(), nunca se mantiene a mano.
export type ProductCardData = MockProductBase & {
  placeholderLabel: string;
  badge?: string;
  compareAtPrice?: string;
  colors?: string[];
  savingsLabel?: string;
};

export type ProductDetail = MockProductBase & {
  category: string;
  eyebrow: string;
  compareAtPrice?: string;
  discountLabel?: string;
  cardBadge?: string;
  savingsLabel?: string;
  galleryBadge?: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  galleryLabels: string[];
  colors: ProductColor[];
  sizes: ProductSize[];
  guarantees: string[];
  details: ProductDetailSection[];
  fabricEyebrow: string;
  fabricHeadingLine1: string;
  fabricHeadingLine2: string;
  fabricPlaceholderLabel: string;
  fabricSpecs: ProductSpec[];
  packUpsell: { title: string; description: string; ctaLabel: string; ctaHref: string };
  reviews: ProductReview[];
};

const defaultGuarantees = [
  'Envío 24-48h en Colombia',
  'Cambios gratis por 30 días',
  'Pago contra entrega',
  'Sin etiquetas que raspen',
];

// TODO(api): reemplazar por el catálogo real cuando backend-maxwear exponga
// GET /products y GET /products/:slug. Este es el único catálogo mock del
// sitio — home y "relacionados" derivan sus tarjetas de aquí (toProductCard).
export const products: ProductDetail[] = [
  {
    id: '1',
    slug: 'trunk-tela-fria',
    category: 'Boxers',
    name: 'Boxer Trunk Tela Fría',
    description:
      'Microfibra fría que no guarda calor, costuras planas y cintura ancha que se queda quieta. El que te vas a poner todos los días hasta que se acaben los otros.',
    price: '59900',
    compareAtPrice: '74900',
    discountLabel: '-20%',
    cardBadge: 'Top 1',
    galleryBadge: 'Top 1 en ventas',
    featured: true,
    currency: 'COP',
    images: [],
    eyebrow: 'Tela fría · fit masculino',
    rating: 4.8,
    reviewCount: 1284,
    galleryLabels: [
      'foto producto · vista frontal',
      'foto producto · vista 02',
      'foto producto · vista 03',
      'foto producto · vista 04',
    ],
    colors: [
      { name: 'Negro', hex: '#2C1F1A' },
      { name: 'Terracota', hex: '#A85A3C' },
      { name: 'Café', hex: '#6B4438' },
      { name: 'Arena', hex: '#D9CFC4' },
    ],
    sizes: [
      { label: 'S', stock: 12 },
      { label: 'M', stock: 8 },
      { label: 'L', stock: 3 },
      { label: 'XL', stock: 0 },
      { label: 'XXL', stock: 15 },
    ],
    guarantees: defaultGuarantees,
    details: [
      {
        title: 'Detalles y calce',
        body: 'Corte trunk de pierna corta (12 cm). Cintura ancha forrada, sin etiqueta interna. Bragueta cerrada con panel de soporte. Calce ajustado sin comprimir.',
      },
      {
        title: 'Cuidado',
        body: 'Lavado en agua fría a máquina, ciclo suave. No usar blanqueador ni suavizante. Secado a la sombra. No planchar el elástico.',
      },
      {
        title: 'Envíos y cambios',
        body: 'Envío 24-48h en ciudades principales, 3-5 días en el resto del país. Gratis desde $150.000. Cambio de talla gratis dentro de 30 días, incluso si ya lo usaste.',
      },
    ],
    fabricEyebrow: 'La tela',
    fabricHeadingLine1: 'Fría de verdad,',
    fabricHeadingLine2: 'no de etiqueta',
    fabricPlaceholderLabel: 'macro de la tela',
    fabricSpecs: [
      { label: 'Composición', value: '92% microfibra · 8% elastano' },
      { label: 'Peso', value: 'Ligero · 145 g/m²' },
      { label: 'Secado', value: '3x más rápido que algodón' },
      { label: 'Largo de pierna', value: 'Trunk · 12 cm' },
    ],
    packUpsell: {
      title: 'Llévate 3 y paga como 2',
      description: 'Pack x3 en $149.900 · $49.966 c/u · ahorras $29.800',
      ctaLabel: 'Armar pack',
      ctaHref: '/',
    },
    reviews: [
      {
        rating: 5,
        title: 'Ya boté los otros',
        body: 'Compré uno para probar y volví por el pack. La tela es fría en serio, en Barranquilla se nota.',
        author: 'Andrés M. · Talla L · Compra verificada',
      },
      {
        rating: 5,
        title: 'Se lo regalé y me pidió más',
        body: 'Lo compré para mi esposo sin saber la talla y el cambio fue facilísimo. Ahora solo usa estos.',
        author: 'Laura P. · Talla XL · Compra verificada',
      },
      {
        rating: 4,
        title: 'No se sube al caminar',
        body: 'La cintura no aprieta y la pierna se queda en su sitio. Le quito una estrella porque quiero más colores.',
        author: 'Julián R. · Talla M · Compra verificada',
      },
    ],
  },
  {
    id: '2',
    slug: 'boxer-largo-tela-fria',
    category: 'Boxers',
    name: 'Boxer Largo Tela Fría',
    description:
      'La misma tela fría del trunk, en corte largo para más cobertura de pierna. Cintura ancha, sin roces, ideal para días completos de pie o de moto.',
    price: '64900',
    featured: true,
    currency: 'COP',
    images: [],
    eyebrow: 'Tela fría · pierna larga',
    rating: 4.7,
    reviewCount: 592,
    galleryLabels: [
      'foto producto · vista frontal',
      'foto producto · vista 02',
      'foto producto · vista 03',
      'foto producto · vista 04',
    ],
    colors: [
      { name: 'Terracota', hex: '#A85A3C' },
      { name: 'Negro', hex: '#2C1F1A' },
      { name: 'Verde oliva', hex: '#7E8A80' },
    ],
    sizes: [
      { label: 'S', stock: 9 },
      { label: 'M', stock: 14 },
      { label: 'L', stock: 6 },
      { label: 'XL', stock: 2 },
      { label: 'XXL', stock: 0 },
    ],
    guarantees: defaultGuarantees,
    details: [
      {
        title: 'Detalles y calce',
        body: 'Corte largo de pierna (20 cm). Cintura ancha forrada, sin etiqueta interna. Calce relajado que no se sube al caminar.',
      },
      {
        title: 'Cuidado',
        body: 'Lavado en agua fría a máquina, ciclo suave. No usar blanqueador ni suavizante. Secado a la sombra. No planchar el elástico.',
      },
      {
        title: 'Envíos y cambios',
        body: 'Envío 24-48h en ciudades principales, 3-5 días en el resto del país. Gratis desde $150.000. Cambio de talla gratis dentro de 30 días, incluso si ya lo usaste.',
      },
    ],
    fabricEyebrow: 'La tela',
    fabricHeadingLine1: 'Cobertura extra,',
    fabricHeadingLine2: 'cero calor extra',
    fabricPlaceholderLabel: 'macro de la tela',
    fabricSpecs: [
      { label: 'Composición', value: '92% microfibra · 8% elastano' },
      { label: 'Peso', value: 'Ligero · 145 g/m²' },
      { label: 'Secado', value: '3x más rápido que algodón' },
      { label: 'Largo de pierna', value: 'Largo · 20 cm' },
    ],
    packUpsell: {
      title: 'Combínalo con el trunk',
      description: 'Lleva 1 largo + 2 trunk y arma tu pack x3 en $149.900',
      ctaLabel: 'Armar pack',
      ctaHref: '/',
    },
    reviews: [
      {
        rating: 5,
        title: 'Para todo el día en moto',
        body: 'No se sube ni se enrolla. Lo uso para trabajar y no he tenido una sola rozadura.',
        author: 'Camilo D. · Talla M · Compra verificada',
      },
      {
        rating: 4,
        title: 'Buena cobertura',
        body: 'Me gusta más largo que el trunk. Ojalá saquen más colores oscuros.',
        author: 'Felipe A. · Talla L · Compra verificada',
      },
      {
        rating: 5,
        title: 'Ahora solo uso estos',
        body: 'La cintura es lo mejor, no aprieta y no se enrolla como los de algodón.',
        author: 'Santiago R. · Talla S · Compra verificada',
      },
    ],
  },
  {
    id: '3',
    slug: 'trunk-algodon-pima',
    category: 'Boxers',
    name: 'Trunk Algodón Pima',
    description:
      'Algodón pima suave para el día a día, con el mismo corte trunk y cintura ancha. Para cuando quieres comodidad clásica en vez de tela técnica.',
    price: '47900',
    compareAtPrice: '59900',
    discountLabel: '-20%',
    cardBadge: '-20%',
    featured: true,
    currency: 'COP',
    images: [],
    eyebrow: 'Algodón pima · fit clásico',
    rating: 4.6,
    reviewCount: 341,
    galleryLabels: [
      'foto producto · vista frontal',
      'foto producto · vista 02',
      'foto producto · vista 03',
    ],
    colors: [
      { name: 'Gris', hex: '#8B8B8B' },
      { name: 'Negro', hex: '#2C1F1A' },
    ],
    sizes: [
      { label: 'S', stock: 5 },
      { label: 'M', stock: 11 },
      { label: 'L', stock: 8 },
      { label: 'XL', stock: 4 },
      { label: 'XXL', stock: 0 },
    ],
    guarantees: defaultGuarantees,
    details: [
      {
        title: 'Detalles y calce',
        body: 'Corte trunk de pierna corta (12 cm) en algodón pima peinado. Cintura ancha, sin etiqueta interna. Calce ajustado sin comprimir.',
      },
      {
        title: 'Cuidado',
        body: 'Lavado en agua fría a máquina. No usar blanqueador. Secado a la sombra para conservar el elástico.',
      },
      {
        title: 'Envíos y cambios',
        body: 'Envío 24-48h en ciudades principales, 3-5 días en el resto del país. Gratis desde $150.000. Cambio de talla gratis dentro de 30 días.',
      },
    ],
    fabricEyebrow: 'La tela',
    fabricHeadingLine1: 'Algodón suave,',
    fabricHeadingLine2: 'todos los días',
    fabricPlaceholderLabel: 'macro de la tela',
    fabricSpecs: [
      { label: 'Composición', value: '95% algodón pima · 5% elastano' },
      { label: 'Peso', value: 'Medio · 180 g/m²' },
      { label: 'Secado', value: 'Estándar' },
      { label: 'Largo de pierna', value: 'Trunk · 12 cm' },
    ],
    packUpsell: {
      title: 'Súmale tela fría',
      description: 'Prueba el Trunk Tela Fría por $59.900 y compara cuál te gusta más',
      ctaLabel: 'Ver Trunk Tela Fría',
      ctaHref: '/productos/trunk-tela-fria',
    },
    reviews: [
      {
        rating: 5,
        title: 'Clásico y cómodo',
        body: 'Para los que no quieren tela sintética, este algodón pima se siente muy suave.',
        author: 'Mateo G. · Talla M · Compra verificada',
      },
      {
        rating: 4,
        title: 'Buena relación precio-calidad',
        body: 'Con el descuento salió muy bien. La tela es más gruesa que la fría, como se esperaba.',
        author: 'Nicolás V. · Talla L · Compra verificada',
      },
      {
        rating: 5,
        title: 'Mi favorito para dormir',
        body: 'Los uso más para la casa que para salir. Se sienten frescos igual.',
        author: 'Daniel P. · Talla S · Compra verificada',
      },
    ],
  },
  {
    id: '4',
    slug: 'pack-esenciales-x3',
    category: 'Packs',
    name: 'Pack Esenciales x3',
    description:
      '3 boxers trunk tela fría a elegir entre nuestros colores. La forma más barata de surtir el cajón sin lavar cada dos días.',
    price: '149900',
    savingsLabel: 'Ahorras $29.800',
    featured: true,
    currency: 'COP',
    images: [],
    eyebrow: 'Tela fría · pack x3',
    rating: 4.9,
    reviewCount: 803,
    galleryLabels: ['foto pack · 3 unidades', 'foto pack · colores', 'foto pack · doblado'],
    colors: [
      { name: 'Negro', hex: '#2C1F1A' },
      { name: 'Terracota', hex: '#A85A3C' },
      { name: 'Café', hex: '#6B4438' },
      { name: 'Arena', hex: '#D9CFC4' },
    ],
    sizes: [
      { label: 'S', stock: 7 },
      { label: 'M', stock: 10 },
      { label: 'L', stock: 5 },
      { label: 'XL', stock: 3 },
      { label: 'XXL', stock: 6 },
    ],
    guarantees: defaultGuarantees,
    details: [
      {
        title: 'Qué incluye',
        body: '3 unidades de Boxer Trunk Tela Fría. Elige la talla base al agregar al carrito; puedes ajustar colores desde tu bolsa antes de pagar.',
      },
      {
        title: 'Cuidado',
        body: 'Lavado en agua fría a máquina, ciclo suave. No usar blanqueador ni suavizante. Secado a la sombra.',
      },
      {
        title: 'Envíos y cambios',
        body: 'Envío 24-48h en ciudades principales, 3-5 días en el resto del país. Gratis desde $150.000. Cambio de talla gratis dentro de 30 días.',
      },
    ],
    fabricEyebrow: 'La tela',
    fabricHeadingLine1: 'Fría de verdad,',
    fabricHeadingLine2: 'por triplicado',
    fabricPlaceholderLabel: 'macro de la tela',
    fabricSpecs: [
      { label: 'Composición', value: '92% microfibra · 8% elastano' },
      { label: 'Peso', value: 'Ligero · 145 g/m²' },
      { label: 'Secado', value: '3x más rápido que algodón' },
      { label: 'Unidades', value: '3 boxers trunk' },
    ],
    packUpsell: {
      title: 'Súmale medias invisibles',
      description: 'Agrega Medias Invisibles x3 por $39.900 y completa el cajón',
      ctaLabel: 'Ver medias',
      ctaHref: '/productos/medias-invisibles-x3',
    },
    reviews: [
      {
        rating: 5,
        title: 'El pack que hay que comprar',
        body: 'Sale más barato que comprar uno por uno y ya no me quedo sin ropa interior limpia.',
        author: 'Esteban L. · Talla L · Compra verificada',
      },
      {
        rating: 5,
        title: 'Regalo fácil',
        body: 'Compré uno para mi hermano y otro para mí. Los dos quedamos contentos.',
        author: 'Valentina S. · Talla M · Compra verificada',
      },
      {
        rating: 4,
        title: 'Buen ahorro',
        body: 'Me hubiera gustado poder elegir los 3 colores desde aquí mismo, pero el producto está muy bien.',
        author: 'Ricardo N. · Talla XL · Compra verificada',
      },
    ],
  },
  {
    id: '5',
    slug: 'medias-invisibles-x3',
    category: 'Accesorios',
    name: 'Medias Invisibles x3',
    description:
      'Medias invisibles de algodón con silicona antideslizante en el talón. Pack de 3 pares para no volver a perder una media el día del lavado.',
    price: '39900',
    featured: false,
    currency: 'COP',
    images: [],
    eyebrow: 'Algodón · corte invisible',
    rating: 4.5,
    reviewCount: 176,
    galleryLabels: ['foto producto · pack x3', 'foto producto · detalle talón'],
    colors: [
      { name: 'Negro', hex: '#2C1F1A' },
      { name: 'Blanco', hex: '#F4E9DF' },
      { name: 'Gris', hex: '#8B8B8B' },
    ],
    sizes: [
      { label: '35-37', stock: 10 },
      { label: '38-40', stock: 14 },
      { label: '41-43', stock: 9 },
      { label: '44-46', stock: 0 },
    ],
    guarantees: defaultGuarantees,
    details: [
      {
        title: 'Detalles',
        body: 'Corte invisible bajo el borde del zapato. Silicona antideslizante en el talón para que no se salga caminando.',
      },
      {
        title: 'Cuidado',
        body: 'Lavado en agua fría a máquina. Secado a la sombra para conservar la silicona del talón.',
      },
      {
        title: 'Envíos y cambios',
        body: 'Envío 24-48h en ciudades principales, 3-5 días en el resto del país. Gratis desde $150.000. Cambio de talla gratis dentro de 30 días.',
      },
    ],
    fabricEyebrow: 'La tela',
    fabricHeadingLine1: 'Invisibles de verdad,',
    fabricHeadingLine2: 'no se salen',
    fabricPlaceholderLabel: 'macro de la tela',
    fabricSpecs: [
      { label: 'Composición', value: '80% algodón · 15% poliéster · 5% elastano' },
      { label: 'Peso', value: 'Ligero' },
      { label: 'Talón', value: 'Silicona antideslizante' },
      { label: 'Unidades', value: '3 pares' },
    ],
    packUpsell: {
      title: 'Completa el cajón',
      description: 'Súmale el Pack Esenciales x3 de boxers por $149.900',
      ctaLabel: 'Ver pack',
      ctaHref: '/productos/pack-esenciales-x3',
    },
    reviews: [
      {
        rating: 5,
        title: 'No se salen del zapato',
        body: 'Las he usado con tenis y con zapato formal y no se bajan en todo el día.',
        author: 'Juan D. · Talla 41-43 · Compra verificada',
      },
      {
        rating: 4,
        title: 'Buenas para el gimnasio',
        body: 'Cómodas y frescas. La talla 44-46 estaba agotada cuando compré, toca esperar.',
        author: 'Sebastián M. · Talla 38-40 · Compra verificada',
      },
      {
        rating: 4,
        title: 'Cumplen lo que prometen',
        body: 'De verdad son invisibles, ni se notan con mocasines.',
        author: 'Alejandro T. · Talla 41-43 · Compra verificada',
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function toProductCard(product: ProductDetail): ProductCardData {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    currency: product.currency,
    images: product.images,
    placeholderLabel: product.galleryLabels[0],
    badge: product.cardBadge,
    compareAtPrice: product.compareAtPrice,
    colors: product.colors.map((color) => color.hex),
    savingsLabel: product.savingsLabel,
  };
}
