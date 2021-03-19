import axios from 'axios';

import { PRODUCT } from './types';
import { IAction } from '../interfaces';
import ApiUrl from '../utils/apiUrl';

const fetchProducts = ():IAction => {
	return (dispatch) => {
		const data = {
			query: "query GetProducts ($data: InputProduct) {products (data: $data) {_id,code,name,description,price,promos{promo}}}",
			variables: {data: {status: true}}
		};
		axios.post(ApiUrl,data)
			.then(({data}) => {
				let products = data.data.products || [];
				
				dispatch({
					type: PRODUCT.FETCH,
					payload: {
						products
					}
				});
			});
	}
}

const addProduct = (product):IAction => {
	return (dispatch) => {
		const data = {
			query: "mutation NewProduct ($data: InputProduct) {newProduct (data: $data) {_id,code,name,price,promos{promo}}}",
			variables: {data: product}
		};

		axios.post(ApiUrl, data)
			.then(({data}) => {
				let product = data.data.newProduct || null;

				if (product) {
					dispatch({
						type: PRODUCT.ADD,
						payload: {
							product
						}
					});
				}
			});
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

const delProduct = (_id):IAction => {
	return (dispatch) => {
		const data = {
			query: "mutation DelProduct ($data: InputProductId) {delProduct (data: $data) {_id,code,name}}",
			variables: {data: {
				_id
			}}
		};

		axios.post(ApiUrl, data)
			.then(({data}) => {
				let product = data.data.delProduct || null;

				if (product) {
					dispatch({
						type: PRODUCT.DELETE,
						payload: {
							_id
						}
					});
				}
			});

	}
}

export {
	fetchProducts,
	addProduct,
	updateProduct,
	delProduct
}