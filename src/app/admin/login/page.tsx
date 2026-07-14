import Image from "next/image";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Admin Login", path: "/admin/login" });

export default function AdminLoginPage() {
  return (
    <section className="container-page grid min-h-[70vh] place-items-center py-12">
      <form className="w-full max-w-md rounded-md border border-white/10 bg-white/[0.045] p-7">
        <Image src={siteConfig.logo} alt="Banzai Geek" width={190} height={99} className="h-16 w-auto object-contain" />
        <h1 className="mt-6 text-2xl font-black">Login administrativo</h1>
        <p className="mt-2 text-sm text-white/58">Autenticação simples preparada para evoluir com NextAuth ou sessão própria.</p>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-bold">E-mail<input className="admin-input" type="email" defaultValue="loja.banzai.geek.1@gmail.com" /></label>
          <label className="grid gap-2 text-sm font-bold">Senha<input className="admin-input" type="password" defaultValue="troque-esta-senha" /></label>
          <a href="/admin/dashboard" className="rounded-md bg-electric-green px-5 py-3 text-center font-black uppercase text-ink">Entrar</a>
        </div>
      </form>
    </section>
  );
}
