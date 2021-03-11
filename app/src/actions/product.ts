import axios from 'axios';

import { PRODUCT } from './types';
import { IAction } from '../interfaces';
import ApiUrl from '../utils/apiUrl';

const fetchProducts = ():IAction => {
	return (dispatch) => {
		const data = {
			query: 'query GetProducts ($data: InputProduct) {products (data: $data) {_id,code,name,price,promos{promo},status,createdAt,updatedAt}',
			variables: '{"data": {"status": true}}'
		};
		return axios.post(ApiUrl, data)
			.then((res) => {
				dispatch({
					type: PRODUCT.FETCH,
					payload: {
						products: res.data
					}
				});
			});
	}
}

const addProduct = (product):IAction => {
	return {
		type: PRODUCT.ADD,
		payload: {
			product
		}
	}
}

const updateProduct = (product):IAction => {
	return {
		type: PRODUCT.UPDATE,
		payload: {
			product
		}
	}
}

const delProduct = (id):IAction => {
	return {
		type: PRODUCT.DELETE,
		payload: {
			id
		}
	}
}

export {
	fetchProducts,
	addProduct,
	updateProduct,
	delProduct
}