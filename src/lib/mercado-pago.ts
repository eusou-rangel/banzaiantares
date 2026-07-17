import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

export const mercadoPagoClient = accessToken ? new MercadoPagoConfig({ accessToken }) : null;

type PaymentInput = {
  orderId: string;
  total: number;
  description: string;
  payer: {
    name: string;
    email: string;
    cpf?: string;
  };
};

export async function createPixPayment(input: PaymentInput) {
  if (!mercadoPagoClient) throw new Error("MERCADO_PAGO_ACCESS_TOKEN nao configurado.");
  const payment = new Payment(mercadoPagoClient);

  return payment.create({
    body: {
      transaction_amount: input.total,
      description: input.description,
      payment_method_id: "pix",
      external_reference: input.orderId,
      payer: {
        email: input.payer.email,
        first_name: input.payer.name,
        identification: input.payer.cpf
          ? { type: "CPF", number: input.payer.cpf.replace(/\D/g, "") }
          : undefined
      }
    }
  });
}

export async function createBoletoPayment(input: PaymentInput) {
  if (!mercadoPagoClient) throw new Error("MERCADO_PAGO_ACCESS_TOKEN nao configurado.");
  const payment = new Payment(mercadoPagoClient);

  return payment.create({
    body: {
      transaction_amount: input.total,
      description: input.description,
      payment_method_id: "bolbradesco",
      external_reference: input.orderId,
      payer: {
        email: input.payer.email,
        first_name: input.payer.name,
        identification: input.payer.cpf
          ? { type: "CPF", number: input.payer.cpf.replace(/\D/g, "") }
          : undefined
      }
    }
  });
}

export async function createCheckoutPreference(input: PaymentInput) {
  if (!mercadoPagoClient) throw new Error("MERCADO_PAGO_ACCESS_TOKEN nao configurado.");
  const preference = new Preference(mercadoPagoClient);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return preference.create({
    body: {
      external_reference: input.orderId,
      items: [
        {
          id: input.orderId,
          title: input.description,
          quantity: 1,
          unit_price: input.total,
          currency_id: "BRL"
        }
      ],
      payer: { name: input.payer.name, email: input.payer.email },
      back_urls: {
        success: `${baseUrl}/pedido/sucesso`,
        pending: `${baseUrl}/pedido/pendente`,
        failure: `${baseUrl}/pedido/erro`
      },
      notification_url: `${baseUrl}/api/payments/webhook`,
      auto_return: "approved"
    }
  });
}

export async function getMercadoPagoPayment(paymentId: string) {
  if (!mercadoPagoClient) throw new Error("MERCADO_PAGO_ACCESS_TOKEN nao configurado.");
  const payment = new Payment(mercadoPagoClient);

  return payment.get({ id: paymentId });
}
