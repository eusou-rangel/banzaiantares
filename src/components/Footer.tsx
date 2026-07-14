import Image from "next/image";
import Link from "next/link";
import { Instagram, Mail, ShieldCheck, Truck, WalletCards } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-ink">
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <Image src={siteConfig.logo} alt="Banzai Geek" width={190} height={99} className="h-14 w-auto object-contain" />
          <p className="mt-4 max-w-md text-sm leading-6 text-white/65">{siteConfig.description}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold uppercase text-white/76">
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2"><ShieldCheck size={16} /> Compra segura</span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2"><Truck size={16} /> Frete nacional</span>
            <span className="inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-2"><WalletCards size={16} /> Pix e cartão</span>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-electric-green">Loja</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <Link href="/catalogo">Catálogo</Link>
            <Link href="/checkout">Checkout</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-electric-green">Contato</h3>
          <div className="mt-4 grid gap-3 text-sm text-white/68">
            <a href={siteConfig.instagram} className="inline-flex items-center gap-2"><Instagram size={16} /> @banzaigeekoficial</a>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2"><Mail size={16} /> {siteConfig.email}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        © 2026 Banzai Geek. Camisetas autorais inspiradas em cultura pop.
      </div>
    </footer>
  );
}
