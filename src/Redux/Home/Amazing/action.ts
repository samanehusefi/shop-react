import type { AppDispatch } from "../../store";
import { GET_AMAZING } from "./actiontype";
import { getAmazing as getAmazingApi } from "../../../Api/Home/Amazing/amazingApi";

export const getAmazing = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAmazingApi();
    dispatch({
      type: GET_AMAZING,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Amazing:", error);
  }
};
