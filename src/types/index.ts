export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  currency: string;
  images: { id: string; url: string; alt: string | null }[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};
