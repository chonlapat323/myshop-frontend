import { Product } from "../home/product";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: number) => void;
}
