import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Catálogo", path: "/catalogo" });

export default function CatalogPage({ searchParams }: { searchParams?: { categoria?: string } }) {
  const requestedCategory = searchParams?.categoria;
  const selected = requestedCategory && categories.includes(requestedCategory)
    ? requestedCategory
    : undefined;
  const filtered = selected ? products.filter((product) => product.category === selected) : products;

  return (
    <section className="container-page py-12">
      <div className="mb-8">
        <p className="text-sm font-black uppercase text-electric-green">Catálogo</p>
        <h1 className="mt-2 text-4xl font-black">Escolha sua próxima camiseta geek</h1>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        <Link href="/catalogo" className={`rounded-md border px-4 py-2 text-sm font-bold ${!selected ? "border-electric-green bg-electric-green text-ink" : "border-white/10 text-white/70"}`}>Todos</Link>
        {categories.map((category) => (
          <Link key={category} href={`/catalogo?categoria=${encodeURIComponent(category)}`} className={`rounded-md border px-4 py-2 text-sm font-bold ${selected === category ? "border-electric-green bg-electric-green text-ink" : "border-white/10 text-white/70"}`}>
            {category}
          </Link>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </section>
  );
}
