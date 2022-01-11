import { SET_SEARCH_DATA } from '../actions/actionTypes';

const initialState = '';

export default function SearchDataReducer(state = initialState, action) {
    switch (action.type) {
      case SET_SEARCH_DATA:
        return action.payload;
      default:
        return state;
    }
  }