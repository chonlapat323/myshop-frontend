import { PaymentMethod } from "../member/Payment";

export type usePaymentActionProps = {
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
};
