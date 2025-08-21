"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: { url: string }[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  imageRef: React.RefObject<HTMLImageElement | null>;
};

import { API_URL } from "@/lib/config";

export default function ProductImageGallery({
  images,
  selectedIndex,
  onSelect,
  imageRef,
}: Props) {
  const [isBackendAvailable, setIsBackendAvailable] = useState<boolean | null>(null);

  // ตรวจสอบว่า backend server รันอยู่หรือไม่
  useEffect(() => {
    const checkBackend = async () => {
      if (!API_URL) {
        setIsBackendAvailable(false);
        return;
      }

      try {
        // ลองโหลดรูปภาพแทนการเช็ค /health
        const testImageUrl = `${API_URL}/uploads/products/11-1752737904387-6d66.jpg`;
        const response = await fetch(testImageUrl, { 
          method: 'HEAD',
          signal: AbortSignal.timeout(3000) // timeout 3 วินาที
        });
        setIsBackendAvailable(response.ok);
      } catch (error) {
        console.warn("⚠️ Backend server is not available:", error);
        setIsBackendAvailable(false);
      }
    };

    checkBackend();
  }, [API_URL]);

  // Debug: ตรวจสอบค่า API_URL
  console.log("🔍 ProductImageGallery Debug:", {
    API_URL,
    isBackendAvailable,
    imagesLength: images.length,
    selectedIndex,
    firstImageUrl: images[0]?.url
  });

  // ตรวจสอบว่ามี API_URL และรูปภาพ
  const canLoadImages = API_URL && images.length > 0;

  const selectedImageUrl =
    images.length > 0 && canLoadImages
      ? `${API_URL}${images[selectedIndex]?.url ?? images[0].url}`
      : `/images/no-image.jpg`;

  console.log("🔍 Selected Image URL:", selectedImageUrl);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mb-4 lg:mb-0 lg:mr-4 flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
        {images.map((img, idx) => {
          const image = img?.url && canLoadImages
            ? `${API_URL}${img.url}`
            : "/images/no-image.jpg";

          console.log(`🔍 Thumbnail ${idx} URL:`, image);

          return (
            <div
              key={idx}
              onClick={() => onSelect(idx)}
              className={`relative cursor-pointer border-2 ${
                selectedIndex === idx ? "border-gray-800" : "border-transparent"
              }`}
              style={{ width: "80px", height: "80px" }}
            >
              <Image
                ref={imageRef}
                src={image}
                alt={`Thumbnail ${idx}`}
                fill
                sizes="(max-width: 768px) 20vw, 80px"
                className="object-cover"
                onError={(e) => {
                  console.log("❌ Image load error:", image);
                  const target = e.target as HTMLImageElement;
                  target.src = "/images/no-image.jpg";
                }}
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
          alt="Product image"
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover"
          priority={selectedIndex === 0}
          onError={(e) => {
            console.log("❌ Main image load error:", selectedImageUrl);
            const target = e.target as HTMLImageElement;
            target.src = "/images/no-image.jpg";
          }}
        />
      </div>
    </div>
  );
}
