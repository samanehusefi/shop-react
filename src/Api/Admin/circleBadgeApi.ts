import type { ICircleBadge } from "../../Types/Home/ICircleBadge";

const API_URL = "http://localhost:3001/circle_badge";

const isProduction = import.meta.env.PROD;

export const getAdminCircleBadge = async (): Promise<ICircleBadge[]> => {
  if (isProduction) {
    throw new Error(
      "دریافت Circle Badge از API ادمین در نسخه آنلاین امکان‌پذیر نیست",
    );
  }

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت Circle Badge");
  }

  return response.json();
};

export const createCircleBadge = async (
  circleBadge: Omit<ICircleBadge, "id">,
): Promise<ICircleBadge> => {
  if (isProduction) {
    throw new Error("ایجاد Circle Badge در نسخه آنلاین امکان‌پذیر نیست");
  }

  const items = await getAdminCircleBadge();

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
      ...circleBadge,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد Circle Badge");
  }

  return response.json();
};

export const updateCircleBadge = async (
  id: ICircleBadge["id"],
  data: Partial<Omit<ICircleBadge, "id">>,
): Promise<ICircleBadge> => {
  if (isProduction) {
    throw new Error("ویرایش Circle Badge در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش Circle Badge");
  }

  return response.json();
};

export const deleteCircleBadge = async (
  id: ICircleBadge["id"],
): Promise<void> => {
  if (isProduction) {
    throw new Error("حذف Circle Badge در نسخه آنلاین امکان‌پذیر نیست");
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف Circle Badge");
  }
};
