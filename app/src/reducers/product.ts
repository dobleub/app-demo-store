import { PRODUCT } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = [];

const productReducer = (state = initialState, action:IAction) => {
	switch(action.type) {
		case PRODUCT.FETCH:
			return [
				...action.payload.products
			]
			
		case PRODUCT.ADD:
			return [
				...state,
				action.payload.product
			];

		case PRODUCT.DELETE:
			return state.filter(item => item.id !== action.payload.id);
			
		default: 
			return state;
		
	}
}

export default productReducer;