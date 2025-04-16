"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface BreadcrumbsProps {
  productName?: string;
}

export default function Breadcrumbs({ productName }: BreadcrumbsProps) {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbItems = useMemo(() => {
    return paths.map((segment, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      let label = segment.replace("-", " ");

      const isLast = index === paths.length - 1;
      const isProductPage =
        paths.length >= 2 && paths[paths.length - 2] === "product";

      if (isLast && isProductPage && productName) {
        label = productName;
      }

      return { label, href };
    });
  }, [paths, productName]);

  return (
    <nav className="mb-4">
      <ul className="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-black">
            Home
          </Link>
          <span className="text-gray-400"> /</span>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className="capitalize text-gray-500 hover:text-black"
            >
              {item.label}
            </Link>
            {index < breadcrumbItems.length - 1 && (
              <span className="text-gray-400"> /</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
