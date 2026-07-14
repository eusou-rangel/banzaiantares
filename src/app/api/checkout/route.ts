import { NextResponse } from "next/server";
import { z } from "zod";
import { createBoletoPayment, createCheckoutPreference, createPixPayment } from "@/lib/mercado-pago";

const checkoutSchema = z.object({
  customer: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    cpf: z.string().optional(),
    cep: z.string().min(8),
    address: z.string().min(3),
    numberAddress: z.string().min(1),
    complement: z.string().optional(),
    neighborhood: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2)
  }),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    size: z.string(),
    color: z.string(),
    printPlacement: z.enum(["Frente", "Costas"]).optional()
  })).min(1),
  subtotal: z.number(),
  shipping: z.number(),
  total: z.number(),
  paymentMethod: z.enum(["pix", "credit_card", "debit_card", "boleto"])
});

export async function POST(request: Request) {
  const payload = checkoutSchema.parse(await request.json());
  const orderId = `BG-${Date.now()}`;
  const description = `Pedido ${orderId} - Banzai Geek`;

  // In production, persist Order and OrderItems with Prisma before creating payment.
  // Webhooks update Orders.status and Payments.status after Mercado Pago confirmation.
  try {
    if (payload.paymentMethod === "pix") {
      const payment = await createPixPayment({
        orderId,
        total: payload.total,
        description,
        payer: { name: payload.customer.name, email: payload.customer.email, cpf: payload.customer.cpf }
      });
      const qr = payment.point_of_interaction?.transaction_data;

      return NextResponse.json({
        orderId,
        status: payment.status,
        qrCode: qr?.qr_code,
        qrCodeBase64: qr?.qr_code_base64,
        redirectUrl: payment.status === "approved" ? "/pedido/sucesso" : "/pedido/pendente"
      });
    }

    if (payload.paymentMethod === "boleto") {
      const payment = await createBoletoPayment({
        orderId,
        total: payload.total,
        description,
        payer: { name: payload.customer.name, email: payload.customer.email, cpf: payload.customer.cpf }
      });

      return NextResponse.json({
        orderId,
        status: payment.status,
        boletoUrl: payment.transaction_details?.external_resource_url,
        redirectUrl: "/pedido/pendente"
      });
    }

    const preference = await createCheckoutPreference({
      orderId,
      total: payload.total,
      description,
      payer: { name: payload.customer.name, email: payload.customer.email, cpf: payload.customer.cpf }
    });

    return NextResponse.json({
      orderId,
      preferenceId: preference.id,
      redirectUrl: preference.init_point ?? "/pedido/pendente"
    });
  } catch (error) {
    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      return NextResponse.json({
        orderId,
        status: "pending",
        redirectUrl: "/pedido/pendente",
        message: "Pedido simulado. Configure MERCADO_PAGO_ACCESS_TOKEN para pagamentos reais."
      });
    }

    return NextResponse.json({ error: error instanceof Error ? error.message : "Erro no pagamento." }, { status: 400 });
  }
}
