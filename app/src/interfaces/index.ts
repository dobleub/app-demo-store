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
	description: string,
	price: number,
	promos?: IPromoCode[],
	status: boolean
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
	status: boolean
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
	processed: boolean
}

export {
	IAction,
	IPromoCode,
	IProduct,
	IPromo,
	ICode,
	ICart
}