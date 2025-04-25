import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface FooterProps {
  menuItems: { key: string; label: string; href: string }[];
  info: {
    address: string;
    email: string;
    phone: string;
    socialLinks: { icon: IconDefinition; href: string }[];
  };
}
