import ProductCardSkeleton from "./ProductCardSkeleton";
export default function BestsellersSkeletonSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-center text-2xl font-bold mb-6">BESTSELLERS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
