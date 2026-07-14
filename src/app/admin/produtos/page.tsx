import { AdminProductForm } from "@/components/AdminProductForm";
import { formatCurrency, products } from "@/data/products";

export default function AdminProductsPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-4xl font-black">Gerenciar produtos</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.9fr]">
        <div className="overflow-hidden rounded-md border border-white/10">
          {products.map((product) => (
            <div key={product.id} className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/10 p-4 last:border-b-0">
              <div><strong>{product.name}</strong><p className="text-sm text-white/55">{product.category} · {product.sku}</p></div>
              <span className="font-bold text-electric-green">{formatCurrency(product.price)}</span>
            </div>
          ))}
        </div>
        <AdminProductForm />
      </div>
    </section>
  );
}
