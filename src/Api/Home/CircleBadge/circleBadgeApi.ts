import type { ICircleBadge } from "../../../Types/Home/ICircleBadge";
import { getDbData } from "../../dbApi";

const API_URL = "http://localhost:3001/circle_badge";

export const getCircleBadge = async (): Promise<ICircleBadge[]> => {
  if (import.meta.env.PROD) {
    const data = await getDbData();

    return data.circle_badge;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Circle Badge");
  }

  return response.json();
};
