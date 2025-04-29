export interface Slide {
  id: number;
  title: string;
  description?: string;
  slide_images: {
    url: string;
    id: number;
  }[];
}
