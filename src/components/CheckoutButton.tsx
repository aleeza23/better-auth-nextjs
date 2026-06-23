
"use client";

import { createCheckoutSession } from "@/app/actions/stripe";

export default function CheckoutButton({ product }: any) {
  const handleCheckout = async () => {
    const res = await createCheckoutSession(product);

    // Stripe Embedded Checkout redirect
    window.location.href = res.url;
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-black text-white px-4 py-2 mt-4 rounded"
    >
      Buy Now
    </button>
  );
}