import type { ICategory } from "../../../Types/Home/ICategory";
import { GET_CATEGORIES, GET_CATEGORIES_ERROR } from "./actionType";

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
    case GET_CATEGORIES:
      return {
        ...state,
        categories: (action.payload as ICategory[]) ?? [],
        loading: false,
        error: null,
      };

    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        categories: [],
        loading: false,
        error: action.payload as string,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
