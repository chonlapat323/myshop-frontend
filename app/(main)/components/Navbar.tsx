"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingCart, Lock, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/context/CartContext";

interface MenuItem {
  key: string;
  label: string;
  href: string;
}

interface NavbarProps {
  menuItems: MenuItem[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, isReady } = useAuth();
  const { count } = useCart();
  const isPathActive = (href: string, currentPath: string) => {
    if (href === "/") return currentPath === "/";
    return currentPath === href || currentPath.startsWith(href + "/");
  };
  const linkClass = (href: string) => {
    const isActive = isPathActive(href, pathname);

    return `px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:text-black hover:bg-gray-100"
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          🪑 MyShop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={linkClass(item.href)}
            >
              {item.label}
            </Link>
          ))}

          {/* Icons */}
          {isReady && !isAuthenticated && (
            <Link href="/login" className="ml-4">
              <Lock className="w-5 h-5" />
            </Link>
          )}

          {isReady && isAuthenticated && (
            <>
              <Link href="/account">
                <User
                  className={`w-6 h-6 transition ${
                    pathname === "/account" || pathname.startsWith("/account/")
                      ? "text-black"
                      : "text-gray-400 hover:text-black"
                  }`}
                />
              </Link>
              <Link href="/cart">
                <div className="relative" id="cart-icon">
                  <ShoppingCart
                    className={`w-6 h-6 transition ${
                      pathname === "/cart"
                        ? "text-black"
                        : "text-gray-400 hover:text-black"
                    }`}
                  />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {count}
                    </span>
                  )}
                </div>
              </Link>
            </>
          )}

          {!isReady && (
            <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse ml-2" />
          )}
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={linkClass(item.href)}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="flex items-center gap-6 mt-4">
            {!isAuthenticated && (
              <Link href="/login">
                <Lock className="w-5 h-5" />
              </Link>
            )}
            {isAuthenticated && (
              <>
                <Link href="/account">
                  <User
                    className={`w-6 h-6 transition ${
                      pathname === "/account" ||
                      pathname.startsWith("/account/")
                        ? "text-black"
                        : "text-gray-400 hover:text-black"
                    }`}
                  />
                </Link>
                <Link href="/cart">
                  <div className="relative">
                    <ShoppingCart
                      className={`w-6 h-6 transition ${
                        pathname === "/cart"
                          ? "text-black"
                          : "text-gray-400 hover:text-black"
                      }`}
                    />
                    {count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
