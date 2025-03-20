"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    key: "personal-info",
    label: "Personal Information",
    href: "/account/personal-info",
  },
  { key: "orders", label: "My Order", href: "/account/orders" },
  { key: "address", label: "Manage Address", href: "/account/address" },
  { key: "payment", label: "Payment Method", href: "/account/payment" },
  { key: "password", label: "Password Manage", href: "/account/password" },
  { key: "logout", label: "Logout", href: "/account/logout" },
];

export default function Sidebar({ isMenuOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`w-full bg-gray-100 p-4 rounded-lg transition-transform ${
        isMenuOpen ? "block" : "hidden md:block"
      }`}
    >
      {menuItems.map((item) => (
        <Link key={item.key} href={item.href} onClick={onClose}>
          <button
            className={`cursor-pointer w-full text-left px-4 py-3 rounded-md transition-all ${
              pathname === item.href
                ? "bg-gray-200 font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
