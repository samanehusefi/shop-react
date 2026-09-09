import type { ISlider } from "../../../Types/Home/ISlider";

import {
  GET_SLIDER_REQUEST,
  GET_SLIDER_SUCCESS,
  GET_SLIDER_FAILURE,
} from "./actiontype";

interface SliderState {
  slider: ISlider[];
  loading: boolean;
  error: string | null;
}

const initialState: SliderState = {
  slider: [],
  loading: false,
  error: null,
};

const sliderReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: ISlider[] | string;
  },
): SliderState => {
  switch (action.type) {
    case GET_SLIDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SLIDER_SUCCESS:
      return {
        ...state,
        slider: action.payload as ISlider[],
        loading: false,
        error: null,
      };

    case GET_SLIDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};

export default sliderReducer;
