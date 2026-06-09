import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { SignoutAction } from "./actions/auth";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-semibold">Welcome</h1>

        <div className="flex gap-4">
          <Link
            href="/auth/signin"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Sign In
          </Link>

          <Link href="/auth/signup" className="px-4 py-2 border rounded-md">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">Home Page</h1>
      <p className="mt-2 text-gray-600">
        Welcome back 👋 {session.user?.email}
      </p>

      <form action={SignoutAction} className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80 cursor-pointer"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default Page;
