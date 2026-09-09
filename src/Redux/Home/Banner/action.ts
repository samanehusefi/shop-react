import { getAdminBanners } from "../../../Api/Admin/bannerApi";

import type { AppDispatch } from "../../store";

import {
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILURE,
} from "./actiontype";

export const getBanners = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_BANNERS_REQUEST,
  });

  try {
    const data = await getAdminBanners();

    dispatch({
      type: GET_BANNERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت بنرها:", error);

    dispatch({
      type: GET_BANNERS_FAILURE,
      payload: "خطا در دریافت بنرها",
    });
  }
};
