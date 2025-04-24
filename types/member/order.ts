import { Address } from "./address";

export type OrderItem = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  product: {
    product_image: {
      id: number;
      url: string;
      is_main: boolean;
      productId: number;
      order_image: number;
    }[];
  };
};

export interface Order {
  id: number;
  order_number: string;
  created_at: string;
  total_price: number;
  items: OrderItem[];
  order_status: "pending" | "shipped" | "cancelled";
  tracking_number: string;
  shipping_address: Address;
}
