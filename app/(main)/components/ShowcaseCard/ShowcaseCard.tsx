import Image from "next/image";
import styles from "./Card.module.css";
interface ShowcaseProps {
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export default function Showcase({
  title,
  subtitle,
  image,
  link,
}: ShowcaseProps) {
  return (
    <div className={`${styles["showcase-container"]} parent-of-showcase`}>
      <Image
        layout="fill"
        src={image}
        alt={title}
        className={styles["showcase-image"]}
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
