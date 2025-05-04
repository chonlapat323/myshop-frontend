export type MemberProfileForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar_url?: File;
};

export interface MemberInfo {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  avatar_url: string;
}
