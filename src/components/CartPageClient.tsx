"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ActionLink } from "@/components/ui/ActionButton";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const shipping = subtotal >= 249 || subtotal === 0 ? 0 : 19.9;

  return (
    <section className="container-page py-12">
      <h1 className="text-4xl font-black">Carrinho</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {items.length === 0 ? (
            <div className="rounded-md border border-dashed border-white/15 p-8 text-white/65">
              Seu carrinho está vazio. <Link className="text-electric-green" href="/catalogo">Ver catálogo</Link>
            </div>
          ) : (
            items.map((item, index) => (
              <article key={`${item.productId}-${index}`} className="grid gap-4 rounded-md border border-white/10 bg-white/[0.04] p-4 md:grid-cols-[110px_1fr_auto]">
                <Image src={item.image} alt={item.name} width={110} height={126} className="rounded-md bg-ink object-cover" />
                <div>
                  <h2 className="text-lg font-black">{item.name}</h2>
                  <p className="text-sm text-white/55">
                    {item.size} - {item.color} - Estampa: {item.printPlacement ?? "Frente"}
                  </p>
                </div>
                <div className="flex items-center gap-4 md:flex-col md:items-end">
                  <strong className="text-electric-green">{formatCurrency(item.price * item.quantity)}</strong>
                  <div className="flex items-center rounded-md border border-white/10">
                    <button className="h-9 w-9" onClick={() => updateQuantity(index, item.quantity - 1)}><Minus className="mx-auto" size={14} /></button>
                    <span className="w-9 text-center font-bold">{item.quantity}</span>
                    <button className="h-9 w-9" onClick={() => updateQuantity(index, item.quantity + 1)}><Plus className="mx-auto" size={14} /></button>
                  </div>
                  <button className="inline-flex items-center gap-2 text-sm text-red-200" onClick={() => removeItem(index)}><Trash2 size={15} /> Remover</button>
                </div>
              </article>
            ))
          )}
        </div>
        <aside className="h-fit rounded-md border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-black">Resumo</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between"><span className="text-white/60">Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <div className="flex justify-between"><span className="text-white/60">Frete estimado</span><strong>{formatCurrency(shipping)}</strong></div>
            <div className="flex justify-between border-t border-white/10 pt-4 text-lg"><span>Total</span><strong className="text-electric-green">{formatCurrency(subtotal + shipping)}</strong></div>
          </div>
          <ActionLink href="/checkout" className="mt-5 w-full">Finalizar compra</ActionLink>
        </aside>
      </div>
    </section>
  );
}
