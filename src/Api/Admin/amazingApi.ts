import type { IAmazing } from "../../../../Types/Home/IAmazing";

const API_URL = `${import.meta.env.VITE_API_URL}/amazing`;

export const getAdminAmazing = async (): Promise<IAmazing[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت Amazing");
  }

  return response.json();
};

export const createAmazing = async (
  amazing: Omit<IAmazing, "id">,
): Promise<IAmazing> => {
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
  id: number,
  amazing: Partial<Omit<IAmazing, "id">>,
): Promise<IAmazing> => {
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

export const deleteAmazing = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف Amazing");
  }
};
