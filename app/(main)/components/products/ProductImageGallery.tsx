"use client";

import Image from "next/image";

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
  const selectedImageUrl =
    images.length > 0
      ? `${API_URL}${images[selectedIndex]?.url ?? images[0].url}`
      : `/uploads/no-image.jpg`;

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="mb-4 lg:mb-0 lg:mr-4 flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4">
        {images.map((img, idx) => {
          const image = img?.url
            ? `${API_URL}${img.url}`
            : "/uploads/no-image.jpg";

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
        />
      </div>
    </div>
  );
}
