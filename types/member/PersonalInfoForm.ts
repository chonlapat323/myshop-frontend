export type PersonalInfoFormProps = {
  formData: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    avatar_url?: string;
  };
  loading: boolean;
  submitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
