import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Client-side auth (localStorage) is used instead of cookies.
  // Middleware cannot check localStorage, so we adhere to client-side guards.
  // const token = req.cookies.get("token");
  // if (!token && req.nextUrl.pathname.startsWith("/dashboard")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}
