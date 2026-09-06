import { GET_NAVBAR_MENU, SET_ACTIVE_NAVBAR } from "./actiontype";
import { getNavbar } from "../../../Api/Header/navbarApi";
import type { AppDispatch } from "../../store";

export const getNavBarAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data = await getNavbar();

      dispatch({
        type: GET_NAVBAR_MENU,
        payload: data,
      });
    } catch (error) {
      console.error("خطا در دریافت NavBar:", error);
    }
  };
};

export const setActiveNavBar = (id: string | null) => {
  return {
    type: SET_ACTIVE_NAVBAR,
    payload: id,
  };
};
