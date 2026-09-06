import type { IAmazing } from "../../../Types/Home/IAmazing";
import { getDbData } from "../../dbApi";

export const getAmazing = async (): Promise<IAmazing[]> => {
  const data = await getDbData();

  return data.amazing;
};
