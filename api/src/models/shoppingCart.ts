import { Schema, model } from 'mongoose';

const ShoppingCartSchema = new Schema({
    username: String,
	items: [new Schema ({code: String})],
	total: {
        type: Number,
        default: 0
    },
	status: {
		type: Boolean,
		default: true
	},
	processed: {
		type: Boolean,
		default: false
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

const ShoppingCart = model('shoppingCarts', ShoppingCartSchema);

export default ShoppingCart;