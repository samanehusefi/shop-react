import type { IProduct } from "../../../Types/Home/IProduct";
import { getDbData } from "../../dbApi";

const API_URL = "http://localhost:3001/products";

export const getProducts = async (): Promise<IProduct[]> => {
  if (import.meta.env.PROD) {
    const data = await getDbData();

    return data.products;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات محصولات");
  }

  return response.json();
};