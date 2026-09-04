import type { AppDispatch } from "../../store";
import { GET_CIRCLE_BADGE } from "./actiontype";
import { getCircleBadge as getCircleBadgeApi } from "../../../Api/Home/CircleBadge/circleBadgeApi";

export const getCircleBadge = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getCircleBadgeApi();
    dispatch({
      type: GET_CIRCLE_BADGE,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Circle Badge:", error);
  }
};
