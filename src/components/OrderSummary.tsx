"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { useOrder } from "@/context/OrderContext";
import { buildWhatsAppURL } from "@/lib/whatsapp";
import { submitOrder } from "@/lib/submitOrder";

function InputField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-3">
      <label className="block font-heading text-sm text-chocolate-dark tracking-wider mb-1">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-white/70 border-2 border-chocolate/15 font-body text-chocolate-dark placeholder:text-chocolate/30 focus:outline-none focus:border-redflag/50 focus:ring-1 focus:ring-redflag/30 transition-all"
      />
    </div>
  );
}

export default function OrderSummary() {
  const {
    size,
    flavor,
    toppings,
    quantity,
    totalPrice,
    unitPrice,
    isComplete,
    sizeLabel,
    flavorLabel,
    toppingLabels,
    carPlate,
    carType,
    carColor,
    setCarPlate,
    setCarType,
    setCarColor,
  } = useOrder();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const whatsappUrl = isComplete
    ? buildWhatsAppURL(sizeLabel, flavorLabel, toppingLabels, quantity, carPlate, carType, carColor, totalPrice)
    : "#";

  const handleOrder = useCallback(() => {
    if (!isComplete) return;
    submitOrder({
      size: sizeLabel,
      flavor: flavorLabel,
      toppings: toppingLabels,
      quantity,
      carPlate,
      carType,
      carColor,
      total: totalPrice,
    });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [isComplete, sizeLabel, flavorLabel, toppingLabels, quantity, carPlate, carType, carColor, totalPrice, whatsappUrl]);

  const missingFields: string[] = [];
  if (!size) missingFields.push("size");
  if (!flavor) missingFields.push("flavor");
  if (!carPlate.trim()) missingFields.push("plate");
  if (!carType.trim()) missingFields.push("car type");
  if (!carColor.trim()) missingFields.push("car color");

  return (
    <section id="order" className="bg-chocolate-dark py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div ref={ref} className="max-w-lg mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="font-heading text-5xl sm:text-6xl text-center text-white tracking-tight mb-8"
        >
          YOUR <span className="text-redflag">ORDER</span>
          <span className="text-warning">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-grunge rounded-2xl p-6 sm:p-8 shadow-2xl"
        >
          {/* Car Info Fields */}
          <div className="mb-5 pb-4 border-b border-chocolate/10">
            <h3 className="font-heading text-xl text-chocolate-dark tracking-wider mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-redflag" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8m-8 4h4m-2 4v4m-4-4h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              CAR DETAILS
            </h3>
            <InputField
              label="LICENSE PLATE"
              placeholder="e.g. ABC 1234"
              value={carPlate}
              onChange={setCarPlate}
            />
            <InputField
              label="CAR TYPE"
              placeholder="e.g. Toyota Camry"
              value={carType}
              onChange={setCarType}
            />
            <InputField
              label="CAR COLOR"
              placeholder="e.g. White"
              value={carColor}
              onChange={setCarColor}
            />
          </div>

          {/* Size */}
          <div className="flex justify-between items-center py-3 border-b border-chocolate/10">
            <span className="font-body text-chocolate-light">Size</span>
            <span className="font-heading text-xl text-chocolate-dark tracking-wider">
              {size ? sizeLabel : "—"}
            </span>
          </div>

          {/* Flavor */}
          <div className="flex justify-between items-center py-3 border-b border-chocolate/10">
            <span className="font-body text-chocolate-light">Flavor</span>
            <span className="font-heading text-xl text-chocolate-dark tracking-wider">
              {flavor ? flavorLabel : "—"}
            </span>
          </div>

          {/* Toppings */}
          <div className="flex justify-between items-start py-3 border-b border-chocolate/10">
            <span className="font-body text-chocolate-light">Drama</span>
            <div className="text-right">
              {toppings.length > 0 ? (
                toppingLabels.map((t) => (
                  <span
                    key={t}
                    className="block font-heading text-base text-chocolate-dark tracking-wider"
                  >
                    {t}
                  </span>
                ))
              ) : (
                <span className="font-heading text-base text-chocolate/40 tracking-wider">
                  No drama (yet)
                </span>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex justify-between items-center py-3 border-b border-chocolate/10">
            <span className="font-body text-chocolate-light">Quantity</span>
            <span className="font-heading text-xl text-chocolate-dark tracking-wider">
              {quantity}x
            </span>
          </div>

          {/* Price breakdown */}
          {quantity > 1 && unitPrice > 0 && (
            <div className="flex justify-between items-center py-2 text-sm">
              <span className="font-body text-chocolate/50">Per cup</span>
              <span className="font-heading text-base text-chocolate/50 tracking-wider">
                {unitPrice} SAR
              </span>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-4">
            <span className="font-heading text-2xl text-chocolate-dark tracking-wider">
              TOTAL
            </span>
            <motion.span
              key={totalPrice}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
              className="font-heading text-3xl text-redflag tracking-wider"
            >
              {totalPrice > 0 ? `${totalPrice} SAR` : "—"}
            </motion.span>
          </div>

          {/* WhatsApp CTA */}
          <motion.button
            onClick={handleOrder}
            disabled={!isComplete}
            whileHover={isComplete ? { scale: 1.03 } : {}}
            whileTap={isComplete ? { scale: 0.97 } : {}}
            className={`mt-6 flex items-center justify-center gap-3 w-full py-4 rounded-xl font-heading text-xl tracking-widest transition-all ${
              isComplete
                ? "bg-[#25D366] text-white cursor-pointer hover:bg-[#1DA851] shadow-lg"
                : "bg-chocolate/20 text-chocolate/40 cursor-not-allowed"
            }`}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {isComplete ? "SEND VIA WHATSAPP" : `Fill: ${missingFields.join(", ")}`}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
