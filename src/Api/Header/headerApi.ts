import type { IHeaderData } from "../../Types/Header/IHeader";
import { getDbData } from "../dbApi";

export const getHeader = async (): Promise<IHeaderData> => {
  const data = await getDbData();

  return data.header;
};