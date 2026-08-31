import { getHeader } from "../../Services/headerService";
import {
  FETCH_HEADER_REQUEST,
  FETCH_HEADER_SUCCESS,
  FETCH_HEADER_FAILURE,
} from "./actiontype";
export const fetchHeader = () => {
  return async (dispatch: any) => {
    dispatch({
      type: FETCH_HEADER_REQUEST,
    });

    try {
      const data = await getHeader();

      dispatch({
        type: FETCH_HEADER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_HEADER_FAILURE,
        payload: error,
      });
    }
  };
};