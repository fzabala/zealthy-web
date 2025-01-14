import { fetchAPI } from "@/lib/api";
import { ComponentConfigType } from "@/types/component-config.type";

export const indexComponentConfigs = async () => {
  type ResponseType = {
    data: ComponentConfigType[];
  };

  return await fetchAPI<ResponseType>("/component-configs");
};

type SaveComponentConfigsRequest = {
  configs: Omit<ComponentConfigType, "id">[];
};

export const saveComponentConfigs = async (
  configs: SaveComponentConfigsRequest
) => {
  type ResponseType = {
    data: ComponentConfigType[];
  };

  const options = {
    method: "POST",
    body: JSON.stringify(configs),
  };

  return await fetchAPI<ResponseType>("/component-configs", {}, options);
};
