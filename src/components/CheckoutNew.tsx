"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { createPaymentIntent } from "@/app/actions/stripe-custom";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutNew({ product }: { product: any }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function init() {
      const res = await createPaymentIntent(product);
      setClientSecret(res.clientSecret!);
    }

    init();
  }, [product]);

  if (!clientSecret) {
    return <p>Loading...</p>;
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret }}
    >
      <CheckoutForm product={product} />
    </Elements>
  );
}