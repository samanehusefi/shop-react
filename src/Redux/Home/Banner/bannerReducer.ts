import type { IBanner } from "../../../Types/Home/IBanner";
import { GET_BANNERS } from "./actiontype";

interface BannerState {
  banners: IBanner[];
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  banners: [],
  loading: false,
  error: null,
};

const bannerReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: IBanner[];
  },
): BannerState => {
  switch (action.type) {
    case GET_BANNERS:
      return {
        ...state,
        banners: action.payload as IBanner[],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default bannerReducer;
