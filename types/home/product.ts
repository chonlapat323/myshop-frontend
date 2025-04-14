export interface ProductImage {
  id: number;
  url: string;
  is_main: boolean;
  productId: number;
  order_image: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // หรือใช้ `number` ถ้าคุณจะ parse เป็น float
  discountPrice: string; // หรือ `number`
  stock: number;
  sku: string;
  brand: string;
  soldCount: number;
  images: ProductImage[];
  is_active: boolean;
  is_best_seller: boolean;
  created_at: string; // หรือ `Date` ถ้าแปลงแล้ว
  updated_at: string;
  deleted_at: string | null;
}
