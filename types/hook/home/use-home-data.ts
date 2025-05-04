import { Category } from "@/types/home/category";
import { Product } from "@/types/home/product";
import { Slide } from "@/types/home/slide";

export interface UseHomeDataResult {
  categories: Category[];
  slide: Slide | undefined;
  bestSellers: Product[] | undefined;
  loading: boolean;
  error: string | null;
}
