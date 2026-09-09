import type { AppDispatch } from "../../store";

import {
  GET_CIRCLE_BADGE_FAILURE,
  GET_CIRCLE_BADGE_REQUEST,
  GET_CIRCLE_BADGE_SUCCESS,
} from "./actiontype";

import { getCircleBadge as getCircleBadgeApi } from "../../../Api/Home/CircleBadge/circleBadgeApi";

export const getCircleBadge = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_CIRCLE_BADGE_REQUEST,
  });

  try {
    const data = await getCircleBadgeApi();

    dispatch({
      type: GET_CIRCLE_BADGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CIRCLE_BADGE_FAILURE,
      payload: "خطا در دریافت اطلاعات Circle Badge",
    });

    console.error("خطا در دریافت Circle Badge:", error);
  }
};