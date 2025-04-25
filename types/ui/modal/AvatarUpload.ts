export type ImageUploadProps = {
  onChange?: (file: File | null) => void;
  value?: string; // preview URL
  loading?: boolean;
};
