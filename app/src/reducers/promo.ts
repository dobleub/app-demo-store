import { PROMO } from '../actions/types';
import { IAction } from '../interfaces';

const initialState = [];

const promoReducer = (state = initialState, action:IAction) => {
	switch(action.type) {
		case PROMO.FETCH:
			return [
				...action.payload.promos
			]
			
		case PROMO.ADD:
			return [
				...state,
				action.payload.promo
			];

		case PROMO.DELETE:
			return state.filter(item => item.id !== action.payload.id);
			
		default: 
			return state;
		
	}
}

export default promoReducer;