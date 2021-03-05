import { DataSource } from 'apollo-datasource';
import Product from '../models/product';
import { isset } from '../utils/index';

class ProductDS extends DataSource {
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
			if (isset(data.status)) {
				match.status = data.status;
			} else {
				match.status = true;
			}
		}
		if (isset(data.code)) {
			match.code = data.code;
		}
		if (isset(data.name)) {
			match.name = new RegExp(data.name, 'i');
		}
		if (isset(data.price)) {
			match.price = data.price;
		}
		return await Product.find(match).sort({_id: -1});
	}

	async create(data:any) {
		var newProduct = new Product(data);
		let saved = await newProduct.save();

		return isset(saved._id) ? saved : null;
	}

    async update(data: any) {
        if (isset(data._id)) {
            return Product.findOne({ _id: data._id })
                .then(async (product: any) => {
                    if (product) {
                        if (isset(data.code)) {
                            product.code = data.code;
                        }
                        if (isset(data.name)) {
                            product.name = data.name;
                        }
                        if (isset(data.price)) {
                            product.price = data.price;
                        }
                        
                        product.updatedAt = new Date();
                        await product.save();
                    }
                    return product ? product : null;
                });
        } else {
            return null;
        }
    }

	async delete(data:any) {
		if (isset(data._id)) {
			return Product.findOne({_id: data._id, status: true})
				.then(async (product:any) => {
					const tmpProduct = product;
					if (product) {
						// product.remove();
						product.status = false;
						product.deletedAt = new Date();
						await product.save();
					}
					return product ? tmpProduct : null;
				});
		} else {
			return null;
		}
	}
}

export default ProductDS;