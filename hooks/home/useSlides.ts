// hooks/useSlides.ts
import { useEffect, useState } from "react";
import { getSlides } from "@/services/home/slide.service";
import { Slide } from "@/types/home/slide";
export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // เผื่อจัดการ error แบบมี message

  useEffect(() => {
    getSlides()
      .then((res) => setSlides(res)) // สมมุติว่า getSlides() return { data: Slide[] }
      .catch((err) => {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการโหลดสไลด์");
      })
      .finally(() => setLoading(false));
  }, []);

  return { slides, loading, error };
}
