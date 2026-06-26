"use client";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ product }: { product: any }) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://better-auth-nextjs-hazel.vercel.app/success",
      },
    });

    if (error) {
      alert(error.message);
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-4xl mx-auto"
    >
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT */}

        <div>
          <h2 className="text-3xl font-bold">Checkout</h2>

          <p className="text-gray-500 mt-2">Complete your purchase securely.</p>

          <div className="mt-10 space-y-6">
            <div>
              <label>Name</label>

              <input
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label>Email</label>

              <input
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="john@email.com"
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div>
          <div className="rounded-xl bg-gray-50 p-6 border">
            <h3 className="font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between">
              <span>{product.name}</span>

              <span>${product.price}</span>
            </div>

            <hr className="my-5" />

            <PaymentElement />

            <button
              disabled={!stripe || loading}
              className="w-full bg-black text-white rounded-lg py-3 mt-8"
            >
              {loading ? "Processing..." : `Pay $${product.price}`}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
