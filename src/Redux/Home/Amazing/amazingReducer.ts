import type { IAmazing } from "../../../Types/Home/IAmazing";

import { GET_AMAZING } from "./actiontype";

interface AmazingState {
  amazing: IAmazing[];
  loading: boolean;
  error: string | null;
}

const initialState: AmazingState = {
  amazing: [],
  loading: false,
  error: null,
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
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default amazingReducer;
