import {
  getAdminBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} from "../../../Api/Admin/brandsApi";

import type { AppDispatch } from "../../store";

import {
  GET_BRANDS_REQUEST,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAILURE,
  CREATE_BRAND_REQUEST,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAILURE,
  UPDATE_BRAND_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAILURE,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAILURE,
} from "./actiontype";

import type { IBrand } from "../../../Types/Home/IBrand";

export const getBrands = () => async (dispatch: AppDispatch) => {
  dispatch({ type: GET_BRANDS_REQUEST });

  try {
    const data = await getAdminBrands();

    dispatch({
      type: GET_BRANDS_SUCCESS,
      payload: Array.isArray(data) ? data : [],
    });
  } catch (error) {
    console.error("خطا در دریافت برندها:", error);

    dispatch({
      type: GET_BRANDS_FAILURE,
      payload: "خطا در دریافت برندها",
    });
  }
};

export const addBrand =
  (brand: Omit<IBrand, "id">) => async (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_BRAND_REQUEST });

    try {
      const data = await createBrand(brand);

      dispatch({
        type: CREATE_BRAND_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("خطا در ایجاد برند:", error);

      dispatch({
        type: CREATE_BRAND_FAILURE,
        payload: "خطا در ایجاد برند",
      });

      throw error;
    }
  };

export const editBrand =
  (id: IBrand["id"], brand: Partial<Omit<IBrand, "id">>) =>
  async (dispatch: AppDispatch) => {
    dispatch({ type: UPDATE_BRAND_REQUEST });

    try {
      const data = await updateBrand(id, brand);

      dispatch({
        type: UPDATE_BRAND_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error) {
      console.error("خطا در ویرایش برند:", error);

      dispatch({
        type: UPDATE_BRAND_FAILURE,
        payload: "خطا در ویرایش برند",
      });

      throw error;
    }
  };

export const removeBrand =
  (id: IBrand["id"]) => async (dispatch: AppDispatch) => {
    dispatch({ type: DELETE_BRAND_REQUEST });

    try {
      await deleteBrand(id);

      dispatch({
        type: DELETE_BRAND_SUCCESS,
        payload: id,
      });
    } catch (error) {
      console.error("خطا در حذف برند:", error);

      dispatch({
        type: DELETE_BRAND_FAILURE,
        payload: "خطا در حذف برند",
      });

      throw error;
    }
  };
