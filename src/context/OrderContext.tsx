"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Size = "small" | "medium" | "large";
export type Flavor = "toxic-banana" | "red-flag-classic" | "mixed-signals";
export type Topping = "oreo" | "lotus" | "coconut" | "nuts";

const PRICES: Record<Size, number> = {
  small: 18,
  medium: 25,
  large: 30,
};

const TOPPING_PRICE = 3;

const SIZE_LABELS: Record<Size, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

const FLAVOR_LABELS: Record<Flavor, string> = {
  "toxic-banana": "Toxic Banana",
  "red-flag-classic": "Red Flag Classic",
  "mixed-signals": "Mixed Signals",
};

const TOPPING_LABELS: Record<Topping, string> = {
  oreo: "Crushed Oreo",
  lotus: "Lotus Crumbs",
  coconut: "Coconut Flakes",
  nuts: "Nuts",
};

interface OrderState {
  size: Size | null;
  flavor: Flavor | null;
  toppings: Topping[];
  quantity: number;
  carPlate: string;
  carType: string;
  carColor: string;
}

interface OrderContextValue extends OrderState {
  setSize: (size: Size) => void;
  setFlavor: (flavor: Flavor) => void;
  toggleTopping: (topping: Topping) => void;
  setQuantity: (qty: number) => void;
  incrementQty: () => void;
  decrementQty: () => void;
  setCarPlate: (v: string) => void;
  setCarType: (v: string) => void;
  setCarColor: (v: string) => void;
  totalPrice: number;
  unitPrice: number;
  isComplete: boolean;
  sizeLabel: string;
  flavorLabel: string;
  toppingLabels: string[];
  reset: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [order, setOrder] = useState<OrderState>({
    size: null,
    flavor: null,
    toppings: [],
    quantity: 1,
    carPlate: "",
    carType: "",
    carColor: "",
  });

  const setSize = useCallback((size: Size) => {
    setOrder((prev) => ({ ...prev, size }));
  }, []);

  const setFlavor = useCallback((flavor: Flavor) => {
    setOrder((prev) => ({ ...prev, flavor }));
  }, []);

  const toggleTopping = useCallback((topping: Topping) => {
    setOrder((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(topping)
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping],
    }));
  }, []);

  const setQuantity = useCallback((qty: number) => {
    setOrder((prev) => ({ ...prev, quantity: Math.max(1, Math.min(10, qty)) }));
  }, []);

  const incrementQty = useCallback(() => {
    setOrder((prev) => ({ ...prev, quantity: Math.min(10, prev.quantity + 1) }));
  }, []);

  const decrementQty = useCallback(() => {
    setOrder((prev) => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }));
  }, []);

  const setCarPlate = useCallback((carPlate: string) => {
    setOrder((prev) => ({ ...prev, carPlate }));
  }, []);

  const setCarType = useCallback((carType: string) => {
    setOrder((prev) => ({ ...prev, carType }));
  }, []);

  const setCarColor = useCallback((carColor: string) => {
    setOrder((prev) => ({ ...prev, carColor }));
  }, []);

  const reset = useCallback(() => {
    setOrder({
      size: null,
      flavor: null,
      toppings: [],
      quantity: 1,
      carPlate: "",
      carType: "",
      carColor: "",
    });
  }, []);

  const unitPrice =
    (order.size ? PRICES[order.size] : 0) +
    order.toppings.length * TOPPING_PRICE;

  const totalPrice = unitPrice * order.quantity;

  const isComplete =
    order.size !== null &&
    order.flavor !== null &&
    order.carPlate.trim() !== "" &&
    order.carType.trim() !== "" &&
    order.carColor.trim() !== "";

  const value: OrderContextValue = {
    ...order,
    setSize,
    setFlavor,
    toggleTopping,
    setQuantity,
    incrementQty,
    decrementQty,
    setCarPlate,
    setCarType,
    setCarColor,
    totalPrice,
    unitPrice,
    isComplete,
    sizeLabel: order.size ? SIZE_LABELS[order.size] : "",
    flavorLabel: order.flavor ? FLAVOR_LABELS[order.flavor] : "",
    toppingLabels: order.toppings.map((t) => TOPPING_LABELS[t]),
    reset,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}

export { PRICES, TOPPING_PRICE, SIZE_LABELS, FLAVOR_LABELS, TOPPING_LABELS };
