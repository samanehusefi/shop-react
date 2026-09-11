import { getAdminProducts } from "../../../Api/Admin/productsApi";
import type { AppDispatch } from "../../store";
import { GET_PRODUCTS } from "./actionType";

export const getProducts = () => async (dispatch: AppDispatch) => {
  try {
    const data = await getAdminProducts();

    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }
};