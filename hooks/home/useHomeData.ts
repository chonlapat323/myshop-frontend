"use client";

import { Slide } from "@/types/home/slide";
import { useEffect, useState } from "react";
import { getSlides } from "@/services/home/slide.service";
import { getCategories } from "@/services/home/category.service";
import { Category } from "@/types/home/category";

interface UseHomeDataResult {
  categories: Category[];
  slide: Slide | undefined;
  loading: boolean;
  error: string | null;
}

export function useHomeData(): UseHomeDataResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [slide, setSlides] = useState<Slide | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [categoryData, slideData] = await Promise.all([
          getCategories(),
          getSlides(),
        ]);

        setCategories(categoryData);
        setSlides(slideData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return { categories, slide, loading, error };
}
