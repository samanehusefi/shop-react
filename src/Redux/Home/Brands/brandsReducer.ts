import type { IBrand } from "../../../Types/Home/IBrand";

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

interface BrandsState {
  brands: IBrand[];
  loading: boolean;
  error: string | null;
}

const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};

const brandsReducer = (state = initialState, action: any): BrandsState => {
  switch (action.type) {
    case GET_BRANDS_REQUEST:
    case CREATE_BRAND_REQUEST:
    case UPDATE_BRAND_REQUEST:
    case DELETE_BRAND_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: Array.isArray(action.payload) ? action.payload : [],
      };

    case CREATE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: [...state.brands, action.payload],
      };

    case UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: state.brands.map((brand) =>
          brand.id === action.payload.id ? action.payload : brand,
        ),
      };

    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: state.brands.filter((brand) => brand.id !== action.payload),
      };

    case GET_BRANDS_FAILURE:
    case CREATE_BRAND_FAILURE:
    case UPDATE_BRAND_FAILURE:
    case DELETE_BRAND_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default brandsReducer;
