import { ShieldCheck, Star, Truck } from "lucide-react";
import { Banner } from "@/components/Banner";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  const featured = products.filter((product) => product.active);

  return (
    <>
      <Banner />
      <section className="border-b border-white/10 bg-electric-green py-3 text-center text-sm font-black uppercase text-ink">
        {siteConfig.freeShippingText}
      </section>
      <section className="container-page py-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase text-electric-green">Catálogo Banzai</p>
            <h2 className="mt-2 text-3xl font-black">Todas as nossas camisetas</h2>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2"><ShieldCheck size={16} /> Compra segura</span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2"><Truck size={16} /> Envio nacional</span>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>
      <section className="bg-white/[0.035] py-16">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="rounded-md border border-white/10 bg-ink/40 p-5">
              <div className="mb-3 flex text-acid-yellow">
                {Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
              </div>
              <p className="text-sm leading-6 text-white/72">“{review.text}”</p>
              <strong className="mt-4 block text-electric-green">{review.name}</strong>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
