import { Schema, model } from 'mongoose';

const ProductSchema = new Schema({
	code: {
        type: String,
        unique: true,
        required: true,
        dropDups: true
    },
	name: String,
	price: Number,
	promos: [new Schema ({promo: String})],
	status: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	},
	deletedAt: Date
});

const Product = model('products', ProductSchema);

export default Product;