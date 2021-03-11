import { CART } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = [];

const cartReducer = (state = initialState, action:IAction) => {
	switch(action.type) {
		case CART.FETCH:
			return state;
			
		case CART.ADD:
			return [
				action.payload.item,
				...state
			];

		case CART.DELETE:
			return state.filter(item => item.id !== action.payload.id);
			
		default: 
			return state;
		
	}
}

export default cartReducer;