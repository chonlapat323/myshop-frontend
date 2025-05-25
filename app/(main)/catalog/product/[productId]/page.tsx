import { getProductById } from "@/services/home/product.service";
import ProductDetail from "../components/ProductDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductDetailPageProps {
  params: Promise<{ productId: string }>;
}

// ✅ Metadata สำหรับ SEO
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

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.product_image?.[0]?.url || "/default.jpg",
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: "My Shop",
      locale: "th_TH",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.product_image?.[0]?.url || "/default.jpg"],
      site: "@yourtwitter",
    },
  };
}

// ✅ ตัว page
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
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          name: product.name,
          image: product.product_image?.map((img) => img.url),
          description: product.description,
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
          offers: {
            "@type": "Offer",
            priceCurrency: "THB",
            price: product.price,
            url: `https://paodev.xyz/catalog/product/${product.id}`,
          },
        })}
      </script>
    </>
  );
}
