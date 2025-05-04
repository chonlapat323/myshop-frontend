export interface MenuItem {
  key: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  isMenuOpen: boolean;
  menuItems: MenuItem[];
  onClose: () => void;
}
