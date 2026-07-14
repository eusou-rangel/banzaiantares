import { Instagram, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Contato", path: "/contato" });

export default function ContactPage() {
  return (
    <section className="container-page py-12">
      <p className="text-sm font-black uppercase text-electric-green">Contato</p>
      <h1 className="mt-2 text-4xl font-black">Fale com a Banzai Geek</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1fr]">
        <div className="grid gap-4">
          <a className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.045] p-5" href={siteConfig.instagram}><Instagram className="text-electric-green" /> @banzaigeekoficial</a>
          <a className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.045] p-5" href={`mailto:${siteConfig.email}`}><Mail className="text-electric-green" /> {siteConfig.email}</a>
        </div>
        <form className="grid gap-4 rounded-md border border-white/10 bg-white/[0.045] p-5">
          <label className="grid gap-2 text-sm font-bold">Nome<input className="admin-input" /></label>
          <label className="grid gap-2 text-sm font-bold">E-mail<input className="admin-input" type="email" /></label>
          <label className="grid gap-2 text-sm font-bold">Mensagem<textarea className="admin-input min-h-32" /></label>
          <button className="rounded-md bg-electric-green px-5 py-3 font-black uppercase text-ink">Enviar mensagem</button>
        </form>
      </div>
    </section>
  );
}
