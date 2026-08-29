export type Role = 'CUSTOMER' | 'ADMIN';

export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export type User = {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: string;
  userId: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  country: string;
  postalCode: string;
  isDefault: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string | null;
  position: number;
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  size: string | null;
  color: string | null;
  stock: number;
  price: string | null;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  currency: string;
  isActive: boolean;
  categoryId: string | null;
  images: ProductImage[];
};

// Shape de detalle (GET /products/:slug): agrega lo que el listado no necesita.
export type ProductDetail = Product & {
  category: Category | null;
  variants: ProductVariant[];
};

export type CartItem = {
  id: string;
  cartId: string;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
};

export type Cart = {
  id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
};

export type OrderItem = {
  id: string;
  orderId: string;
  variantId: string;
  variant: ProductVariant;
  quantity: number;
  unitPrice: string;
};

export type Order = {
  id: string;
  number: string;
  userId: string;
  addressId: string | null;
  status: OrderStatus;
  total: string;
  currency: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};
