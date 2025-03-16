"use client"; // ✅ Client Component สำหรับใช้ useState, useEffect (ถ้าจำเป็นในอนาคต)

import React from "react";
import CategoryGrid from "../components/category/CategoryGrid";

const CatalogPage = () => {
  return (
    <section className="container mx-auto py-10 pt-4">
      {/* Catalog Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Our Product Catalog
      </h1>
      {/* Category Grid Component */}
      <CategoryGrid showText={false} limit={0} />{" "}
      {/* ✅ Render CategoryGrid Component (แสดง Categories ทั้งหมด - ไม่มีการ limit) */}
      {/* (Optional) คำอธิบาย Catalog หรือ Content อื่นๆ เพิ่มเติมได้ที่นี่ */}
    </section>
  );
};

export default CatalogPage;
