
"use server";

import { stripeClient } from "@/lib/utils";


export async function createCheckoutSession(product: {
  name: string;
  price: number;
}) {
  const session = await stripeClient.checkout.sessions.create({
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],

    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  return {
    url: session.url!, // ✅ FIX HERE
  };
}