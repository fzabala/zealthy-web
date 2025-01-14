import { fetchAPI } from "@/lib/api";
import { STEPS } from "@/types/steps.type";
import { UserType } from "@/types/user.type";

export const indexUsers = async () => {
  type ResponseType = {
    data: UserType[];
  };

  return await fetchAPI<ResponseType>("/users");
};

type CreateUserRequest = {
  email: string;
  password: string;
};

export const createUser = async ({ email, password }: CreateUserRequest) => {
  type ResponseType = {
    data: UserType;
  };

  const options = {
    method: "POST",
    body: JSON.stringify({ email, password }),
  };

  return await fetchAPI<ResponseType>("/users", {}, options);
};

type UpdateUserRequest = {
  about: string;
  birthDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

export const updateUser = async (
  id: number,
  progress: STEPS,
  { about, birthDate, address }: Partial<UpdateUserRequest>
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
