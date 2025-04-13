// types/slide.ts
export interface Slide {
  id: number;
  title: string;
  description?: string;
  images: {
    url: string;
    id: number;
  }[];
}
