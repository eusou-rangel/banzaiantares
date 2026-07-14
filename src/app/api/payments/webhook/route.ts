import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  // Production flow:
  // 1. Validate Mercado Pago signature with MERCADO_PAGO_WEBHOOK_SECRET.
  // 2. Fetch payment details using the official SDK.
  // 3. Match external_reference with Orders.number.
  // 4. Update Payments.status and Orders.status.
  return NextResponse.json({ received: true, payloadType: payload.type ?? payload.action ?? "unknown" });
}
