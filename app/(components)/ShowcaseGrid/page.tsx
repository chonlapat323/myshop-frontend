import ShowcaseCard from "../ShowcaseCard/page";

const collections = [
  {
    title: "New collection",
    subtitle: "HALF & HALF CHAIRS",
    image: "/collection1.jpg",
    link: "#",
  },
  {
    title: "Trends",
    subtitle: "WARM ESSENTIALS",
    image: "/collection2.jpg",
    link: "#",
  },
];

export default function ShowcaseGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {collections.map((item, index) => (
        <ShowcaseCard key={index} {...item} />
      ))}
    </div>
  );
}
