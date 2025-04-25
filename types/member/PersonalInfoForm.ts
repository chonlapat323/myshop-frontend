export type PersonalInfoFormProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    avatarUrl?: string;
  };
  loading: boolean;
  submitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (file: File | null) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
