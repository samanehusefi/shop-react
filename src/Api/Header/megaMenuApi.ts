import type { IMegaMenu } from "../../Types/Header/IMegaMenu";
import { getDbData } from "../dbApi";

export const getMegaMenu = async (): Promise<IMegaMenu[]> => {
  const data = await getDbData();

  return data.megaMenu;
};
