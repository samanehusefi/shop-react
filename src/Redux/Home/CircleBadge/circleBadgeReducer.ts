import type { ICircleBadge } from "../../../Types/Home/ICircleBadge";

import {
  GET_CIRCLE_BADGE_FAILURE,
  GET_CIRCLE_BADGE_REQUEST,
  GET_CIRCLE_BADGE_SUCCESS,
} from "./actiontype";

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
    payload?: ICircleBadge[] | string;
  },
): CircleBadgeState => {
  switch (action.type) {
    case GET_CIRCLE_BADGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CIRCLE_BADGE_SUCCESS:
      return {
        ...state,
        circleBadge: action.payload as ICircleBadge[],
        loading: false,
        error: null,
      };

    case GET_CIRCLE_BADGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};

export default circleBadgeReducer;
