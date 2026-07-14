import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Checkout", path: "/checkout" });

export default function CheckoutPage() {
  return (
    <section className="container-page py-12">
      <p className="text-sm font-black uppercase text-electric-green">Checkout seguro</p>
      <h1 className="mt-2 text-4xl font-black">Finalize sua compra</h1>
      <div className="mt-8"><CheckoutForm /></div>
    </section>
  );
}
