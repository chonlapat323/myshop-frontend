"use client";

import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import Link from "next/link";
import PersonalInfo from "../PersonalInfo/page";
import Orders from "../Orders/page";
import ManageAddress from "../ManageAddress/page";
import PaymentMethod from "../PaymentMethod/page";
import PasswordManage from "../PasswordManage/page";
import Logout from "../Logout/page";

const menuItems = [
  { key: "personal-info", label: "Personal Information" },
  { key: "orders", label: "My Order" },
  { key: "address", label: "Manage Address" },
  { key: "payment", label: "Payment Method" },
  { key: "password", label: "Password Manage" },
  { key: "logout", label: "Logout" },
];

export default function MyAccount() {
  const [selectedMenu, setSelectedMenu] = useState<string>("personal-info");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const renderContent = () => {
    switch (selectedMenu) {
      case "personal-info":
        return <PersonalInfo />;
      case "orders":
        return <Orders />;
      case "address":
        return <ManageAddress />;
      case "payment":
        return <PaymentMethod />;
      case "password":
        return <PasswordManage />;
      case "logout":
        return <Logout />;
      default:
        return <PersonalInfo />;
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 mt-12">
      {/* ✅ Breadcrumbs */}
      <Breadcrumb
        className="mb-4 text-gray-500"
        items={[
          { title: <Link href="/">Home</Link> },
          { title: "My Account" },
          { title: menuItems.find((item) => item.key === selectedMenu)?.label },
        ]}
      />

      {/* ✅ Mobile Menu Bar */}
      <div className="md:hidden flex items-center justify-between bg-gray-100 p-4">
        <span className="font-semibold text-lg">Menu</span>
        <MenuOutlined
          className="text-xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {/* ✅ Layout Container */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* ✅ Sidebar */}
        <div
          className={`w-full md:w-1/4 bg-gray-100 ${
            isMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSelectedMenu(item.key);
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left p-3 rounded ${
                  selectedMenu === item.key ? "bg-gray-200 font-bold" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Content Area + Breadcrumbs ด้านบน */}
        <div className="w-full md:w-3/4 bg-white p-6 min-h-screen">
          {renderContent()}
        </div>
      </div>
    </section>
  );
}
