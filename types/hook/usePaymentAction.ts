import { PaymentMethod } from "../member/payment";

export type usePaymentActionProps = {
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
};
