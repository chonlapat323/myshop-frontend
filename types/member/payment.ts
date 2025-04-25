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

export interface ManagePaymentFormProps {
  newMethod: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
    is_default?: boolean;
  };
  errors: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
  };
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  editingId: string | null;
}
export interface ManagePaymentListProps {
  methods: PaymentMethod[];
  setMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  onEdit: (method: PaymentMethod) => void;
  editingId: string | null;
  newMethod: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
    is_default?: boolean;
  };
  errors: {
    cardholder_name: string;
    card_number: string;
    expiry_date: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  loading: boolean;
}
