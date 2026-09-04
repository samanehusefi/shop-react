import type { ICircleBadge } from "../../../Types/Home/ICircleBadge";

import { GET_CIRCLE_BADGE } from "./actiontype";

interface CircleBadgeState {
  circleBadge: ICircleBadge[];
}

const initialState: CircleBadgeState = {
  circleBadge: [],
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
        circleBadge: action.payload ?? [],
      };

    default:
      return state;
  }
};

export default circleBadgeReducer;
