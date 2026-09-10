import type { ICircleBadge } from "../../../Types/Home/ICircleBadge";
import { GET_CIRCLE_BADGE } from "./actiontype";

interface CircleBadgeState {
  circleBadge: ICircleBadge[];
  loading: boolean;
  error: string | null;
}

const initialState: CircleBadgeState = {
  circleBadge: [],
  loading: false,
  error: null,
};

const circleBadgeReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: ICircleBadge[];
  },
): CircleBadgeState => {
  switch (action.type) {
    case GET_CIRCLE_BADGE:
      return {
        ...state,
        circleBadge: action.payload as ICircleBadge[],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default circleBadgeReducer;
