import { Address } from "@/types/member/address";
import { CartItem } from "@/types/cart/cart";

export type OrderPayload = {
  items: { productId: number; quantity: number }[];
  paymentMethod: string;
  shippingFullName: string;
  shippingAddressLine1: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
};

export function buildOrderPayload(
  address: Address,
  cartItems: CartItem[]
): OrderPayload {
  return {
    items: cartItems.map((item) => ({
      productId: item.product_id,
      quantity: item.quantity,
    })),
    paymentMethod: "COD",
    shippingFullName: address.full_name,
    shippingAddressLine1: address.address_line,
    shippingCity: address.city,
    shippingZip: address.zip_code,
    shippingCountry: "ไทย",
  };
}
