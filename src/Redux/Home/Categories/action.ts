import { getAdminCategories } from "../../../Api/Admin/categoriesApi";
import type { AppDispatch } from "../../store";
import { GET_CATEGORIES, GET_CATEGORIES_ERROR } from "./actionType";

export const getCategoriesAction = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminCategories();

    dispatch({
      type: GET_CATEGORIES,
      payload: data,
    });

    return data;
  } catch (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);

    dispatch({
      type: GET_CATEGORIES_ERROR,
      payload:
        error instanceof Error ? error.message : "خطا در دریافت دسته‌بندی‌ها",
    });

    throw error;
  }
};
