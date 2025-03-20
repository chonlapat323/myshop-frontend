// app/login/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* ซ้าย: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-10 lg:px-16 bg-white">
        <div className="mb-8">
          <div className="text-2xl font-bold cursor-pointer">
            <Link href="/" className="text-logo">
              Chair.
            </Link>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Welcome back!</h2>
        <p className="text-gray-500 mb-8">
          The faster you fill up, the faster you get a ticket
        </p>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-gray-500 hover:text-gray-700">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
          <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Image
              src="/images/icons/google.svg"
              alt="Google icon"
              width={20}
              height={20}
            />
            <span>Sign in with Google</span>
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-black font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
      {/* ขวา: ภาพ + ข้อความ (เฉพาะในหน้าจอใหญ่) */}
      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/images/catalog/living-room/4.jpg"
          alt="Sample"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white p-8">
          <h3 className="text-3xl font-bold mb-2">Karina 카리나</h3>
          <p className="max-w-sm text-center text-sm sm:text-base">
            (ข้อความเกี่ยวกับศิลปิน หรือคำโปรยอื่น ๆ ที่คุณต้องการ)
          </p>
        </div>
      </div>
    </div>
  );
}
