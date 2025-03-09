"use client"; // ✅ ทำให้เป็น Client Component

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./CategoryGrid.module.css";

const categories = [
  {
    id: 1,
    title: "LIVING ROOM",
    image: "/images/category/lvr1.jpg",
    link: "/living-room",
  },
  {
    id: 2,
    title: "BEDROOM",
    image: "/images/category/br2.jpg",
    link: "/bedroom",
  },
  {
    id: 3,
    title: "BATHROOM",
    image: "/images/category/bthr1.jpg",
    link: "/bathroom",
  },
  {
    id: 4,
    title: "KITCHEN",
    image: "/images/category/kc1.jpg",
    link: "/kitchen",
  },
];

export default function CategoryGrid() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // ✅ คำนวณจำนวน `row` และ `col-span`
  const rows: number[][] = [];
  const tempCategories = [...categories];

  while (tempCategories.length > 0) {
    if (tempCategories.length === 1) {
      rows.push([3]); // ✅ ถ้าเหลือ 1 category → `col-span-3`
      tempCategories.splice(0, 1);
    } else if (rows.length % 2 === 0) {
      rows.push([2, 1]); // ✅ แถวที่ 1, 3, 5 → `2-1`
      tempCategories.splice(0, 2);
    } else {
      rows.push([1, 2]); // ✅ แถวที่ 2, 4, 6 → `1-2`
      tempCategories.splice(0, 2);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 md:px-16">
      <h2 className="text-center text-2xl font-bold mb-6">SHOP BY ROOM</h2>
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
        {categories.map((category, index) => {
          let colSpan = "col-span-1"; // ✅ ค่าเริ่มต้น (Mobile)

          if (!isMobile) {
            // ✅ Desktop ใช้ Logic `col-span`
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
              href={category.link}
              className={`relative group row-span-1 ${colSpan}`}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover  transition-transform group-hover:scale-105"
              />
              <div className={styles["category-content"]}>
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm underline mt-1">SHOP NOW</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
