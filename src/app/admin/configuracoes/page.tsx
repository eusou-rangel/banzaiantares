import { siteConfig } from "@/config/site";

export default function AdminSettingsPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-4xl font-black">Configurações</h1>
      <form className="mt-8 grid gap-5 rounded-md border border-white/10 bg-white/[0.045] p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-bold">Logo<input className="admin-input" type="file" accept="image/*" /></label>
          <label className="grid gap-2 text-sm font-bold">Banner principal<input className="admin-input" type="file" accept="image/*" /></label>
          <label className="grid gap-2 text-sm font-bold">Instagram<input className="admin-input" defaultValue={siteConfig.instagram} /></label>
          <label className="grid gap-2 text-sm font-bold">E-mail<input className="admin-input" defaultValue={siteConfig.email} /></label>
        </div>
        <label className="grid gap-2 text-sm font-bold">Texto institucional<textarea className="admin-input min-h-32" defaultValue={siteConfig.institutional} /></label>
        <button className="w-fit rounded-md bg-electric-green px-5 py-3 font-black uppercase text-ink">Salvar configurações</button>
      </form>
    </section>
  );
}
