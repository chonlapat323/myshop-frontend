"use client";

import { API_URL } from "@/lib/config";
import { CategoryGridProps } from "@/types/components/category/category-grid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./CategoryGrid.module.css";

export default function CategoryGrid({
  categories,
  limit,
  showText,
}: CategoryGridProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleImageLoad = (categoryId: number) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [categoryId.toString()]: false
    }));
  };

  const handleImageLoadStart = (categoryId: number) => {
    setImageLoadingStates(prev => ({
      ...prev,
      [categoryId.toString()]: true
    }));
  };

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
          let objectPosition = "object-bottom"; // default

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
            
            // ถ้า row มี 3 columns ให้รูปชิดล่าง
            if (rows[rowIndex].length === 1 && rows[rowIndex][0] === 3) {
              objectPosition = "object-bottom";
            } else {
              objectPosition = "object-center";
            }
          }

          const isImageLoading = imageLoadingStates[category.id.toString()] !== false;

          return (
            <Link
              key={category.id}
              href={`/catalog/${category.link}`}
              className={`relative group row-span-1 ${colSpan}`}
            >
              {/* Loading Skeleton */}
              {isImageLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                </div>
              )}
              
              <Image
                src={category.image ? `${API_URL}${category.image}` : "/images/no-image.jpg"}
                alt={category.name}
                fill
                className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${
                  isImageLoading ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ objectFit: "cover", objectPosition: objectPosition }}
                priority
                onLoadStart={() => handleImageLoadStart(category.id)}
                onLoad={() => handleImageLoad(category.id)}
                onError={(e) => {
                  // fallback ถ้ารูปโหลดไม่ได้
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/no-image.jpg";
                  handleImageLoad(category.id);
                }}
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
