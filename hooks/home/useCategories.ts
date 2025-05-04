"use client";

import { Category } from "@/types/hook/home/use-categories";
import { useEffect, useState } from "react";

export function useCategories(defaultOnly = true) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const query = defaultOnly ? "?is_default=true" : "";
        const res = await fetch(`/api/categories${query}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed to fetch categories");

        const data = await res.json();
        setCategories(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, [defaultOnly]);

  return { categories, loading, error };
}
