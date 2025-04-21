// app/login/layout.tsx
import { Toaster } from "sonner";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <CartProvider>{children}</CartProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  ); // Layout นี้จะไม่รวม Navbar/Footer
}
