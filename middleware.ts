import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));

    return NextResponse.next(); // ✅ Token valid → ไปต่อได้
  } catch (err) {
    console.warn("❌ Invalid token in middleware:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/account/:path*", "/orders/:path*", "/admin/:path*"],
};
