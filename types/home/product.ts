export interface ProductImage {
  id: number;
  url: string;
  is_main: boolean;
  productId: number;
  order_image: number;
}
export type Category = {
  id: number;
  name: string;
  description: string;
  link: string;
  image: string;
  is_active: boolean;
  created_at: string;
  deleted_at: string | null;
};

export interface Product {
  id: number;
  category: Category;
  name: string;
  description: string;
  design: string;
  additionalInformation: string;
  price: string;
  discountPrice: string;
  stock: number;
  sku: string;
  brand: string;
  soldCount: number;
  product_image: ProductImage[];
  is_active: boolean;
  is_best_seller: boolean;
  tags?: { name: string }[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
