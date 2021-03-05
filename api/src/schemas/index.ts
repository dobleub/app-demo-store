import { mergeSchemas } from 'apollo-server';
// Custom schemas
import ProductSchema from './product';
import ShoppingCartSchema from './shoppingCart';

const superSchema = mergeSchemas({
	schemas: [
		ProductSchema,
		ShoppingCartSchema
	]
});


export default superSchema;