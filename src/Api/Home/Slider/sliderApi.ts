import type { ISlider } from "../../../Types/Home/ISlider";
import { getDbData } from "../../dbApi";
export const getSlider = async (): Promise<ISlider[]> => {
  const data = await getDbData();

  return data.slider;
};
