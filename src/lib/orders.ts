import type { OrderStatus } from "@/config/site";
import { products } from "@/data/products";

export const demoOrders = [
  {
    id: "ord_1001",
    number: "BG-1001",
    customerName: "Marina K.",
    email: "marina@email.com",
    total: 179.8,
    status: "Pago" as OrderStatus,
    createdAt: "2026-06-20"
  },
  {
    id: "ord_1002",
    number: "BG-1002",
    customerName: "Rafael G.",
    email: "rafael@email.com",
    total: 99.9,
    status: "Aguardando pagamento" as OrderStatus,
    createdAt: "2026-06-21"
  },
  {
    id: "ord_1003",
    number: "BG-1003",
    customerName: "Bianca M.",
    email: "bianca@email.com",
    total: 249.7,
    status: "Em produção" as OrderStatus,
    createdAt: "2026-06-22"
  }
];

export function getDashboardStats() {
  const paidOrders = demoOrders.filter((order) => order.status === "Pago");
  const pendingOrders = demoOrders.filter((order) => order.status === "Aguardando pagamento");

  return {
    totalProducts: products.length,
    totalOrders: demoOrders.length,
    pendingOrders: pendingOrders.length,
    paidOrders: paidOrders.length,
    revenue: paidOrders.reduce((total, order) => total + order.total, 0)
  };
}
