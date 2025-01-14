import { fetchAPI } from "@/lib/api";
import { FieldType } from "@/types/field.type";

export const indexFields = async () => {
  type ResponseType = {
    data: FieldType[];
  };

  return await fetchAPI<ResponseType>("/fields");
};
