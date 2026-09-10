import { getAdminBanners } from "../../../Api/Admin/bannerApi";
import type { AppDispatch } from "../../store";
import { GET_BANNERS } from "./actiontype";

export const getBanners = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminBanners();

    dispatch({
      type: GET_BANNERS,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت بنرها:", error);
  }
};
