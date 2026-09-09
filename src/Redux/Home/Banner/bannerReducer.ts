import type { IBanner } from "../../../Types/Home/IBanner";

import {
  GET_BANNERS_REQUEST,
  GET_BANNERS_SUCCESS,
  GET_BANNERS_FAILURE,
} from "./actiontype";

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
    payload?: IBanner[] | string;
  },
): BannerState => {
  switch (action.type) {
    case GET_BANNERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BANNERS_SUCCESS:
      return {
        ...state,
        banners: action.payload as IBanner[],
        loading: false,
        error: null,
      };

    case GET_BANNERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};

export default bannerReducer;
