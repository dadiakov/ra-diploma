import { SET_ITEM_TO_BUY } from '../actions/actionTypes';

const initialState = {};

export default function ItemToBuyReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ITEM_TO_BUY:
        return {...state, ...action.payload};
      default:
        return state;
    }
  }