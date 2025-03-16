import Bestsellers from "./components/bestsellers/Bestsellers";
import CategoryGrid from "./components/category/CategoryGrid";
import ShowcaseGrid from "./components/ShowcaseGrid/ShowcaseGrid";
import Slider from "./components/Slide/Slide";

export default function Home() {
  const slidesData = [
    {
      id: 1,
      image: "/images/slide/1.jpg",
      title: "Welcome to Our Shop",
      description: "Discover the latest trends with us.",
    },
    {
      id: 2,
      image: "/images/slide/2.jpg",
      title: "Exclusive Collection",
      description: "Find unique and stylish items just for you.",
    },
    {
      id: 3,
      image: "/images/slide/3.jpg",
      title: "Best Deals",
      description: "Enjoy the best offers and discounts.",
    },
  ];
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
  return (
    <>
      <Slider slides={slidesData} />
      <CategoryGrid limit={4} showText={true} />
      <Bestsellers />
      <ShowcaseGrid collections={collections} />
    </>
  );
}
