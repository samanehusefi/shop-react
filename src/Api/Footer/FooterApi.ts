import type { FooterState } from "../../Types/Footer/IFooter";
import { getDbData } from "../dbApi";

export const getFooter = async (): Promise<FooterState> => {
  const data = await getDbData();

  return data.footer;
};
