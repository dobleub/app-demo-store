import { DataSource } from 'apollo-datasource';
import ShoppingCart from '../models/shoppingCart';
import PromoRule from '../models/promoRule';
import Product from '../models/product';
import { isset } from '../utils/index';

class ShoppingCartDS extends DataSource {
	data: any;
	context: any;

	constructor(data:any = {}) {
		super();
		this.data = data;
	}
	initialize(config:any) {
		this.context = config.context;
	}

	async find(data:any) {
		var match:any = {};
		if (isset(data._id)) {
			match._id = data._id;
		} else {
			if (isset(data.username)) {
				match.username = data.username;
				match.status = isset(data.status) ? data.status : true;
			}
		}
		return await ShoppingCart.find(match).sort({_id: -1});
	}

	async create(data:any) {
		var sc = new ShoppingCart(data);
		let saved = await sc.save();

		return isset(saved._id) ? saved : null;
	}

    async addItem(data: any) {
        if (isset(data._idCart) && isset(data.itemCode)) {
            return ShoppingCart.findOne({ _id: data._idCart })
                .then(async (sc: any) => {
					let tmpItem = await Product.findOne({ code: data.itemCode });

                    if (sc && tmpItem) {
                        sc.items.push({code: data.itemCode});
                        
                        sc.updatedAt = new Date();
                        await sc.save();
                    }
                    return sc ? sc : null;
                });
        } else {
            return null;
        }
    }
    
    async delItem(data: any) {
        if (isset(data._idCart) && isset(data.itemCode)) {
            return ShoppingCart.findOne({ _id: data._idCart })
                .then(async (sc: any) => {
					let tmpItem = await Product.findOne({ code: data.itemCode });

					if (sc && tmpItem) {
                        sc.items.id(data.itemCode).remove();
                        
                        sc.updatedAt = new Date();
                        await sc.save();
                    }
                    return sc ? sc : null;
                });
        } else {
            return null;
        }
    }

    async calcCart(data: any) {
        if (isset(data._id)) {
            return ShoppingCart.findOne({ _id: data._id })
                .then(async (sc: any) => {
                	if (sc) {
                		let total:any = {};
						let scCount:any = {};
						let tmpCodes:any = [];
						let tmpItems:[string] = sc.items.map(({code}:any) => code);
						// Find products and promos
						let tmpProducts:any = await Product.find({ code: {'$in': [...new Set(tmpItems)] }});
						tmpProducts.map(({promos}:any) => {
							tmpCodes = [...(tmpCodes ? tmpCodes : []), ...(promos ? promos.map(({promo}:any) => promo ) : [])];
						});
						let tmpPromos:any = await PromoRule.find({ promo: {'$in':  [...new Set(tmpCodes)] }});
						
						// Check how many items are in shopping cart
						tmpItems.map((i:any) => {
							scCount[i] = typeof scCount[i] == 'undefined' ? 1 : scCount[i] + 1;
						});
						
						// Validate if cart has min items for activate promo
						tmpProducts.map((product:any) => {
							let nItems = scCount[product.code];
							let nPromos = product.promos.map(({promo}:any) => promo );

							tmpPromos.map((promo:any) => {
								if (nPromos.includes(promo.promo) && nItems >= promo.minPieces) {
									// Logic for discount promo
									if (promo.type == 'promo') {
										total[product.code] = (nItems - promo.value) * product.price;
									} else if (promo.type == 'mayority') {
										total[product.code] = nItems * (product.price  - promo.value);
									}
								} else {
									// When no discount
									if (typeof total[product.code] == 'undefined') {
										total[product.code] = nItems * product.price;
									}
								}
							});
						});
						
						sc.total = Object.values(total).reduce((inc:any, next:any):number => (inc ? inc : 0) + (next ? next : 0));
						sc.save();
						return sc ? sc : null;
                	} else {
                		return null;
                	}
                });
        } else {
            return null;
        }
    }

	async delete(data:any) {
		if (isset(data._id)) {
			return ShoppingCart.findOne({_id: data._id, status: true})
				.then(async (sc:any) => {
					const tmpSc = sc;
					if (sc) {
						// sc.remove();
						sc.status = false;
						sc.deletedAt = new Date();
						await sc.save();
					}
					return tmpSc ? sc : null;
				});
		} else {
			return null;
		}
	}
}

export default ShoppingCartDS;