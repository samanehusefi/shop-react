import type { AppDispatch } from "../store";
import {
  GET_FOOTER_FAILURE,
  GET_FOOTER_REQUEST,
  GET_FOOTER_SUCCESS,
} from "./actiontype";
import { getFooter } from "../../Api/Footer/FooterApi";

export const getFooterAction = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_FOOTER_REQUEST,
  });

  try {
    const data = await getFooter();

    dispatch({
      type: GET_FOOTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOOTER_FAILURE,
      payload:
        error instanceof Error ? error.message : "خطا در دریافت اطلاعات Footer",
    });
  }
};
