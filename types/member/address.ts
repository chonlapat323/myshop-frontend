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
