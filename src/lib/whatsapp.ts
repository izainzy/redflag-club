const WHATSAPP_NUMBER = "966562561205";

export function buildWhatsAppURL(
  size: string,
  flavor: string,
  toppings: string[],
  quantity: number,
  carPlate: string,
  carType: string,
  carColor: string,
  total: number
): string {
  const toppingsText =
    toppings.length > 0 ? toppings.join(", ") : "no toppings";

  const message =
    `Hey Red Flag Club! I want to order ${quantity}x ${size} ${flavor} with ${toppingsText}.\n\n` +
    `Car: ${carType} - ${carColor}\n` +
    `Plate: ${carPlate}\n\n` +
    `Total: ${total} SAR\n\n` +
    `See you at the stall!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildGenericWhatsAppURL(): string {
  const message = "Hey Red Flag Club! I'd like to place an order!";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
