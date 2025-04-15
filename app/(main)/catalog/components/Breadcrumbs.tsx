"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  const breadcrumbItems = paths.map((segment, index) => {
    const href = `/${paths.slice(0, index + 1).join("/")}`;
    const label = segment.replace("-", " ");

    return { label, href };
  });

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
