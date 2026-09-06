import { GET_BANNERS } from "./actiontype";
import type { IBanner } from "../../../Types/Home/IBanner";
import type { AppDispatch } from "../../store";
import { getBanners } from "../../../Api/Home/Banner/bannerApi";

export const getBannersAction = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const data: IBanner[] = await getBanners();

      dispatch({
        type: GET_BANNERS,
        payload: data,
      });
    } catch (error) {
      console.error("خطا در دریافت Banner:", error);
    }
  };
};
