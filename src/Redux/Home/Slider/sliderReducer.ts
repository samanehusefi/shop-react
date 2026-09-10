import type { ISlider } from "../../../Types/Home/ISlider";
import { GET_SLIDER } from "./actiontype";

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
    payload?: ISlider[];
  },
): SliderState => {
  switch (action.type) {
    case GET_SLIDER:
      return {
        ...state,
        slider: action.payload as ISlider[],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default sliderReducer;
