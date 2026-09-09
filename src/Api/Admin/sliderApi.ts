import type { ISlider } from "../../Types/Home/ISlider";

const API_URL = "http://localhost:3001/slider";

export const getAdminSliders = async (): Promise<ISlider[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("خطا در دریافت اسلایدرها");
  }

  return response.json();
};

export const createSlider = async (
  slider: Omit<ISlider, "id">,
): Promise<ISlider> => {
  const sliders = await getAdminSliders();

  const ids = sliders
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
      ...slider,
    }),
  });

  if (!response.ok) {
    throw new Error("خطا در ایجاد اسلایدر");
  }

  return response.json();
};

export const updateSlider = async (
  id: ISlider["id"],
  slider: Partial<Omit<ISlider, "id">>,
): Promise<ISlider> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(slider),
  });

  if (!response.ok) {
    throw new Error("خطا در ویرایش اسلایدر");
  }

  return response.json();
};

export const deleteSlider = async (id: ISlider["id"]): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("خطا در حذف اسلایدر");
  }
};
