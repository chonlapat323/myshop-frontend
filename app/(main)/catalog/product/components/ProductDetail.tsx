"use client";
import { useState } from "react";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Product } from "@/types/home/product";
import { API_URL } from "@/lib/config";

type ProductDetailProps = {
  product: Product;
};

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.product_image ?? [];

  const tabs = ["Additional Information", "Design"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const selectedImageUrl =
    images.length > 0
      ? `${API_URL}${images[selectedImage]?.url ?? images[0].url}`
      : `/uploads/no-image.jpg`;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumbs
        productName={product.name}
        categorySlug={product.category?.link}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col lg:flex-row">
          <div className="mb-4 lg:mb-0 lg:mr-4 flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
            {images.map((img, idx) => {
              const image = img?.url
                ? `${API_URL}${img.url}`
                : "/uploads/no-image.jpg";

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative cursor-pointer border-2 ${
                    selectedImage === idx
                      ? "border-gray-800"
                      : "border-transparent"
                  }`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <Image
                    src={`${image}`}
                    alt={`Thumbnail ${idx}`}
                    fill
                    sizes="(max-width: 768px) 20vw, 80px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          <div
            className="relative flex-1 flex justify-center items-center"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src={selectedImageUrl}
              alt="Sofa Lucca"
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
              priority={selectedImage === 0}
            />
          </div>
        </div>

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
              defaultValue="1"
              className="border rounded w-20 p-2"
            />
          </div>

          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
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
