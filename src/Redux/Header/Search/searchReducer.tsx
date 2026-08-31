import {
  SET_SEARCH_TEXT,
  CLEAR_SEARCH
} from "./actiontype";

interface SearchState{
  text:string;
}

const initialState:SearchState = {
  text: "",
};

const searchReducer = (state = initialState, action: any) :SearchState=> {
  switch (action.type) {
    case SET_SEARCH_TEXT:return{...state,text:action.payload}
    case CLEAR_SEARCH:return{...state,text:""}
    default:
      return state;
  }
};

export default searchReducer;
