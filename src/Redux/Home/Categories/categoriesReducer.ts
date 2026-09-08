import type { ICategory } from "../../../Types/Home/ICategory";

import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
} from "./actionType";

interface CategoriesState {
  categories: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: ICategory[] | string;
  },
): CategoriesState => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload as ICategory[],
        error: null,
      };

    case GET_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
