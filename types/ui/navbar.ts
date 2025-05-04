export interface MenuItem {
  key: string;
  label: string;
  href: string;
}

export interface NavbarProps {
  menuItems: MenuItem[];
}
