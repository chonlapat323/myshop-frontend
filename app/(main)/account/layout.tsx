"use client";

import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { MenuOutlined } from "@ant-design/icons";
import { logoutUser } from "@/services/member/member.service";
import { MenuItem } from "@/types/ui/Sidebar";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("🔍 Layout Auth Check →", { loading, user });
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return <>{children}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems: MenuItem[] = [
    {
      key: "personal-info",
      label: "Personal Information",
      href: "/account/personal-info",
    },
    { key: "orders", label: "My Order", href: "/account/orders" },
    { key: "address", label: "Manage Address", href: "/account/address" },
    { key: "payment", label: "Payment Method", href: "/account/payment" },
    // { key: "password", label: "Password Manage", href: "/account/password" },
    {
      key: "logout",
      label: "Logout",
      onClick: () => logoutUser(),
    },
  ];
  return (
    <AuthProvider>
      <section className="max-w-6xl mx-auto px-4 py-4">
        <Breadcrumbs />
        <div className="md:hidden flex items-center justify-between bg-gray-100 p-4">
          <span className="font-semibold text-lg">Menu</span>
          <MenuOutlined
            className="text-xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div
            className={`w-full md:w-1/4 bg-gray-100 ${
              isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <Sidebar
              menuItems={menuItems}
              onClose={() => setIsMenuOpen(false)}
              isMenuOpen={isMenuOpen}
            />
          </div>
          <div className="w-full md:w-3/4 bg-white p-0 min-h-screen">
            <ProtectedLayout>{children}</ProtectedLayout>
          </div>
        </div>
      </section>
    </AuthProvider>
  );
}
