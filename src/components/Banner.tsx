import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ActionLink } from "@/components/ui/ActionButton";

export function Banner() {
  return (
    <section className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden border-b border-white/10">
      <Image src={siteConfig.heroImage} alt="Banzai Geek" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/76 to-ink/18" />
      <div className="absolute inset-0 grid-mask opacity-35" />
      <div className="container-page relative z-10 flex min-h-[calc(100vh-80px)] items-center py-16">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-electric-green/30 bg-electric-green/10 px-3 py-2 text-xs font-black uppercase text-electric-green">
            <Sparkles size={16} /> Nova coleção geek
          </div>
          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">Banzai Geek</h1>
          <p className="mt-5 text-xl font-semibold leading-8 text-white/82 sm:text-2xl">{siteConfig.slogan}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/catalogo">Ver catálogo <ArrowRight size={18} /></ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
