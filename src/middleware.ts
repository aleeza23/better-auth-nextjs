import type { Session } from "better-auth/types";
import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/auth/signin", "/auth/signup"];

export default async function middleware(request: NextRequest) {
  const response = await fetch(
    `${request.nextUrl.origin}/api/auth/get-session`,
    {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  );

  const session = response.ok ? await response.json() : null;

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
