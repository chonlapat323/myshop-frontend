"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CategoryGrid.module.css";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import { CategoryGridProps } from "@/types/components/category/category-grid";

export default function CategoryGrid({
  categories,
  limit,
  showText,
}: CategoryGridProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const rows: number[][] = [];
  const categoriesToDisplay =
    limit && limit > 0 ? categories.slice(0, limit) : categories;
  const tempCategories = [...categoriesToDisplay];

  while (tempCategories.length > 0) {
    if (tempCategories.length === 1) {
      rows.push([3]);
      tempCategories.splice(0, 1);
    } else if (rows.length % 2 === 0) {
      rows.push([2, 1]);
      tempCategories.splice(0, 2);
    } else {
      rows.push([1, 2]);
      tempCategories.splice(0, 2);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-4 md:px-16">
      <h2
        className={`text-center text-2xl font-bold mb-4 ${
          showText !== true ? "hidden" : ""
        }`}
      >
        SHOP BY ROOM
      </h2>
      <div className="grid grid-cols-3 gap-4 hidden">
        <div className="col-span-3 bg-red-500">Test</div>
        <div className="bg-blue-500 col-span-2">Item 1</div>
        <div className="bg-green-500 col-span-1">Item 2</div>
      </div>
      <div
        className={`grid ${
          isMobile ? "grid-cols-1" : "grid-cols-3"
        } gap-4 auto-rows-[250px]`}
      >
        {categoriesToDisplay.map((category, index) => {
          let colSpan = "col-span-1";

          if (!isMobile) {
            let assignedIndex = 0;
            let rowIndex = 0;

            for (let i = 0; i < rows.length; i++) {
              if (assignedIndex + rows[i].length > index) {
                rowIndex = i;
                break;
              }
              assignedIndex += rows[i].length;
            }

            const positionInRow = index - assignedIndex;
            colSpan = `col-span-${rows[rowIndex][positionInRow]}`;
          }

          return (
            <Link
              key={category.id}
              href={`/catalog/${category.link}`}
              className={`relative group row-span-1 ${colSpan}`}
            >
              {category.image}
              <Image
                src={`${API_URL}${category.image}`}
                alt={category.name}
                fill
                className="w-full h-full object-cover object-bottom  transition-transform group-hover:scale-105"
                style={{ objectFit: "cover" }}
                priority
              />
              <div className={styles["category-content"]}>
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-sm underline mt-1">SHOP NOW</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
