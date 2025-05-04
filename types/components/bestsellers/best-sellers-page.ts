import { Product } from "@/types/home/product";

export interface BestSellersPageProps {
  products: Product[] | undefined;
  isLoading: boolean;
  error: any;
}
