"use client";

import { useMemo } from "react";
import { BreadcrumbsProps } from "@/types/components/breadcrumb";
import Link from "next/link";

export default function Breadcrumbs({
  productName,
  categorySlug,
}: BreadcrumbsProps) {
  const breadcrumbItems = useMemo(() => {
    const items = [];

    items.push({
      label: "Catalog",
      href: "/catalog",
    });

    if (categorySlug) {
      items.push({
        label: categorySlug.replace(/-/g, " "),
        href: `/catalog/${categorySlug}`,
      });
    }

    if (productName) {
      items.push({
        label: productName,
        href: "",
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
