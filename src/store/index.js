import { createStore, combineReducers, applyMiddleware } from 'redux';
import ActiveCategorieReducer from '../reducers/ActiveCategorieReducer.js'
import SearchDataReducer from '../reducers/SearchDataReducer.js';

import thunk from 'redux-thunk';

const reducer = combineReducers({
  activeCategorieReducer: ActiveCategorieReducer,
  searchDataReducer: SearchDataReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);
export default store;
