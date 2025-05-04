"use client";
import { useRef, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { ProductDetailProps } from "@/types/product/product-detail-page";
import { useAddToCart } from "@/hooks/cart/useAddToCartFromProduct";
import ProductImageGallery from "@/app/(main)/components/products/ProductImageGallery";

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const tabs = ["Additional Information", "Design"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const images = product.product_image ?? [];
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { add } = useAddToCart(product.id);
  const handleAddToCart = async () => {
    add(quantity, imageRef.current ?? undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs
        productName={product.name}
        categorySlug={product.category?.link}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductImageGallery
          images={images}
          selectedIndex={selectedImage}
          onSelect={(idx) => setSelectedImage(idx)}
          imageRef={imageRef}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-lg font-medium">${product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          <div>
            <label
              htmlFor="quantity"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded w-20 p-2"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="cursor-pointer bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex space-x-6 border-b">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "Additional Information" && (
            <div>
              <p className="text-gray-700">
                {product.additionalInformation || "-"}
              </p>
            </div>
          )}

          {activeTab === "Design" && (
            <div>
              <p className="text-gray-700">{product.design || "-"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
