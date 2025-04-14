"use client";
import { API_URL } from "@/lib/config";
import BestSellersPage from "./components/bestsellers/Bestsellers";
import CategoryGrid from "./components/category/CategoryGrid";
import ShowcaseGrid from "./components/ShowcaseGrid/ShowcaseGrid";
import Slider from "./components/slide/Slide";
import SkeletonSlide from "../sekeleton/SkeletonSlide";
import { useHomeData } from "@/hooks/home/useHomeData";
import CategoryGridSkeleton from "./components/category/CategoryGridSkeleton";
export default function Home() {
  const { categories, slide, bestSellers, loading, error } = useHomeData();
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

  const slideItems = (slide?.images ?? []).map((img) => ({
    id: `${slide?.id}-${img.id}`,
    image: `${API_URL}${img.url}`,
    title: slide?.title,
    description: slide?.description,
  }));
  return (
    <>
      {loading ? (
        <>
          <SkeletonSlide />
        </>
      ) : (
        <Slider slides={slideItems} />
      )}
      {loading ? (
        <CategoryGridSkeleton />
      ) : (
        <CategoryGrid categories={categories} limit={4} showText={true} />
      )}
      <BestSellersPage
        products={bestSellers}
        isLoading={loading}
        error={error}
      />
      <ShowcaseGrid collections={collections} />
    </>
  );
}
