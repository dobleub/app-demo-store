import { CART } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = {
	items: []
};

const cartReducer = (state = initialState, action:IAction) => {
	switch(action.type) {
		case CART.FETCH:
			return state;
			
		case CART.ADD:
			return {
				...state,
				items: [
					...state.items,
					action.payload.item
				]
			};

		case CART.DELETE:
			return state.items.filter(item => item._id !== action.payload._id);
			
		default: 
			return state;
		
	}
}

export default cartReducer;