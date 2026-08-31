import type { IHeaderData } from "../Types/Header/IHeader";
import API_URL from "../Api/api";

export const getHeader = async (): Promise<IHeaderData> => {
  const response = await fetch(`${API_URL}/header`);
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Header");
  }
  return response.json();
};
