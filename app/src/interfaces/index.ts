interface IAction {
	type: string,
	payload: any
}
interface IPromoCode {
	_id?: string,
	promo: string
} 
interface IProduct {
	_id?: string,
	code: string
	name: string,
	price: number,
	promos: IPromoCode[],
	status: boolean,
	createdAt: string,
	updatedAt: string,
	deletedAt: string
}
interface IPromo {
	_id?: string
	promo: string,
    type: string,
	minPieces: number,
	maxPieces: number,
	value: number,
	validFrom: string,
	validTo?: string,
	status: boolean,
	createdAt: string,
	updatedAt: string,
	deletedAt: string
}
interface ICode {
	_id?: string,
	code: string
} 
interface ICart {
	_id?: string,
	username: string,
	items: ICode[],
	total: number,
	status: boolean,
	processed: boolean,
	createdAt: string,
	updatedAt: string,
	deletedAt: string
}

export {
	IAction,
	IPromoCode,
	IProduct,
	IPromo,
	ICode,
	ICart
}