import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { ProductPurchase } from "@/components/ProductPurchase";
import { formatCurrency, getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return buildMetadata({ title: "Produto" });
  return buildMetadata({ title: product.name, description: product.shortDescription, path: `/produto/${product.slug}`, image: product.images[0] });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);

  return (
    <section className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div className="grid gap-4 md:grid-cols-[1fr_110px]">
          <div className="relative aspect-[.88] overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
            <Image src={product.images[0]} alt={product.name} fill priority className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1">
            {product.images.map((image) => (
              <div key={image} className="relative aspect-square overflow-hidden rounded-md border border-white/10 bg-white/[0.04]">
                <Image src={image} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-black uppercase text-electric-green">{product.category}</p>
          <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
          <p className="mt-4 text-3xl font-black text-electric-green">{formatCurrency(product.price)}</p>
          <p className="mt-5 leading-7 text-white/70">{product.description}</p>
          <ProductPurchase product={product} />
        </div>
      </div>
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-black">Produtos relacionados</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </div>
      )}
    </section>
  );
}
