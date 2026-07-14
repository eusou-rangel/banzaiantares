"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { formatCurrency } from "@/data/products";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group overflow-hidden rounded-md border border-white/10 bg-white/[0.045] transition hover:-translate-y-1 hover:border-electric-green/45 hover:shadow-glow">
      <Link href={`/produto/${product.slug}`} className="block">
        <div className="relative aspect-[.88] overflow-hidden bg-ink">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute left-3 top-3 rounded-md bg-ink/85 px-2 py-1 text-xs font-black uppercase text-electric-green">{product.category}</div>
        </div>
      </Link>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="font-black">{product.name}</h3>
          <span className="inline-flex items-center gap-1 text-xs text-acid-yellow"><Star size={14} fill="currentColor" /> {product.rating}</span>
        </div>
        <p className="min-h-10 text-sm leading-5 text-white/60">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <strong className="text-lg text-electric-green">{formatCurrency(product.price)}</strong>
          <button onClick={() => addItem(product)} className="inline-flex h-10 items-center gap-2 rounded-md bg-electric-green px-3 text-sm font-black text-ink transition hover:bg-acid-yellow">
            <ShoppingBag size={16} /> Adicionar
          </button>
        </div>
      </div>
    </article>
  );
}
