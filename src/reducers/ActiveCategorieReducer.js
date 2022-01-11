import { SET_ACTIVE_CATEGORIE } from '../actions/actionTypes';

const initialState = 'All';

export default function ActiveCategorieReducer(state = initialState, action) {
    switch (action.type) {
      case SET_ACTIVE_CATEGORIE:
        return action.payload;
      default:
        return state;
    }
  }