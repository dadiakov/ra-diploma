/* eslint-disable no-unused-vars */
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/actionTypes';

const initialState = [];

export default function CartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART:
        const { id, qty, size } = action.payload;
        const index = state.findIndex(item => (item.id === id && item.size === size));
        if (index >= 0 ) {
            const newState = [...state];
            newState[index].qty = state[index].qty + qty;
            return newState;
        }
        return [...state, action.payload];
      case REMOVE_FROM_CART:
          const newState = [...state];
          const deleted = newState.splice(action.payload, 1);
          return newState;
      default:
        return state;
    }
  }