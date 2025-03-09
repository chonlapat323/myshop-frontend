"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  MenuOutlined,
  UserOutlined,
  ShoppingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";

const { Header } = Layout;

interface NavbarProps {
  menuItems: { key: string; label: string; href: string }[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // ปิด Drawer อัตโนมัติเมื่อหน้าจอเปลี่ยนเป็น Desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // สร้างเมนูที่ใช้ Link ของ Next.js
  const menuItemsWithLinks: MenuProps["items"] = menuItems.map((item) => ({
    key: item.key,
    label: <Link href={item.href}>{item.label}</Link>, // ใช้ Link ของ Next.js
  }));

  return (
    <Header className="!bg-white shadow-md px-8 flex items-center justify-between fixed top-0 left-0 w-full z-50">
      {/* โลโก้ */}
      <div className="text-2xl font-bold">
        <Link href="/">Chair.</Link>
      </div>

      {/* เมนูปกติ (ซ่อนในมือถือ) */}
      <Menu
        mode="horizontal"
        className="hidden! md:flex! border-none! flex-1! justify-center! bg-transparent!"
        items={menuItemsWithLinks}
        onClick={() => setIsOpen(false)} // ปิดเมนูเมื่อคลิก
      />

      {/* ไอคอนขวาสุด & Hamburger Menu */}
      <div className="flex items-center gap-6">
        <Link href="/profile" className="text-black! hover:text-gray-500!">
          <UserOutlined className="text-xl hidden! md:block! cursor-pointer" />
        </Link>
        <Link href="/cart" className="text-black! hover:text-gray-500!">
          <ShoppingOutlined className="text-xl hidden! md:block! cursor-pointer" />
        </Link>

        {/* Hamburger Menu Button (เฉพาะในมือถือ) */}
        <MenuOutlined
          className="md:hidden! text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Drawer (Slide from Right) */}
      <Drawer
        title={
          <div className="flex justify-between items-center w-full ">
            <span>Menu</span>
            <Button
              type="text"
              icon={<CloseOutlined className="text-xl" />}
              onClick={() => setIsOpen(false)}
            />
          </div>
        }
        placement="right"
        closable={false}
        onClose={() => setIsOpen(false)}
        open={isOpen}
      >
        <Menu
          mode="vertical"
          className="!bg-white !w-full! !border-r-0"
          items={menuItemsWithLinks}
          onClick={() => setIsOpen(false)}
        />
        <div className="flex items-center gap-6 mt-6">
          <Link href="/profile" className="text-black! hover:text-gray-500!">
            <UserOutlined className="text-xl cursor-pointer text-black! hover:text-gray-500!" />
          </Link>
          <Link href="/cart" className="text-black! hover:text-gray-500!">
            <ShoppingOutlined className="text-xl cursor-pointer text-black! hover:text-gray-500!" />
          </Link>
        </div>
      </Drawer>
    </Header>
  );
}
