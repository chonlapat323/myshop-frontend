"use client";
import { redirect } from "next/navigation";
import PersonalInfo from "./personal-info/page"; // ✅ PersonalInfo เป็น default

export default function AccountPage() {
  redirect("/account/personal-info");
}
