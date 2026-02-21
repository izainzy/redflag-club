export interface OrderData {
  size: string;
  flavor: string;
  toppings: string[];
  quantity: number;
  carPlate: string;
  carType: string;
  carColor: string;
  total: number;
}

export async function submitOrder(order: OrderData): Promise<void> {
  try {
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
  } catch {
    // Silently fail -- never block the WhatsApp redirect
  }
}
