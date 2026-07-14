import { CartPageClient } from "@/components/CartPageClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Carrinho", path: "/carrinho" });

export default function CartPage() {
  return <CartPageClient />;
}
