import { Package, ReceiptText, Timer, Wallet } from "lucide-react";
import { formatCurrency } from "@/data/products";
import { getDashboardStats } from "@/lib/orders";

export default function AdminDashboardPage() {
  const stats = getDashboardStats();
  const cards = [
    ["Total de produtos", stats.totalProducts, Package],
    ["Total de pedidos", stats.totalOrders, ReceiptText],
    ["Pedidos pendentes", stats.pendingOrders, Timer],
    ["Pedidos pagos", stats.paidOrders, Wallet]
  ] as const;

  return (
    <section className="container-page py-12">
      <p className="text-sm font-black uppercase text-electric-green">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Dashboard</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <article key={label} className="rounded-md border border-white/10 bg-white/[0.045] p-5">
            <Icon className="text-electric-green" />
            <p className="mt-5 text-sm text-white/58">{label}</p>
            <strong className="text-3xl">{value}</strong>
          </article>
        ))}
      </div>
      <div className="mt-5 rounded-md border border-electric-green/25 bg-electric-green/10 p-5">
        <p className="text-sm text-white/65">Faturamento total</p>
        <strong className="text-3xl text-electric-green">{formatCurrency(stats.revenue)}</strong>
      </div>
    </section>
  );
}
