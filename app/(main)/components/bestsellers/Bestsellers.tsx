import BestSellersSection from "./BestsellersSection";
import BestsellerSkeleton from "./BestsellerSkeleton";
import { BestSellersPageProps } from "@/types/components/bestsellers/BestSellersPage";

export default function BestSellersPage({
  products,
  isLoading,
}: BestSellersPageProps) {
  if (isLoading) return <BestsellerSkeleton />;

  return <BestSellersSection products={products} />;
}
