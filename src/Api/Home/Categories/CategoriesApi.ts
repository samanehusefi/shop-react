import type { ICategory } from "../../../Types/Home/ICategory";

export const getCategories = async (): Promise<ICategory[]> => {
  const isproduction = import.meta.env.PROD;

  const response = await fetch(
    isproduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/categories`,
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Categories");
  }

  const data = await response.json();

  return isproduction ? data.categories : data;
};
