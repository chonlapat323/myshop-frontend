export type OrderPayload = {
  items: { productId: number; quantity: number }[];
  paymentMethod: string;
  shippingFullName: string;
  shippingAddressLine1: string;
  shippingCity: string;
  shippingZip: string;
  shippingCountry: string;
  shippingPhone: string;
  shippingState: string;
};
