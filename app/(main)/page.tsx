"use client";
import { API_URL } from "@/lib/config";
import Bestsellers from "./components/bestsellers/Bestsellers";
import CategoryGrid from "./components/category/CategoryGrid";
import ShowcaseGrid from "./components/ShowcaseGrid/ShowcaseGrid";
import Slider from "./components/slide/Slide";
import { useSlides } from "@/hooks/home/useSlides";
import SkeletonSlide from "../sekeleton/SkeletonSlide";
export default function Home() {
  const { slides, loading, error } = useSlides();
  const collections = [
    {
      title: "New collection",
      subtitle: "HALF & HALF CHAIRS",
      image: "/images/showcase/1.jpg",
      link: "#",
    },
    {
      title: "Trends",
      subtitle: "WARM ESSENTIALS",
      image: "/images/showcase/2.jpg",
      link: "#",
    },
  ];

  const slideItems = (slides ?? []).flatMap((slide) =>
    slide.images.map((img) => ({
      id: `${slide.id}-${img.id}`,
      image: `${API_URL}${img.url}`,
      title: slide.title,
      description: slide.description,
    }))
  );
  return (
    <>
      {loading ? (
        <>
          <SkeletonSlide />
        </>
      ) : (
        <Slider slides={slideItems} />
      )}
      <CategoryGrid limit={4} showText={true} />
      <Bestsellers />
      <ShowcaseGrid collections={collections} />
    </>
  );
}
