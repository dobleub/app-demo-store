import { combineReducers } from 'redux';

import productReducer from './product';
import cartReducer from './cart';

const appReducers = combineReducers({
	products: productReducer,
	cart: cartReducer,
});

export default appReducers;