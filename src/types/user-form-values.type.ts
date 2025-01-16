export type UserFormValuesType = {
  isAbout: boolean;
  about?: string;
  isBirthDate: boolean;
  birthDate?: string;
  isAddress: boolean;
  address?:
    | {
        street: string;
        city: string;
        state: string;
        zip: string;
      }
    | string;
};
