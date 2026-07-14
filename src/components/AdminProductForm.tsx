"use client";

import { Save, Trash2 } from "lucide-react";
import { categories, products } from "@/data/products";
import { ActionButton } from "@/components/ui/ActionButton";

export function AdminProductForm({ productSlug }: { productSlug?: string }) {
  const product = products.find((item) => item.slug === productSlug) ?? products[0];

  return (
    <form className="grid gap-5 rounded-md border border-white/10 bg-white/[0.045] p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">Nome<input className="admin-input" defaultValue={product.name} /></label>
        <label className="grid gap-2 text-sm font-bold">SKU<input className="admin-input" defaultValue={product.sku} /></label>
        <label className="grid gap-2 text-sm font-bold">Preço<input className="admin-input" type="number" step="0.01" defaultValue={product.price} /></label>
        <label className="grid gap-2 text-sm font-bold">Categoria<select className="admin-input" defaultValue={product.category}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        <label className="grid gap-2 text-sm font-bold">Estoque<input className="admin-input" type="number" defaultValue={product.stock} /></label>
        <label className="grid gap-2 text-sm font-bold">Status<select className="admin-input" defaultValue={product.active ? "active" : "inactive"}><option value="active">Ativo</option><option value="inactive">Inativo</option></select></label>
      </div>
      <label className="grid gap-2 text-sm font-bold">Descrição<textarea className="admin-input min-h-28" defaultValue={product.description} /></label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="grid gap-2 text-sm font-bold">Tamanhos<input className="admin-input" defaultValue={product.sizes.join(", ")} /></label>
        <label className="grid gap-2 text-sm font-bold">Cores<input className="admin-input" defaultValue={product.colors.join(", ")} /></label>
        <label className="grid gap-2 text-sm font-bold">Imagens múltiplas<input className="admin-input" type="file" multiple accept="image/*" /></label>
      </div>
      <div className="flex flex-wrap justify-end gap-3">
        <ActionButton type="button" variant="secondary"><Trash2 size={17} /> Excluir</ActionButton>
        <ActionButton type="button"><Save size={17} /> Salvar produto</ActionButton>
      </div>
    </form>
  );
}
