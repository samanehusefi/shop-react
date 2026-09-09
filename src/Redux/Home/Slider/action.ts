import { getSlider as getSliderApi } from "../../../Api/Home/Slider/sliderApi";

import type { AppDispatch } from "../../store";

import {
  GET_SLIDER_REQUEST,
  GET_SLIDER_SUCCESS,
  GET_SLIDER_FAILURE,
} from "./actiontype";

export const getSlider = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_SLIDER_REQUEST,
  });

  try {
    const data = await getSliderApi();

    dispatch({
      type: GET_SLIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Slider:", error);

    dispatch({
      type: GET_SLIDER_FAILURE,
      payload: "خطا در دریافت اسلایدرها",
    });
  }
};
