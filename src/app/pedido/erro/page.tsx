import Link from "next/link";
import { XCircle } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Pagamento recusado", path: "/pedido/erro" });

export default function ErrorPage() {
  return (
    <section className="container-page grid min-h-[60vh] place-items-center py-12 text-center">
      <div className="max-w-xl rounded-md border border-red-300/30 bg-white/[0.045] p-8">
        <XCircle className="mx-auto text-red-300" size={58} />
        <h1 className="mt-5 text-3xl font-black">Pagamento recusado</h1>
        <p className="mt-3 text-white/68">Não foi possível aprovar o pagamento. Você pode revisar os dados ou escolher outro método.</p>
        <Link href="/checkout" className="mt-6 inline-flex rounded-md bg-electric-green px-5 py-3 font-black uppercase text-ink">Tentar novamente</Link>
      </div>
    </section>
  );
}
