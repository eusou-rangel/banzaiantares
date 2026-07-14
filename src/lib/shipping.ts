export type ShippingQuote = {
  provider: "manual" | "correios" | "melhor-envio" | "frenet";
  service: string;
  price: number;
  deliveryDays: number;
};

export async function quoteShipping(cep: string, subtotal: number): Promise<ShippingQuote> {
  // Adapter point for Correios, Melhor Envio and Frenet.
  // deliveryDays includes shirt preparation plus carrier transit time.
  const normalizedCep = cep.replace(/\D/g, "");
  const isSoutheast = ["0", "1", "2", "3"].includes(normalizedCep[0] ?? "");

  if (subtotal >= 249) {
    return { provider: "manual", service: "Frete promocional", price: 0, deliveryDays: 10 };
  }

  return {
    provider: "manual",
    service: isSoutheast ? "PAC regional" : "PAC nacional",
    price: isSoutheast ? 19.9 : 29.9,
    deliveryDays: isSoutheast ? 9 : 13
  };
}
