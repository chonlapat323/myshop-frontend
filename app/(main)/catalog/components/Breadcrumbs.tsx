"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbsProps {
  productName?: string;
  categorySlug?: string;
}

export default function Breadcrumbs({
  productName,
  categorySlug,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    const items = [];

    // ✅ เพิ่ม Catalog (คงที่)
    items.push({
      label: "Catalog",
      href: "/catalog",
    });

    // ✅ เพิ่ม Category (ถ้ามี)
    if (categorySlug) {
      items.push({
        label: categorySlug.replace(/-/g, " "),
        href: `/catalog/${categorySlug}`,
      });
    }

    // ✅ เพิ่ม Product Name (ถ้ามี)
    if (productName) {
      items.push({
        label: productName,
        href: "", // ไม่ต้องคลิก
      });
    }

    return items;
  }, [categorySlug, productName]);

  return (
    <nav className="mb-4">
      <ul className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-black">
            Home
          </Link>
          {breadcrumbItems.length > 0 && (
            <span className="text-gray-400"> /</span>
          )}
        </li>

        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index}>
              {isLast ? (
                <span className="capitalize text-gray-500">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="capitalize text-gray-500 hover:text-black"
                >
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="text-gray-400"> /</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
