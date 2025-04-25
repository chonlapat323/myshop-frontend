import { Category } from "@/types/home/category";

export interface CategoryGridProps {
  categories: Category[];
  limit: number;
  showText: boolean;
}
