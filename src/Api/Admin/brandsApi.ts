import type { IBrand } from "../../Types/Home/IBrand";
import { getDbData } from "../dbApi";

const API_URL = "http://localhost:3001/brands";

const isProduction = import.meta.env.PROD;

export const getAdminBrands = async (): Promise<IBrand[]> => {
  if (isProduction) {
    const data = await getDbData();
    return data.brands;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت برندها");
  }

  return response.json();
};

export const createBrand = async (
  brand: Omit<IBrand, "id">,
): Promise<IBrand> => {
  if (isProduction) {
    throw new Error("ایجاد برند در نسخه آنلاین امکان‌پذیر نیست");
  }

  const brands = await getAdminBrands();

  const ids = brands
    .map((item) => Number(item.id))
    .filter((id) => Number.isInteger(id));

  const newId = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: newId,
      ...brand,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد برند");
  }

  return response.json();
};

export const updateBrand = async (
  id: IBrand["id"],
  brand: Partial<Omit<IBrand, "id">>,
): Promise<IBrand> => {
  if (isProduction) {
    throw new Error("ویرایش برند در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش برند");
  }

  return response.json();
};

export const deleteBrand = async (id: IBrand["id"]): Promise<void> => {
  if (isProduction) {
    throw new Error("حذف برند در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف برند");
  }
};
