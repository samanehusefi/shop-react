import type { IAmazing } from "../../../Types/Home/IAmazing";

import { GET_AMAZING } from "./actiontype";

interface AmazingState {
  amazing: IAmazing[];
}

const initialState: AmazingState = {
  amazing: [],
};

const amazingReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: IAmazing[];
  },
): AmazingState => {
  switch (action.type) {
    case GET_AMAZING:
      return {
        ...state,
        amazing: action.payload ?? [],
      };

    default:
      return state;
  }
};

export default amazingReducer;
