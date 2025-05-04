import { Product } from "../home/product";

export type ProductDetailPageProps = {
  params: { productId: string };
};

export type ProductDetailProps = {
  product: Product;
};
