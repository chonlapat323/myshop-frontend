export interface Address {
  id?: string;
  user_id?: string;
  full_name: string;
  address_line: string;
  city: string;
  state: string;
  zip_code: string;
  phone_number: string;
  is_default?: boolean;
  created_at?: string;
  updated_at?: string;
}
