"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface MenuItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SidebarProps {
  isMenuOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
}

export default function Sidebar({
  isMenuOpen,
  onClose,
  menuItems,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={`w-full bg-gray-100 p-4 rounded-lg transition-transform ${
        isMenuOpen ? "block" : "hidden md:block"
      }`}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.href;

        if (item.onClick) {
          // ✅ กรณี Logout หรือ custom function
          return (
            <button
              key={item.key}
              onClick={() => {
                item.onClick?.();
                onClose(); // ✅ ปิดเมนูหลังคลิก
              }}
              className={`cursor-pointer w-full hover:bg-gray-200 text-left px-4 py-3 rounded-md transition-all ${
                isActive ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          );
        }

        return (
          <Link key={item.key} href={item.href || "#"} onClick={onClose}>
            <button
              className={`cursor-pointer w-full hover:bg-gray-200 text-left px-4 py-3 rounded-md transition-all ${
                isActive ? "bg-gray-200 font-bold" : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          </Link>
        );
      })}
    </div>
  );
}
