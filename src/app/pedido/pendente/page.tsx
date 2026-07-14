import Link from "next/link";
import { Clock3 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Pagamento pendente", path: "/pedido/pendente" });

export default function PendingPage() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-12 text-center">
      <div className="max-w-xl rounded-md border border-acid-yellow/30 bg-white/[0.045] p-8">
        <Clock3 className="mx-auto text-acid-yellow" size={58} />
        <h1 className="mt-5 text-3xl font-black">Pagamento pendente</h1>
        <p className="mt-3 text-white/68">Estamos aguardando a confirmação do Mercado Pago. Pix e boleto podem levar alguns instantes.</p>
        <Link href="/catalogo" className="mt-6 inline-flex rounded-md border border-white/15 px-5 py-3 font-black uppercase">Voltar ao catálogo</Link>
      </div>
    </section>
  );
}
