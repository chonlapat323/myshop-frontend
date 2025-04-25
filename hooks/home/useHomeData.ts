"use client";

import { Slide } from "@/types/home/slide";
import { useEffect, useState } from "react";
import { getSlides } from "@/services/home/slide.service";
import { getCategories } from "@/services/home/category.service";
import { Category } from "@/types/home/category";
import { getBestSellers } from "@/services/home/product.service";
import { Product } from "@/types/home/product";
import { UseHomeDataResult } from "@/types/hook/home/useHomeData";

export function useHomeData(): UseHomeDataResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [slide, setSlides] = useState<Slide | undefined>();
  const [bestSellers, setBestSellers] = useState<Product[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [categoryData, slideData, bestSellersData] = await Promise.all([
          getCategories(),
          getSlides(),
          getBestSellers(),
        ]);

        setCategories(categoryData);
        setSlides(slideData);
        setBestSellers(bestSellersData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { categories, slide, bestSellers, loading, error };
}
