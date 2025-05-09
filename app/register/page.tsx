"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterMemberFormValues } from "@/types/member/register-member";
import { useRegisterMember } from "@/hooks/member/useRegisterMember";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<RegisterMemberFormValues>();

  const { handleRegister, loading } = useRegisterMember(setError);

  const onSubmit = ({
    first_name,
    email,
    password,
  }: RegisterMemberFormValues) => {
    handleRegister({ first_name, email, password });
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-10 lg:px-16 bg-white">
        <div className="mb-8">
          <div className="text-2xl font-bold cursor-pointer">
            <Link href="/" className="text-logo">
              MyShop
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Create Your Account</h2>
        <p className="text-gray-500 mb-8">
          Join us now and get started with your journey!
        </p>

        <form
          autoComplete="off"
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="first_name"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="first_name"
              {...register("first_name", { required: "Full name is required" })}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.first_name.message}
              </p>
            )}
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
              autoComplete="off"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
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
              autoComplete="new-password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
            />
            {errors.confirm_password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:underline"
          >
            Sign In
          </Link>
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
        </div>
      </div>
    </div>
  );
}
