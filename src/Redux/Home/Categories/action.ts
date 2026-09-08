import type { AppDispatch } from "../../store";

import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./actionType";

import { getCategories } from "../../../Api/Home/Categories/CategoriesApi";

export const getCategoriesAction = () => async (dispatch: AppDispatch) => {
  dispatch({
    type: GET_CATEGORIES_REQUEST,
  });

  try {
    const data = await getCategories();

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_FAILURE,
      payload:
        error instanceof Error ? error.message : "خطا در دریافت دسته‌بندی‌ها",
    });
  }
};
