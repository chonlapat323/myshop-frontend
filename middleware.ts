import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/navbar") ||
    req.nextUrl.pathname.startsWith("/footer")
  ) {
    return NextResponse.redirect(new URL("/404", req.url)); // ✅ Redirect ไปหน้าแรก
  }
}
