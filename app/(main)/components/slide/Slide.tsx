"use client";

import { Carousel } from "antd";
import styles from "./Slider.module.css";
import Image from "next/image";
import { SliderProps } from "@/types/components/slide/Slider";

export default function Slider({ slides }: SliderProps) {
  return (
    <Carousel
      className={styles["slider-container"]}
      autoplay
      autoplaySpeed={7000}
    >
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
