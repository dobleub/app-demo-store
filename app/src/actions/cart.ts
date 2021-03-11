import { CART } from './types';
import { IAction } from '../interfaces';

const fetchCart = (cart):IAction => {
	return {
		type: CART.FETCH,
		payload: {
			cart
		}
	}
}

const addToCart = (item):IAction => {
	return {
		type: CART.ADD,
		payload: {
			item
		}
	}
}

const updateFromCart = (item):IAction => {
	return {
		type: CART.UPDATE,
		payload: {
			item
		}
	}
}

const delFromCart = (id):IAction => {
	return {
		type: CART.DELETE,
		payload: {
			id
		}
	}
}

export {
	fetchCart,
	addToCart,
	updateFromCart,
	delFromCart
}