"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signInAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    redirect("/");
  } catch (error: any) {
    return {
      error:
        error?.message ||
        error?.body?.message ||
        JSON.stringify(error, null, 2),
    };
  }
};

export const signupAction = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const result = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    console.log("SIGNUP SUCCESS:", result);

    redirect("/");
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    throw error;
  }
};

export const googleSignInAction = async () => {
  const response = await auth.api.signInSocial({
    body: {
      provider: "google",
      callbackURL: "/",
    },
  });

  if (response.url) {
    redirect(response.url);
  }
};

export const SignoutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/auth/signin");
};
