import { demoOrders } from "@/lib/orders";
import { formatCurrency } from "@/data/products";
import { orderStatuses } from "@/config/site";

export default function AdminOrdersPage() {
  return (
    <section className="container-page py-12">
      <h1 className="text-4xl font-black">Gerenciar pedidos</h1>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <input className="admin-input" placeholder="Buscar por cliente" />
        <input className="admin-input" placeholder="Buscar por número do pedido" />
      </div>
      <div className="mt-8 overflow-hidden rounded-md border border-white/10">
        {demoOrders.map((order) => (
          <div key={order.id} className="grid gap-4 border-b border-white/10 p-4 last:border-b-0 md:grid-cols-[120px_1fr_160px_220px] md:items-center">
            <strong>{order.number}</strong>
            <div><p>{order.customerName}</p><p className="text-sm text-white/50">{order.email}</p></div>
            <span className="text-electric-green">{formatCurrency(order.total)}</span>
            <select className="admin-input" defaultValue={order.status}>{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select>
          </div>
        ))}
      </div>
    </section>
  );
}
