import type { IBanner } from "../../../Types/Home/IBanner";
import { getDbData } from "../../dbApi";

export const getBanners = async (): Promise<IBanner[]> => {
  const data = await getDbData();

  return data.banners;
};
