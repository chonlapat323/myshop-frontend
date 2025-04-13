export interface Category {
  id: number;
  name: string;
  title: string;
  image: string;
  link: string;
  is_default?: boolean;
  is_active?: boolean;
}
