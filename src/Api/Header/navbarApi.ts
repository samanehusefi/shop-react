import type { INavBarItems } from "../../Types/Header/INavbarItem";
import { getDbData } from "../dbApi";

export const getNavbar = async (): Promise<INavBarItems[]> => {
  const data = await getDbData();

  return data.navbar;
};
