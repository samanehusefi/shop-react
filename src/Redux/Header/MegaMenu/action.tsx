import { GET_MEGA_MENU, SET_ACTIVE_MEGA_MENU } from "./actiontype";

import { getMegaMenu } from "../../../Api/Header/megaMenuApi";
import type { AppDispatch } from "../../store";

export const getMegaMenuAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await getMegaMenu();

      dispatch({
        type: GET_MEGA_MENU,
        payload: data,
      });
    } catch (error) {
      console.error("خطا در دریافت Mega Menu:", error);
    }
  };
};

export const setActiveMegaMenu = (id: string | null) => {
  return {
    type: SET_ACTIVE_MEGA_MENU,
    payload: id,
  };
};
