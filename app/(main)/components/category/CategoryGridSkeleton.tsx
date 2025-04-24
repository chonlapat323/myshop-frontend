"use client";

import { useEffect, useState } from "react";

export default function CategoryGridSkeleton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const skeletonItems = Array.from({ length: 6 });

  return (
    <section className="max-w-6xl mx-auto px-4 py-4 md:px-16">
      <h2 className="text-center text-2xl font-bold mb-4">SHOP BY ROOM</h2>
      <div
        className={`grid ${
          isMobile ? "grid-cols-1" : "grid-cols-3"
        } gap-4 auto-rows-[250px]`}
      >
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className="relative bg-gray-200 animate-pulse rounded col-span-1"
          >
            <div className="absolute inset-0 bg-gray-300" />
            <div className="absolute bottom-4 left-4">
              <div className="h-5 w-24 bg-gray-400 rounded mb-1" />
              <div className="h-3 w-16 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
