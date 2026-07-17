import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutPreference } from "@/lib/mercado-pago";
import { prisma } from "@/lib/prisma";
import { products } from "@/data/products";

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

function getMercadoPagoError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object") {
    const response = error as {
      message?: string;
      error?: string;
      status?: number;
      cause?: unknown;
    };

    if (response.message) return response.message;
    if (response.error) return response.error;

    if (Array.isArray(response.cause)) {
      return response.cause
        .map((item) => {
          if (item && typeof item === "object" && "description" in item) {
            return String((item as { description: unknown }).description);
          }

          return String(item);
        })
        .join(" ");
    }

    if (response.cause && typeof response.cause === "object" && "message" in response.cause) {
      return String((response.cause as { message: unknown }).message);
    }
  }

  return "Mercado Pago recusou a criacao do pagamento.";
}

const paymentMethodMap = {
  pix: "PIX",
  credit_card: "CREDIT_CARD",
  debit_card: "DEBIT_CARD",
  boleto: "BOLETO"
} as const;

function toJsonValue<T>(value: T) {
  return JSON.parse(JSON.stringify(value));
}

export async function POST(request: Request) {
  const payload = checkoutSchema.parse(await request.json());
  const orderId = `BG-${Date.now()}`;
  const description = `Pedido ${orderId} - Banzai Geek`;
  const orderItems = await Promise.all(
    payload.items.map(async (item) => {
      const catalogProduct = products.find((product) => product.id === item.productId);
      if (!catalogProduct) {
        throw new Error(`Produto ${item.name} nao foi encontrado no catalogo.`);
      }

      const product = await prisma.product.findUnique({
        where: { sku: catalogProduct.sku }
      });

      if (!product) {
        throw new Error(`Produto ${catalogProduct.sku} nao foi encontrado no banco. Rode o seed antes de vender.`);
      }

      return {
        productId: product.id,
        name: item.name,
        sku: catalogProduct.sku,
        size: item.size,
        color: item.color,
        customization: `Estampa: ${item.printPlacement ?? "Frente"}`,
        quantity: item.quantity,
        unitPrice: item.price,
        total: item.price * item.quantity
      };
    })
  );

  const order = await prisma.order.create({
    data: {
      number: orderId,
      customerName: payload.customer.name,
      email: payload.customer.email,
      cpf: payload.customer.cpf || null,
      cep: payload.customer.cep,
      address: payload.customer.address,
      numberAddress: payload.customer.numberAddress,
      complement: payload.customer.complement || null,
      neighborhood: payload.customer.neighborhood,
      city: payload.customer.city,
      state: payload.customer.state,
      subtotal: payload.subtotal,
      shipping: payload.shipping,
      total: payload.total,
      status: "AWAITING_PAYMENT",
      items: {
        create: orderItems
      },
      payments: {
        create: {
          method: paymentMethodMap[payload.paymentMethod],
          status: "PENDING"
        }
      }
    }
  });

  try {
    const preference = await createCheckoutPreference({
      orderId,
      total: payload.total,
      description,
      payer: { name: payload.customer.name, email: payload.customer.email, cpf: payload.customer.cpf }
    });

    await prisma.payment.updateMany({
      where: {
        orderId: order.id,
        providerPaymentId: null
      },
      data: {
        rawResponse: toJsonValue(preference)
      }
    });

    return NextResponse.json({
      orderId,
      preferenceId: preference.id,
      redirectUrl: preference.init_point ?? "/pedido/pendente"
    });
  } catch (error) {
    console.error("Mercado Pago checkout error", JSON.stringify(error, null, 2));

    if (!process.env.MERCADO_PAGO_ACCESS_TOKEN) {
      return NextResponse.json({
        orderId,
        status: "pending",
        redirectUrl: "/pedido/pendente",
        message: "Pedido simulado. Configure MERCADO_PAGO_ACCESS_TOKEN para pagamentos reais."
      });
    }

    return NextResponse.json({ error: getMercadoPagoError(error) }, { status: 400 });
  }
}
