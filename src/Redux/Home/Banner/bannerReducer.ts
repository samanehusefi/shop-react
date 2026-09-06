import type { IBanner } from "../../../Types/Home/IBanner";
import { GET_BANNERS } from "./actiontype";

interface BannerState {
  banners: IBanner[];
}

const initialState: BannerState = {
  banners: [],
};

const bannerReducer = (
  state = initialState,
  action: { type: string; payload?: IBanner[] }
): BannerState => {
  switch (action.type) {
    case GET_BANNERS:
      return {
        ...state,
        banners: action.payload ?? [],
      };

    default:
      return state;
  }
};

export default bannerReducer;