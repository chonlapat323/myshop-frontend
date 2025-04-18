// app/(components)/bestsellers/page.tsx
import BestSellersSection from "./BestsellersSection";
import { Product } from "@/types/home/product";
import BestsellerSkeleton from "./BestsellerSkeleton";
interface Props {
  products: Product[] | undefined;
  isLoading: boolean;
  error: any;
}

export default function BestSellersPage({ products, isLoading, error }: Props) {
  if (isLoading) return <BestsellerSkeleton />;
  //if (error) return <p>Failed to load best sellers.</p>;

  return <BestSellersSection products={products} />;
}
