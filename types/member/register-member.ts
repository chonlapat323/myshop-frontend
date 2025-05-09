export interface RegisterMemberFormValues {
  first_name: string;
  email: string;
  password: string;
  confirm_password: string; // ใช้เฉพาะใน form เท่านั้น
}
export interface RegisterMemberDto {
  first_name: string;
  email: string;
  password: string;
}
