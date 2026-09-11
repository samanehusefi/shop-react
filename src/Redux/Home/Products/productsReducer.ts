import type { IProduct } from "../../../Types/Home/IProduct";
import { GET_PRODUCTS } from "./actionType";

interface ProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsReducer = (
  state = initialState,
  action: {
    type: string;
    payload?: IProduct[];
  },
): ProductsState => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload as IProduct[],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export default productsReducer;