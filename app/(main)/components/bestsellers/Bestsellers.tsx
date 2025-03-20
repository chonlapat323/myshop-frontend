// app/(components)/bestsellers/page.tsx
import BestsellersSection from "./BestsellersSection";
import { ProductInterface } from "../ui/ProductCard"; // Import Product Interface from ProductCard

// กำหนด Mock Data (ตรวจสอบ Type อีกครั้ง)
const mockProducts: ProductInterface[] = [
  {
    id: 1,
    image: "/images/products/chair.jpg",
    name: "Wood small chair",
    price: 120,
    link: "/product/1",
    brand: "Generic", // เพิ่ม brand
    category: "furniture", // เพิ่ม category
  },
  {
    id: 2,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
    brand: "Generic", // เพิ่ม brand
    category: "furniture", // เพิ่ม category
  },
  {
    id: 3,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
    brand: "Generic", // เพิ่ม brand
    category: "furniture", // เพิ่ม category
  },
  {
    id: 4,
    image: "/images/products/table.jpg",
    name: "Tomo side table",
    price: 250,
    link: "/product/2",
    brand: "Generic", // เพิ่ม brand
    category: "furniture", // เพิ่ม category
  },
  // ... สินค้าอื่นๆ (คุณสามารถเพิ่มข้อมูล brand และ category ให้กับสินค้าอื่นๆ ได้)
];

export default function BestsellersPage() {
  return <BestsellersSection products={mockProducts} />;
}
