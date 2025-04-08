"use client";

import { useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { MenuOutlined } from "@ant-design/icons";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("🔍 Layout Auth Check →", { loading, user });
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return <>{children}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
