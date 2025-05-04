import { ShowcaseGridProps } from "@/types/components/showcase/showcase-grid";
import ShowcaseCard from "../ShowcaseCard/ShowcaseCard";

export default function ShowcaseGrid({ collections }: ShowcaseGridProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {collections.map((item, index) => (
          <ShowcaseCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
}
