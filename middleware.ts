import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("member_token")?.value;
  const refreshToken = req.cookies.get("member_refresh_token")?.value;

  // ✅ ถ้าไม่มี token แต่มี refresh_token → ให้ React ทำงานต่อ
  if (!token) {
    if (refreshToken) {
      console.warn(
        "⚠️ Access token missing, but refresh token found. Let React handle."
      );
      return NextResponse.next(); // ✅ ไม่ redirect
    }
    console.warn("❌ No token and no refresh token. Redirecting to signin.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    return NextResponse.next(); // ✅ Token valid → ไปต่อ
  } catch (err: any) {
    if (refreshToken) {
      console.warn(
        "⏳ Token expired, refresh token exists → Let client refresh."
      );
      return NextResponse.next(); // ✅ ให้ React ยิง /auth/refresh เอง
    }

    console.warn("❌ Invalid token and no refresh token.");
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/account/:path*", "/orders/:path*"],
};
