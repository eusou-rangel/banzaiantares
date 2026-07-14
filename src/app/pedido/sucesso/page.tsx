import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Pagamento aprovado", path: "/pedido/sucesso" });

export default function SuccessPage() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-12 text-center">
      <div className="max-w-xl rounded-md border border-electric-green/30 bg-white/[0.045] p-8">
        <CheckCircle2 className="mx-auto text-electric-green" size={58} />
        <h1 className="mt-5 text-3xl font-black">Pagamento aprovado</h1>
        <p className="mt-3 text-white/68">Seu pedido foi registrado e entrou na fila de produção da Banzai Geek.</p>
        <Link href="/catalogo" className="mt-6 inline-flex rounded-md bg-electric-green px-5 py-3 font-black uppercase text-ink">Continuar comprando</Link>
      </div>
    </section>
  );
}
