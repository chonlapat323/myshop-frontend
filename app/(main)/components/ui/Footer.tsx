"use client";

import Link from "next/link";
import IconLink from "../IconLink";
import { FooterProps } from "@/types/ui/footer";

export default function Footer({ menuItems, info }: FooterProps) {
  const midIndex = Math.ceil(menuItems.length / 2);
  const menuColumn1 = menuItems.slice(0, midIndex);
  const menuColumn2 = menuItems.slice(midIndex);

  return (
    <footer className="bottom-0 left-0 w-full bg-[#262626] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-2xl font-bold">MyShop</h2>
          <p className="text-sm mt-2 opacity-80">{info.address}</p>
          <p className="text-sm mt-1 opacity-80">{info.email}</p>
          <p className="text-sm mt-1 opacity-80">{info.phone}</p>
          <div className="flex space-x-4 mt-4">
            {info.socialLinks.map((social, index) => (
              <IconLink
                key={index}
                href={social.href}
                icon={social.icon}
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="flex flex-col space-y-2">
            {menuColumn1.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-sm hover:underline opacity-90"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {menuColumn2.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block text-sm hover:underline opacity-90"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
