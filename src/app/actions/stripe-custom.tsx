"use server";

import { stripeClient } from "@/lib/utils";

export async function createPaymentIntent(product: any) {
  const paymentIntent = await stripeClient.paymentIntents.create({
    amount: Math.round(product.price * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}