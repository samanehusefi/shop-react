import { getAdminSliders } from "../../../Api/Admin/sliderApi";
import type { AppDispatch } from "../../store";
import { GET_SLIDER } from "./actiontype";

export const getSlider = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminSliders();

    dispatch({
      type: GET_SLIDER,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت Slider:", error);
  }
};
