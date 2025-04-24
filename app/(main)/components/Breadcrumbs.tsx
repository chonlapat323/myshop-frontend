"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav className="mb-4 text-gray-500 text-sm">
      <ul className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join("/")}`;
          return (
            <li key={url} className="flex items-center space-x-2">
              <span>/</span>
              <Link href={url} className="hover:underline capitalize">
                {path.replace("-", " ")}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
