import { Address } from "@/types/member/Address";

export interface ShippingAddressModalProps {
  open: boolean;
  address: Address | null;
  onClose: () => void;
}
