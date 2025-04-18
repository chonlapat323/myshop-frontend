export interface PaymentMethod {
  id: string;
  user_id: string;
  cardholder_name: string;
  card_number: string;
  expiry_date: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePaymentMethodDto {
  cardholder_name: string;
  card_number: string;
  expiry_date: string;
  is_default?: boolean;
}

export interface UpdatePaymentMethodDto {
  cardholder_name?: string;
  card_number?: string;
  expiry_date?: string;
  is_default?: boolean;
}
