"use client";

import React from "react";
import CategoryGrid from "../components/category/CategoryGrid";
import { useHomeData } from "@/hooks/home/useHomeData";

const CatalogPage = () => {
  const { categories } = useHomeData();
  return (
    <section className="container mx-auto py-10 pt-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Our Product Catalog
      </h1>
      <CategoryGrid categories={categories} showText={false} limit={0} />
    </section>
  );
};

export default CatalogPage;
