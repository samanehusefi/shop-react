import type { IHeaderData } from "../Types/Header/IHeader";

export const getHeader = async (): Promise<IHeaderData> => {
  const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Header");
  }

  const data = await response.json();

  return data.header;
};
