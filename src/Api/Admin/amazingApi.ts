import type { IAmazing } from "../../Types/Home/IAmazing";
import { getDbData } from "../dbApi";

const API_URL = "http://localhost:3001/amazing";

const isProduction = import.meta.env.PROD;

export const getAdminAmazing = async (): Promise<IAmazing[]> => {
  if (isProduction) {
    const data = await getDbData();
    return data.amazing;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت Amazing");
  }

  return response.json();
};

export const createAmazing = async (
  amazing: Omit<IAmazing, "id">,
): Promise<IAmazing> => {
  if (isProduction) {
    throw new Error("ایجاد Amazing در نسخه آنلاین امکان‌پذیر نیست");
  }

  const items = await getAdminAmazing();

  const ids = items
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
      ...amazing,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد Amazing");
  }

  return response.json();
};

export const updateAmazing = async (
  id: IAmazing["id"],
  amazing: Partial<Omit<IAmazing, "id">>,
): Promise<IAmazing> => {
  if (isProduction) {
    throw new Error("ویرایش Amazing در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(amazing),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش Amazing");
  }

  return response.json();
};

export const deleteAmazing = async (id: IAmazing["id"]): Promise<void> => {
  if (isProduction) {
    throw new Error("حذف Amazing در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف Amazing");
  }
};
