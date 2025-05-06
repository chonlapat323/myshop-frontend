"use client";

import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-10 lg:px-16 bg-white">
        <div className="mb-8">
          <div className="text-2xl font-bold cursor-pointer">
            <Link href="/" className="text-logo]">
              MyShop
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
        <p className="text-gray-500 mb-8">
          Join us now and get started with your journey!
        </p>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="fullname"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

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

          <div>
            <label
              htmlFor="confirm-password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
          </div>

          <div className="flex items-center text-sm">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-black font-medium hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Register
          </button>

          {/* <button
            type="button"
            className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <Image
              src="/images/icons/google.svg"
              alt="Google icon"
              width={20}
              height={20}
            />
            <span>Register with Google</span>
          </button> */}
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>

      <div className="hidden lg:flex w-1/2 relative">
        <Image
          src="/images/catalog/living-room/7.jpg"
          alt="Register Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl font-bold mb-2">MyShop</h1>
          {/* <p className="text-white">This text is on top of the overlay</p> */}
        </div>
      </div>
    </div>
  );
}
