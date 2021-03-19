import axios from 'axios';

import { PROMO } from './types';
import { IAction } from '../interfaces';
import ApiUrl from '../utils/apiUrl';

const fetchPromos = ():IAction => {
	return (dispatch) => {
		const data = {
			query: "query GetPromos ($data: InputPromo) {promos (data: $data) {_id,promo,type,minPieces,maxPieces,value,validFrom,validTo}}",
			variables: {data: {status: true}}
		};
		axios.post(ApiUrl,data)
			.then(({data}) => {
				let promos = data.data.promos || [];
				
				dispatch({
					type: PROMO.FETCH,
					payload: {
						promos
					}
				});
			});
	}
}

const addPromo = (promo):IAction => {
	return (dispatch) => {
		const data = {
			query: "mutation NewPromo ($data: InputPromo) {newPromo (data: $data) {_id,promo,type,minPieces,maxPieces,value,validFrom,validTo}}",
			variables: {data: promo}
		};

		axios.post(ApiUrl, data)
			.then(({data}) => {
				if (data) {
					dispatch({
						type: PROMO.ADD,
						payload: {
							promo
						}
					});
				}
			});

	}
}

const updatePromo = (promo):IAction => {
	return {
		type: PROMO.UPDATE,
		payload: {
			promo
		}
	}
}

const delPromo = (id):IAction => {
	return {
		type: PROMO.DELETE,
		payload: {
			id
		}
	}
}

export {
	fetchPromos,
	addPromo,
	updatePromo,
	delPromo
}