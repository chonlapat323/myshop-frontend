import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface IconLinkProps {
  href: string;
  icon: IconDefinition;
  alt: string;
}

export default function IconLink({ href, icon, alt }: IconLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon
        icon={icon}
        className="text-white text-2xl hover:opacity-75 transition"
        title={alt} // ใช้ title เพื่อ tooltip
      />
    </Link>
  );
}
