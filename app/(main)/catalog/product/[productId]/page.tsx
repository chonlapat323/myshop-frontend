import { getProductById } from "@/services/home/product.service";
import ProductDetail from "../components/ProductDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { IMAGE_URL, LOCAL_URL } from "@/lib/config";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

// Metadata สำหรับ SEO
export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.productId, 10);
  const product = await getProductById(productId);
  if (!product) {
    return {
      title: "Product Not Found",
      description: "Sorry, we couldn't find the product you're looking for.",
    };
  }

  const imageUrl = `${IMAGE_URL}${
    product.product_image?.[0]?.url || "/images/no-image.jpg"
  }`;

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "My Shop",
      locale: "th_TH",
      url: `${LOCAL_URL}/catalog/product/${product.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
      site: "@yourtwitter",
    },
  };
}

// ตัว page
export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.productId, 10);
  const product = await getProductById(productId);

  if (!product) return notFound();

  return (
    <>
      <ProductDetail product={product} />
    </>
  );
}
