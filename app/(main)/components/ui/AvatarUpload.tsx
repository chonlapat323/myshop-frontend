"use client";

import { useState } from "react";
import Image from "next/image";
import { EditOutlined } from "@ant-design/icons";
import { AvatarUploadProps } from "@/types/ui/AvatarUpload";

export default function AvatarUpload({ onImageChange }: AvatarUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      if (onImageChange) {
        onImageChange(file);
      }
    }
  };

  return (
    <div className="relative w-24 h-24">
      {image ? (
        <Image
          src={image}
          alt="Avatar"
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-black"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a5 5 0 00-5 5v1a5 5 0 1010 0V7a5 5 0 00-5-5zm-7 14a7 7 0 0114 0v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <label className="absolute bottom-0 right-0 bg-black text-white w-8 h-8 flex items-center justify-center rounded-full cursor-pointer shadow-md">
        <EditOutlined className="text-sm" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}
