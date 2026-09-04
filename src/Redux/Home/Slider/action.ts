import { getSlider as getSliderApi } from "../../../Api/Home/Slider/sliderApi";

import type { AppDispatch } from "../../store";

import { GET_SLIDER } from "./actiontype";

export const getSlider = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getSliderApi();

    dispatch({
      type: GET_SLIDER,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Slider:", error);
  }
};