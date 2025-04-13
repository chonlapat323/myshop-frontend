"use client";
import { API_URL } from "@/lib/config";
import Bestsellers from "./components/bestsellers/Bestsellers";
import CategoryGrid from "./components/category/CategoryGrid";
import ShowcaseGrid from "./components/ShowcaseGrid/ShowcaseGrid";
import Slider from "./components/slide/Slide";
import SkeletonSlide from "../sekeleton/SkeletonSlide";
import { useHomeData } from "@/hooks/home/useHomeData";
export default function Home() {
  const { categories, slide, loading, error } = useHomeData();
  // const { slides, loading, error } = useSlides();
  // const {
  //   categories,
  //   loading: categoryLoading,
  //   error: categoryError,
  // } = useCategories(true);
  // const categories = [
  //   {
  //     id: 1,
  //     title: "LIVING ROOM",
  //     image: "/images/category/lvr1.jpg",
  //     link: "/catalog/living-room",
  //   },
  //   {
  //     id: 2,
  //     title: "BEDROOM",
  //     image: "/images/category/br2.jpg",
  //     link: "/catalog/bedroom",
  //   },
  //   {
  //     id: 3,
  //     title: "BATHROOM",
  //     image: "/images/category/bthr1.jpg",
  //     link: "/catalog/bathroom",
  //   },
  //   {
  //     id: 4,
  //     title: "KITCHEN",
  //     image: "/images/category/kc1.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 5,
  //     title: "KITCHEN",
  //     image: "/images/category/lvr1.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 6,
  //     title: "KITCHEN",
  //     image: "/images/category/bthr1.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 7,
  //     title: "KITCHEN",
  //     image: "/images/category/br2.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 8,
  //     title: "KITCHEN",
  //     image: "/images/category/bthr1.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 9,
  //     title: "KITCHEN",
  //     image: "/images/category/lvr1.jpg",
  //     link: "/catalog/kitchen",
  //   },
  //   {
  //     id: 10,
  //     title: "KITCHEN",
  //     image: "/images/category/br2.jpg",
  //     link: "/catalog/kitchen",
  //   },
  // ];
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
      <CategoryGrid categories={categories} limit={4} showText={true} />
      <Bestsellers />
      <ShowcaseGrid collections={collections} />
    </>
  );
}
