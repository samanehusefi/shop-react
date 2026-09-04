import type { UnknownAction } from "redux";

import { SET_SEARCH_TEXT, CLEAR_SEARCH } from "./actiontype";

interface SearchState {
  text: string;
}

const initialState: SearchState = {
  text: "",
};

interface SearchAction extends UnknownAction {
  payload?: string;
}

const searchReducer = (
  state = initialState,
  action: SearchAction,
): SearchState => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return {
        ...state,
        text: action.payload ?? "",
      };

    case CLEAR_SEARCH:
      return {
        ...state,
        text: "",
      };

    default:
      return state;
  }
};

export default searchReducer;
