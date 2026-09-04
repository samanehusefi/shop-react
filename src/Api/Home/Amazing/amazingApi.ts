import type { IAmazing } from "../../../Types/Home/IAmazing";
export const getAmazing = async (): Promise<IAmazing[]> => {
  const isProduction = import.meta.env.PROD;

  const response = await fetch(
    isProduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/amazing`,
  );
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Amazing");
  }
  const data = await response.json();
  return isProduction ? data.amazing : data;
};
