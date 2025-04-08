"use client";

import { Carousel } from "antd";
import styles from "./Slider.module.css";
import Image from "next/image";
interface SliderProps {
  slides: { id: number; image: string; title?: string; description?: string }[];
}

export default function Slider({ slides }: SliderProps) {
  return (
    <Carousel className={styles["slider-container"]}>
      {slides.map((slide) => (
        <div key={slide.id} className={styles["slider-item"]}>
          {/* รูปภาพที่เป็น Cover */}
          <Image
            src={slide.image}
            alt={slide.title || "Slide"}
            fill
            className={styles["slider-image"]}
            style={{ objectFit: "cover" }}
            priority
          />
          {/* ข้อความบนรูป */}
          {slide.title && (
            <div className={styles["slider-content"]}>
              <h2 className={styles["slider-title"]}>{slide.title}</h2>
              {slide.description && (
                <p className={styles["slider-description"]}>
                  {slide.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </Carousel>
  );
}
