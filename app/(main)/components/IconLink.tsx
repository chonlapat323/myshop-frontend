import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconLinkProps } from "@/types/components/IconLink";

export default function IconLink({ href, icon, alt }: IconLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <FontAwesomeIcon
        icon={icon}
        className="text-white text-2xl hover:opacity-75 transition"
        title={alt}
      />
    </Link>
  );
}
