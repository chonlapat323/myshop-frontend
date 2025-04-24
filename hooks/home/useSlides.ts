import { useEffect, useState } from "react";
import { getSlides } from "@/services/home/slide.service";
import { Slide } from "@/types/home/slide";
export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSlides()
      .then((res) => setSlides(res))
      .catch((err) => {
        console.error(err);
        setError("เกิดข้อผิดพลาดในการโหลดสไลด์");
      })
      .finally(() => setLoading(false));
  }, []);

  return { slides, loading, error };
}
