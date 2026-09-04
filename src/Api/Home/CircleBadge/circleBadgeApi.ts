import type { ICircleBadge } from "../../../Types/Home/ICircleBadge";

export const getCircleBadge = async (): Promise<ICircleBadge[]> => {
  const isproduction = import.meta.env.PROD;

  const response = await fetch(
    isproduction
      ? `${import.meta.env.BASE_URL}db.json`
      : `${import.meta.env.VITE_API_URL}/circle_badge`,
  );

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Circle Badge");
  }

  const data = await response.json();

  return isproduction ? data.circle_badge : data;
};
