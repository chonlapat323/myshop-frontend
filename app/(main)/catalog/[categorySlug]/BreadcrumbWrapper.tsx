"use client";

import Breadcrumbs from "../components/Breadcrumbs";

type Props = {
  categorySlug: string;
};

export default function BreadcrumbWrapper({ categorySlug }: Props) {
  return <Breadcrumbs categorySlug={categorySlug} />;
}
