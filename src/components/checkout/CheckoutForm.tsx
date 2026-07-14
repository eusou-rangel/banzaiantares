"use client";

import { useMemo, useState } from "react";
import { CreditCard, Landmark, QrCode, ReceiptText, Truck } from "lucide-react";
import { formatCurrency } from "@/data/products";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
  { id: "pix", label: "Pix", icon: QrCode },
  { id: "credit_card", label: "Cartao de credito", icon: CreditCard },
  { id: "debit_card", label: "Cartao de debito", icon: Landmark },
  { id: "boleto", label: "Boleto bancario", icon: ReceiptText }
];

type ShippingQuote = {
  service: string;
  price: number;
  deliveryDays: number;
};

function getShippingQuote(cep: string, subtotal: number): ShippingQuote {
  const normalized = cep.replace(/\D/g, "");
  const firstDigit = normalized[0] ?? "";
  const isSoutheast = ["0", "1", "2", "3"].includes(firstDigit);
  const isSouth = ["8", "9"].includes(firstDigit);

  if (subtotal >= 249) {
    return { service: "Frete promocional", price: 0, deliveryDays: 10 };
  }

  if (isSoutheast) {
    return { service: "Entrega regional", price: 19.9, deliveryDays: 9 };
  }

  if (isSouth) {
    return { service: "Entrega sul", price: 24.9, deliveryDays: 11 };
  }

  return { service: "Entrega nacional", price: 29.9, deliveryDays: 13 };
}

export function CheckoutForm() {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("pix");
  const [shipping, setShipping] = useState(0);
  const [shippingQuote, setShippingQuote] = useState<ShippingQuote | null>(null);
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    cpf: "",
    cep: "",
    address: "",
    numberAddress: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  const total = useMemo(() => subtotal + shipping, [subtotal, shipping]);

  function applyShippingQuote(cep: string) {
    const normalized = cep.replace(/\D/g, "");
    if (normalized.length !== 8) {
      setStatus("Informe um CEP valido para calcular o frete.");
      return;
    }

    const quote = getShippingQuote(normalized, subtotal);
    setShippingQuote(quote);
    setShipping(quote.price);
    setStatus(`Frete calculado: ${quote.service}, prazo de ${quote.deliveryDays} dias uteis com preparacao e envio.`);
  }

  async function fillAddress(cep: string) {
    const normalized = cep.replace(/\D/g, "");
    setForm((current) => ({ ...current, cep }));
    setShippingQuote(null);
    setShipping(0);

    if (normalized.length !== 8) return;

    const response = await fetch(`https://viacep.com.br/ws/${normalized}/json/`);
    const data = await response.json();

    if (!data.erro) {
      setForm((current) => ({
        ...current,
        address: data.logradouro ?? "",
        neighborhood: data.bairro ?? "",
        city: data.localidade ?? "",
        state: data.uf ?? ""
      }));
      applyShippingQuote(normalized);
    }
  }

  async function submitOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!shippingQuote) {
      setStatus("Calcule o frete antes de finalizar a compra.");
      return;
    }

    setStatus("Criando pedido...");

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: form, items, subtotal, shipping, total, paymentMethod })
    });

    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error ?? "Nao foi possivel iniciar o pagamento.");
      return;
    }

    if (paymentMethod === "pix" && data.qrCodeBase64) {
      window.sessionStorage.setItem("banzai-last-pix", JSON.stringify(data));
    }
    clearCart();
    window.location.href = data.redirectUrl ?? "/pedido/pendente";
  }

  return (
    <form onSubmit={submitOrder} className="grid gap-8 lg:grid-cols-[1fr_390px]">
      <div className="grid gap-6">
        <section className="rounded-md border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-black">Dados do cliente</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[
              ["name", "Nome completo"],
              ["email", "E-mail"],
              ["cpf", "CPF (opcional)"]
            ].map(([key, label]) => (
              <label key={key} className="grid gap-2 text-sm font-bold">
                {label}
                <input
                  required={key !== "cpf"}
                  className="admin-input"
                  value={form[key as keyof typeof form]}
                  onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-md border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-black">Endereco e frete</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <label className="grid gap-2 text-sm font-bold">
              CEP
              <input
                required
                className="admin-input"
                value={form.cep}
                onChange={(event) => fillAddress(event.target.value)}
                placeholder="00000-000"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold md:col-span-2">
              Endereco completo
              <input
                required
                className="admin-input"
                value={form.address}
                onChange={(event) => setForm({ ...form, address: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Numero
              <input
                required
                className="admin-input"
                value={form.numberAddress}
                onChange={(event) => setForm({ ...form, numberAddress: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Complemento
              <input
                className="admin-input"
                value={form.complement}
                onChange={(event) => setForm({ ...form, complement: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Bairro
              <input
                required
                className="admin-input"
                value={form.neighborhood}
                onChange={(event) => setForm({ ...form, neighborhood: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Cidade
              <input
                required
                className="admin-input"
                value={form.city}
                onChange={(event) => setForm({ ...form, city: event.target.value })}
              />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Estado
              <input
                required
                className="admin-input"
                value={form.state}
                onChange={(event) => setForm({ ...form, state: event.target.value })}
              />
            </label>
          </div>

          <div className="mt-5 rounded-md border border-electric-green/25 bg-electric-green/10 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-3">
                <Truck className="mt-1 text-electric-green" size={20} />
                <div>
                  <p className="font-black">Calculo de frete</p>
                  <p className="text-sm text-white/62">
                    Estimativa por CEP. O prazo inclui a preparacao da camisa e o envio da transportadora.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => applyShippingQuote(form.cep)}
                className="rounded-md bg-electric-green px-5 py-3 text-sm font-black uppercase text-ink"
              >
                Calcular frete
              </button>
            </div>

            {shippingQuote && (
              <div className="mt-4 grid gap-2 rounded-md border border-white/10 bg-ink/40 p-4 text-sm sm:grid-cols-3">
                <div>
                  <span className="text-white/50">Servico</span>
                  <strong className="block">{shippingQuote.service}</strong>
                </div>
                <div>
                  <span className="text-white/50">Prazo</span>
                  <strong className="block">{shippingQuote.deliveryDays} dias uteis</strong>
                  <span className="mt-1 block text-xs text-white/45">Preparacao + transporte</span>
                </div>
                <div>
                  <span className="text-white/50">Valor</span>
                  <strong className="block text-electric-green">{formatCurrency(shippingQuote.price)}</strong>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-md border border-white/10 bg-white/[0.045] p-5">
          <h2 className="text-xl font-black">Pagamento</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-center gap-3 rounded-md border p-4 text-left font-bold ${
                    paymentMethod === method.id
                      ? "border-electric-green bg-electric-green text-ink"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  <Icon size={20} /> {method.label}
                </button>
              );
            })}
          </div>
          {paymentMethod === "credit_card" && (
            <p className="mt-4 text-sm text-white/62">
              Parcelamento preparado via Mercado Pago Checkout/API. Configure a chave publica para ativar o Brick de cartao no ambiente real.
            </p>
          )}
        </section>
      </div>

      <aside className="h-fit rounded-md border border-electric-green/25 bg-white/[0.055] p-5">
        <h2 className="text-xl font-black">Resumo do pedido</h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}-${item.printPlacement ?? "Frente"}`} className="flex justify-between gap-4 text-sm">
              <span className="text-white/68">
                {item.name} x {item.quantity}
                <span className="block text-xs text-white/42">
                  {item.size} - {item.color} - Estampa: {item.printPlacement ?? "Frente"}
                </span>
              </span>
              <strong>{formatCurrency(item.price * item.quantity)}</strong>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 border-t border-white/10 pt-5 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="flex justify-between">
            <span>Frete</span>
            <strong>{shippingQuote ? formatCurrency(shipping) : "Calcule pelo CEP"}</strong>
          </div>
          <div className="flex justify-between text-lg">
            <span>Total</span>
            <strong className="text-electric-green">{formatCurrency(total)}</strong>
          </div>
        </div>
        <button
          disabled={!items.length || !shippingQuote}
          className="mt-5 w-full rounded-md bg-electric-green px-5 py-3 font-black uppercase text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Pagar agora
        </button>
        {!shippingQuote && items.length > 0 && (
          <p className="mt-3 text-sm text-white/50">Calcule o frete para liberar o pagamento.</p>
        )}
        {status && <p className="mt-3 text-sm text-white/62">{status}</p>}
      </aside>
    </form>
  );
}
