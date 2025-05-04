import { Address } from "@/types/member/address";

export interface ShippingAddressModalProps {
  open: boolean;
  address: Address | null;
  onClose: () => void;
}
