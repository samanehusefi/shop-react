import { getHeader } from "../../Api/Header/headerApi";
import type { AppDispatch } from "../store";

import {
  FETCH_HEADER_REQUEST,
  FETCH_HEADER_SUCCESS,
  FETCH_HEADER_FAILURE,
} from "./actiontype";

export const fetchHeader = () => {
  return async (dispatch: AppDispatch) => {
    console.log("FETCH HEADER ACTION");

    dispatch({
      type: FETCH_HEADER_REQUEST,
    });

    try {
      const data = await getHeader();

      console.log("HEADER API DATA:", data);

      dispatch({
        type: FETCH_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("HEADER API ERROR:", error);

      dispatch({
        type: FETCH_HEADER_FAILURE,
        payload: error,
      });
    }
  };
};
