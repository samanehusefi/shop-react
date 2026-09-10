import { getAdminCircleBadge } from "../../../Api/Admin/circleBadgeApi";
import type { AppDispatch } from "../../store";
import { GET_CIRCLE_BADGE } from "./actiontype";

export const getCircleBadge = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminCircleBadge();

    dispatch({
      type: GET_CIRCLE_BADGE,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Circle Badge:", error);
  }
};