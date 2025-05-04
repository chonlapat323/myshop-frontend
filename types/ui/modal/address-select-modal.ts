export type AddressSelectModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (addressId: number) => void;
};
