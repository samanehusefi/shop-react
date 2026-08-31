import { SET_SEARCH_TEXT, CLEAR_SEARCH } from "./actiontype";

export const setSearchText = (text: string) => ({
  type: SET_SEARCH_TEXT,
  payload: text,
});

export const cleareSearch = () => ({
  type: CLEAR_SEARCH,
});
