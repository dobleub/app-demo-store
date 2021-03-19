import { combineReducers } from 'redux';

import productReducer from './product';
import cartReducer from './cart';
import promoReducer from './promo';

const appReducers = combineReducers({
	products: productReducer,
	cart: cartReducer,
	promos: promoReducer
});

export default appReducers;