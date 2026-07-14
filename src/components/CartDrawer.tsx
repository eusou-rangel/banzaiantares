"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { formatCurrency } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ActionLink } from "@/components/ui/ActionButton";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button className="absolute inset-0 bg-black/70" onClick={onClose} aria-label="Fechar" />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-midnight shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-5">
          <h2 className="text-lg font-black uppercase">Carrinho</h2>
          <button className="h-9 w-9 rounded-md border border-white/10 text-white/70" onClick={onClose} aria-label="Fechar carrinho">
            <X className="mx-auto" size={18} />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {items.length === 0 ? (
            <p className="rounded-md border border-dashed border-white/15 p-5 text-sm text-white/58">
              Seu carrinho está vazio.
            </p>
          ) : (
            items.map((item, index) => (
              <div key={`${item.productId}-${index}`} className="grid grid-cols-[86px_1fr] gap-4 rounded-md border border-white/10 bg-white/[0.04] p-3">
                <Image src={item.image} alt={item.name} width={86} height={98} className="rounded-md bg-ink object-cover" />
                <div>
                  <div className="flex justify-between gap-3">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-xs text-white/50">
                        {item.size} - {item.color} - Estampa: {item.printPlacement ?? "Frente"}
                      </p>
                    </div>
                    <button className="h-8 w-8 rounded-md border border-white/10 text-white/58 hover:text-red-300" onClick={() => removeItem(index)} aria-label="Remover produto">
                      <Trash2 className="mx-auto" size={15} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-white/10">
                      <button className="h-8 w-8" onClick={() => updateQuantity(index, item.quantity - 1)} aria-label="Diminuir">
                        <Minus className="mx-auto" size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button className="h-8 w-8" onClick={() => updateQuantity(index, item.quantity + 1)} aria-label="Aumentar">
                        <Plus className="mx-auto" size={14} />
                      </button>
                    </div>
                    <strong className="text-electric-green">{formatCurrency(item.price * item.quantity)}</strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-white/60">Subtotal</span>
            <strong className="text-xl text-electric-green">{formatCurrency(subtotal)}</strong>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/carrinho" onClick={onClose} className="rounded-md border border-white/15 px-4 py-3 text-center text-sm font-black uppercase">
              Ver carrinho
            </Link>
            <ActionLink href="/checkout" onClick={onClose} className="px-4">
              Checkout
            </ActionLink>
          </div>
        </div>
      </aside>
    </div>
  );
}
