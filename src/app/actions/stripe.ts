"use server";

import { stripeClient } from "@/lib/utils";

export async function createCheckoutSession(product: any) {
  const session = await stripeClient.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded_page",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: Math.round(product.price * 100),
        },
        quantity: 1,
      },
    ],

    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
  });

  return {
    clientSecret: session.client_secret,
  };
}
