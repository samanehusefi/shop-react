import type { ICategory } from "../../Types/Home/ICategory";

const API_URL = "http://localhost:3001/categories";

export const getAdminCategories = async (): Promise<ICategory[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت دسته‌بندی‌ها");
  }

  return response.json();
};

export const createCategory = async (
  category: Omit<ICategory, "id" | "showHomepage">,
): Promise<ICategory> => {
  const categories = await getAdminCategories();

  const ids = categories
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
      ...category,
      showHomepage: true,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد دسته‌بندی");
  }

  return response.json();
};

export const updateCategory = async (
  id: ICategory["id"],
  category: Partial<Omit<ICategory, "id">>,
): Promise<ICategory> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش دسته‌بندی");
  }

  return response.json();
};

export const deleteCategory = async (id: ICategory["id"]): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف دسته‌بندی");
  }
};
