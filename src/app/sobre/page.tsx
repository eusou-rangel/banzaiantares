import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Sobre", path: "/sobre" });

export default function AboutPage() {
  return (
    <section className="container-page py-12">
      <p className="text-sm font-black uppercase text-electric-green">Sobre</p>
      <h1 className="mt-2 text-4xl font-black">Cultura pop para vestir todo dia</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_.8fr]">
        <div className="rounded-md border border-white/10 bg-white/[0.045] p-7 text-lg leading-8 text-white/74">
          <p>{siteConfig.institutional}</p>
          <p className="mt-5">
            A loja vende camisetas geek criativas e personalizadas, com coleções para anime, games,
            filmes, séries, heróis e pedidos sob medida. Textos, banners e contatos ficam centralizados
            em arquivos simples para edição rápida e podem migrar para o painel administrativo.
          </p>
        </div>
        <div className="rounded-md border border-electric-green/25 bg-electric-green/10 p-7">
          <h2 className="text-2xl font-black">Por que Banzai Geek?</h2>
          <ul className="mt-5 grid gap-3 text-white/74">
            <li>Estampas autorais com energia geek.</li>
            <li>Grade completa de tamanhos do P ao G3.</li>
            <li>Arquitetura pronta para crescer com pedidos reais.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
