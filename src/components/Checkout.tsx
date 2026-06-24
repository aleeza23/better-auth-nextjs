"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function StripeEmbeddedCheckout({ product }: { product: any }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function init() {
      const { createCheckoutSession } = await import("@/app/actions/stripe");

      const res = await createCheckoutSession(product);
      setClientSecret(res.clientSecret as any);
    }

    init();
  }, [product]);

  if (!clientSecret) {
    return <div>Loading checkout...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
        }}    
      >
        <EmbeddedCheckout  className="w-full"/>
      </EmbeddedCheckoutProvider>
    </div>
  );
}
