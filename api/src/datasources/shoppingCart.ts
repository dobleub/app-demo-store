import { DataSource } from 'apollo-datasource';
import ShoppingCart from '../models/shoppingCart';
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
        if (isset(data._id) && isset(data.itemCode)) {
            return ShoppingCart.findOne({ _id: data._id })
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
        if (isset(data._id) && isset(data.itemCode)) {
            return ShoppingCart.findOne({ _id: data._id })
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