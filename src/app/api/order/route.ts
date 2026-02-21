import { NextResponse } from "next/server";

interface OrderPayload {
  size: string;
  flavor: string;
  toppings: string[];
  quantity: number;
  carPlate: string;
  carType: string;
  carColor: string;
  total: number;
}

export async function POST(request: Request) {
  try {
    const order: OrderPayload = await request.json();

    const promises: Promise<unknown>[] = [];

    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (googleScriptUrl) {
      promises.push(
        fetch(googleScriptUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            ...order,
            toppings: order.toppings.join(", ") || "None",
          }),
        }).catch(() => null)
      );
    }

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      const toppingsText =
        order.toppings.length > 0 ? order.toppings.join(", ") : "None";

      const message =
        `🚨 *New Order!*\n\n` +
        `${order.quantity}x ${order.size} *${order.flavor}*\n` +
        `Toppings: ${toppingsText}\n\n` +
        `🚗 Car: ${order.carType} - ${order.carColor}\n` +
        `Plate: ${order.carPlate}\n\n` +
        `💰 *Total: ${order.total} SAR*`;

      promises.push(
        fetch(
          `https://api.telegram.org/bot${telegramToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: message,
              parse_mode: "Markdown",
            }),
          }
        ).catch(() => null)
      );
    }

    await Promise.allSettled(promises);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
