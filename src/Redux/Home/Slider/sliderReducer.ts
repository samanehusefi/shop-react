import type { ISlider } from "../../../Types/Home/ISlider";
import { GET_SLIDER } from "./actiontype";

interface SliderState {
  slider: ISlider[];
}

const initialState: SliderState = {
  slider: [],
};

const sliderReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: ISlider[];
  }
): SliderState => {
  switch (action.type) {
    case GET_SLIDER:
      return {
        ...state,
        slider: action.payload ?? [],
      };

    default:
      return state;
  }
};

export default sliderReducer;