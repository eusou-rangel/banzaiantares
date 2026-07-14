"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  printPlacement: "Frente" | "Costas";
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  subtotal: number;
  addItem: (product: Product, options?: Partial<CartItem>) => void;
  updateQuantity: (index: number, quantity: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("banzai-cart");
    if (!stored) return;

    try {
      const savedItems = JSON.parse(stored) as CartItem[];
      const currentItems = savedItems.flatMap((item) => {
        const product = products.find((candidate) => candidate.id === item.productId && candidate.active);
        if (!product) return [];

        return [{
          ...item,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0]
        }];
      });
      setItems(currentItems);
    } catch {
      window.localStorage.removeItem("banzai-cart");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("banzai-cart", JSON.stringify(items));
  }, [items]);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      subtotal,
      addItem(product, options = {}) {
        const nextItem: CartItem = {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: options.size ?? product.sizes[1] ?? product.sizes[0],
          color: options.color ?? product.colors[0],
          printPlacement: options.printPlacement ?? "Frente",
          quantity: options.quantity ?? 1
        };

        setItems((current) => {
          const existingIndex = current.findIndex(
            (item) =>
              item.productId === nextItem.productId &&
              item.size === nextItem.size &&
              item.color === nextItem.color &&
              (item.printPlacement ?? "Frente") === nextItem.printPlacement
          );

          if (existingIndex >= 0) {
            return current.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + nextItem.quantity }
                : item
            );
          }

          return [...current, nextItem];
        });
      },
      updateQuantity(index, quantity) {
        setItems((current) =>
          current.map((item, itemIndex) =>
            itemIndex === index ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        );
      },
      removeItem(index) {
        setItems((current) => current.filter((_, itemIndex) => itemIndex !== index));
      },
      clearCart() {
        setItems([]);
      }
    }),
    [items, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider.");
  return context;
}
