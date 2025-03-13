"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { MenuOutlined } from "@ant-design/icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (pathname === "/account") {
      router.replace("/account/orders");
    }
  }, [pathname, router]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-12">
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
          {children}
        </div>
      </div>
    </section>
  );
}
