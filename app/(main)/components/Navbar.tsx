"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Layout, Menu, Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Cart, LockIcon, UserIcon } from "@/app/icons";
import { useAuth } from "@/hooks/useAuth";
const { Header } = Layout;

interface NavbarProps {
  menuItems: { key: string; label: string; href: string }[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const { isAuthenticated, isReady } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      className={`${
        isFixed
          ? "fixed shadow-lg !bg-white"
          : "relative bg-transparent !bg-white"
      } px-8 flex items-center justify-between top-0 left-0 w-full z-50 transition-all duration-300 border-b border-gray-200`}
    >
      {/* Logo */}
      <div className="text-2xl font-bold cursor-pointer">
        <Link href="/">Chair.</Link>
      </div>

      {/* Desktop Menu */}
      <Menu
        mode="horizontal"
        className="hidden! md:flex! border-none! flex-1 justify-end bg-transparent"
        items={menuItems.map((item) => ({
          key: item.key,
          label: <Link href={item.href}>{item.label}</Link>,
        }))}
      />

      {/* Icons and Hamburger Menu */}
      <div className="flex items-center gap-6">
        {isReady && !isAuthenticated && (
          <Link href="/login" className="hidden md:block cursor-pointer">
            <LockIcon className="text-xl" />
          </Link>
        )}

        {isReady && isAuthenticated && (
          <Link href="/account" className="hidden md:block cursor-pointer">
            <UserIcon className="text-xl" />
          </Link>
        )}

        {isReady && isAuthenticated && (
          <Link href="/cart" className="hidden md:block cursor-pointer">
            <Cart className="text-xl" />
          </Link>
        )}
        {!isReady && (
          <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse" />
        )}
        <MenuOutlined
          className="md:hidden! text-2xl cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Drawer */}
      <Drawer
        title={
          <div className="flex justify-between items-center w-full">
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
          items={menuItems.map((item) => ({
            key: item.key,
            label: <Link href={item.href}>{item.label}</Link>,
          }))}
          onClick={() => setIsOpen(false)}
        />
        <div className="flex items-center gap-6 mt-6">
          {!isAuthenticated && (
            <Link href="/login" className="md:block cursor-pointer">
              <LockIcon className="text-xl" />
            </Link>
          )}
          {isAuthenticated && (
            <Link href="/account">
              <UserIcon className="text-xl cursor-pointer " />
            </Link>
          )}
          {isAuthenticated && (
            <Link href="/cart">
              <Cart className="text-xl cursor-pointer text-black " />
            </Link>
          )}
        </div>
      </Drawer>
    </Header>
  );
}
