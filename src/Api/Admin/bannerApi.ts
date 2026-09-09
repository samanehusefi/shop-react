import type { IBanner } from "../../Types/Home/IBanner";
import { getDbData } from "../dbApi";

const API_URL = "http://localhost:3001/banners";

const isProduction = import.meta.env.PROD;

export const getAdminBanners = async (): Promise<IBanner[]> => {
  if (isProduction) {
    const data = await getDbData();
    return data.banners;
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت بنرها");
  }

  return response.json();
};

export const createBanner = async (
  banner: Omit<IBanner, "id">,
): Promise<IBanner> => {
  if (isProduction) {
    throw new Error("ایجاد بنر در نسخه آنلاین امکان‌پذیر نیست");
  }

  const banners = await getAdminBanners();

  const ids = banners
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
      ...banner,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد بنر");
  }

  return response.json();
};

export const updateBanner = async (
  id: IBanner["id"],
  banner: Partial<Omit<IBanner, "id">>,
): Promise<IBanner> => {
  if (isProduction) {
    throw new Error("ویرایش بنر در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(banner),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش بنر");
  }

  return response.json();
};

export const deleteBanner = async (id: IBanner["id"]): Promise<void> => {
  if (isProduction) {
    throw new Error("حذف بنر در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف بنر");
  }
};
