import api from "./configAxios";

export const getUserProfile = async () => {
  const response = await api.get("user/profile/");
  return response.data;
};
