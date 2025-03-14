import Bestsellers from "./(components)/bestsellers/page";
import CategoryGrid from "./(components)/category/page";
import ShowcaseGrid from "./(components)/ShowcaseGrid/page";
import Slider from "./(components)/slide/page";

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

  const products = [
    {
      id: 1,
      image: "/images/products/chair.jpg",
      name: "Wood small chair",
      price: 120,
      link: "/product/1",
    },
    {
      id: 2,
      image: "/images/products/table.jpg",
      name: "Tomo side table",
      price: 250,
      link: "/product/2",
    },
    {
      id: 3,
      image: "/images/products/armchair.jpg",
      name: "Armchair Dublin",
      price: 680,
      link: "/product/3",
    },
    {
      id: 4,
      image: "/images/products/lamp.jpg",
      name: "Lamp Castle Rock",
      price: 220,
      link: "/product/4",
    },
    {
      id: 5,
      image: "/images/products/chair.jpg",
      name: "Wood small chair",
      price: 120,
      link: "/product/1",
    },
    {
      id: 6,
      image: "/images/products/table.jpg",
      name: "Tomo side table",
      price: 250,
      link: "/product/2",
    },
    {
      id: 7,
      image: "/images/products/armchair.jpg",
      name: "Armchair Dublin",
      price: 680,
      link: "/product/3",
    },
    {
      id: 8,
      image: "/images/products/lamp.jpg",
      name: "Lamp Castle Rock",
      price: 220,
      link: "/product/4",
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
      <Bestsellers products={products} />
      <ShowcaseGrid collections={collections} />
    </>
  );
}
