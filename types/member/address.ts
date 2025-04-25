export interface Address {
  id?: number;
  user_id?: string;
  full_name: string;
  address_line: string;
  city: string;
  state: string;
  zip_code: string;
  country?: string;
  phone_number: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateAddressDto {
  full_name: string;
  address_line: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  is_default?: boolean;
}

export interface AddressListProps {
  addresses: Address[];
  onEdit: (address: Address) => void;
  editingAddressId: number | null;
  newAddress: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
    is_default?: boolean;
  };
  errors: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
  loading: boolean;
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

export interface AddressFormProps {
  newAddress: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  errors: {
    full_name: string;
    address_line: string;
    city: string;
    state: string;
    zip_code: string;
    phone_number: string;
  };
  loading: boolean;
  editingAddressId: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveOrUpdate: () => void;
  onCancel: () => void;
}
