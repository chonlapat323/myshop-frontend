import { getProductById } from "@/services/home/product.service";
import ProductDetail from "../components/ProductDetail";
import { notFound } from "next/navigation";
import { ProductDetailPageProps } from "@/types/product/ProductDetailPage";

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const product = await getProductById(params.productId);
  console.log(product);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
