import { STEPS } from "@/types/steps.type";

export type UserType = {
  id: number;
  email: string;
  password: string;
  about?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthDate?: string;
  progress?: STEPS;
};
