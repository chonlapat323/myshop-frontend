import { getProductById } from "@/services/home/product.service";
import ProductDetail from "../components/ProductDetail";
import { notFound } from "next/navigation";

type Props = {
  params: { productId: string };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.productId);
  console.log(product);
  if (!product) return notFound();

  return <ProductDetail product={product} />;
}
