"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { sizeChart } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { ActionButton } from "@/components/ui/ActionButton";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [printPlacement, setPrintPlacement] = useState<"Frente" | "Costas">("Frente");

  return (
    <div className="mt-6 grid gap-5">
      <div>
        <span className="text-sm font-bold text-white/65">Tamanho</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSize(item)}
              className={`h-11 min-w-12 rounded-md border px-4 font-black ${
                size === item
                  ? "border-electric-green bg-electric-green text-ink"
                  : "border-white/12 text-white/72"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
        <div className="border-b border-white/10 px-4 py-3 text-sm font-black uppercase text-electric-green">
          Tabela de medidas
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="text-white/58">
              <tr>
                <th className="px-4 py-3">Tamanho</th>
                <th className="px-4 py-3">Cintura</th>
                <th className="px-4 py-3">Tronco</th>
                <th className="px-4 py-3">Altura</th>
              </tr>
            </thead>
            <tbody>
              {sizeChart.map((row) => (
                <tr
                  key={row.size}
                  className={
                    row.size === size
                      ? "bg-electric-green/12 text-electric-green"
                      : "border-t border-white/10 text-white/72"
                  }
                >
                  <td className="px-4 py-3 font-black">{row.size}</td>
                  <td className="px-4 py-3">{row.cintura}</td>
                  <td className="px-4 py-3">{row.tronco}</td>
                  <td className="px-4 py-3">{row.altura}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <span className="text-sm font-bold text-white/65">Cor</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setColor(item)}
              className={`rounded-md border px-4 py-2 text-sm font-bold ${
                color === item
                  ? "border-electric-green bg-electric-green text-ink"
                  : "border-white/12 text-white/72"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-sm font-bold text-white/65">Posicao da estampa</span>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["Frente", "Costas"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setPrintPlacement(item)}
              className={`rounded-md border px-4 py-3 text-sm font-black ${
                printPlacement === item
                  ? "border-electric-green bg-electric-green text-ink"
                  : "border-white/12 text-white/72"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <ActionButton type="button" onClick={() => addItem(product, { size, color, printPlacement })}>
        <ShoppingBag size={18} /> Adicionar ao carrinho
      </ActionButton>
    </div>
  );
}
