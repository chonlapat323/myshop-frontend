// app/(components)/bestsellers/page.tsx
import BestsellersSection from "./BestsellersSection";
import { Product } from "./BestsellersSection"; // หรือ Path ที่ถูกต้อง

// กำหนด Mock Data (ตรวจสอบ Type อีกครั้ง)
const mockProducts: Product[] = [
  {
    id: 1,
    image: "/images/products/chair.jpg",
    name: "Wood small chair",
    price: 120,
    link: "/product/1",
  },
  {
    id: 2,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
  },
  {
    id: 3,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
  },
  {
    id: 4,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
  },
  // ... สินค้าอื่นๆ
];

export default function BestsellersPage() {
  return <BestsellersSection products={mockProducts} />;
}
