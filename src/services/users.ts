import { fetchAPI } from "@/lib/api";
import { STEPS } from "@/types/steps.type";
import { UserFormSignUpType } from "@/types/user-form-sign-up.type";
import { UserFormValuesType } from "@/types/user-form-values.type";
import { UserType } from "@/types/user.type";

export const indexUsers = async () => {
  type ResponseType = {
    data: UserType[];
  };

  return await fetchAPI<ResponseType>("/users");
};

export const createUser = async ({ email, password }: UserFormSignUpType) => {
  type ResponseType = {
    data: UserType;
  };

  const options = {
    method: "POST",
    body: JSON.stringify({ email, password }),
  };

  return await fetchAPI<ResponseType>("/users", {}, options);
};

export const updateUser = async (
  id: number,
  progress: STEPS,
  { about, birthDate, address }: Partial<UserFormValuesType>
) => {
  type ResponseType = {
    data: UserType;
  };

  const options = {
    method: "PUT",
    body: JSON.stringify({ about, birthDate, address, progress }),
  };

  return await fetchAPI<ResponseType>(`/users/${id}`, {}, options);
};
