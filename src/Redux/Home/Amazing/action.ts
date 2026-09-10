import { getAdminAmazing } from "../../../Api/Admin/amazingApi";
import type { AppDispatch } from "../../store";
import { GET_AMAZING } from "./actiontype";

export const getAmazing = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminAmazing();

    dispatch({
      type: GET_AMAZING,
      payload: data,
    });

    return data;
  } catch (error) {
    console.error("خطا در دریافت Amazing:", error);
    throw error;
  }
};