'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type CartContextValue = {
  itemCount: number;
  addItems: (quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

// TODO(api): reemplazar por el carrito real (persistencia + endpoint) cuando
// backend-maxwear lo exponga; por ahora vive solo en memoria del cliente.
export function CartProvider({ children }: { children: ReactNode }) {
  const [itemCount, setItemCount] = useState(2);

  function addItems(quantity: number) {
    setItemCount((count) => count + quantity);
  }

  return <CartContext.Provider value={{ itemCount, addItems }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return context;
}
