import type { FooterState } from "../../Types/Footer/IFooter";

import {
  GET_FOOTER_FAILURE,
  GET_FOOTER_REQUEST,
  GET_FOOTER_SUCCESS,
} from "./actiontype";

const initialState: FooterState = {
  logo: null,
  applications: [],
  applicationsMobile: [],
  brands: [],
  mobileBrands: [],
  certificates: [],
  linkgroups: [],
  links: [],
  social: [],
  supports: [],
  about: null,
  contact: null,
  loading: false,
  error: null,
};

const footerReducer = (state = initialState, action: any): FooterState => {
  switch (action.type) {
    case GET_FOOTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_FOOTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };

    case GET_FOOTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default footerReducer;
