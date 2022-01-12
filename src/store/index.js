import { createStore, combineReducers, applyMiddleware } from 'redux';
import ActiveCategorieReducer from '../reducers/ActiveCategorieReducer.js'
import SearchDataReducer from '../reducers/SearchDataReducer.js';
import ItemToBuyReducer from '../reducers/ItemToBuyReducer.js';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  activeCategorieReducer: ActiveCategorieReducer,
  searchDataReducer: SearchDataReducer,
  itemToBuyReducer: ItemToBuyReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
export default store;
