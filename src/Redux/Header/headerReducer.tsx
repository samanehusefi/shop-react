import type { IHeaderData } from "../../Types/Header/IHeader";

import {
  FETCH_HEADER_REQUEST,
  FETCH_HEADER_SUCCESS,
  FETCH_HEADER_FAILURE,
} from "./actiontype";

interface HeaderState {
  data: IHeaderData | null;
  loading: boolean;
  error: unknown;
}

const initialState: HeaderState = {
  data: null,
  loading: false,
  error: null,
};

const headerReducer = (state = initialState, action: any): HeaderState => {
  switch (action.type) {
    case FETCH_HEADER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_HEADER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_HEADER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default headerReducer;
