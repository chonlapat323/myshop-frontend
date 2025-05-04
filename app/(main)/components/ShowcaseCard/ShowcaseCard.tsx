"use client";
import Image from "next/image";
import styles from "./Card.module.css";
import { ShowcaseProps } from "@/types/components/showcase/showcase";

export default function Showcase({
  title,
  subtitle,
  image,
  link,
}: ShowcaseProps) {
  return (
    <div className={`${styles["showcase-container"]} parent-of-showcase`}>
      <Image
        fill
        src={image}
        alt={title}
        className={styles["showcase-image"]}
        style={{ objectFit: "cover" }}
        priority
      />
      <div className={styles["showcase-content"]}>
        <h3 className={styles["showcase-title"]}>{title}</h3>
        <p className={styles["showcase-subtitle"]}>{subtitle}</p>
        <a href={link} className={styles["showcase-link"]}>
          SEE NOW
        </a>
      </div>
    </div>
  );
}
