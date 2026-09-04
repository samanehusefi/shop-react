import type { ISlider } from "../../../Types/Home/ISlider";

export const getSlider = async (): Promise<ISlider[]> => {
  const response = await fetch(`${import.meta.env.BASE_URL}db.json`);

  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات Slider");
  }

  const data = await response.json();

  return data.slider;
};
