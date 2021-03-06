import { mergeSchemas } from 'apollo-server';
// Custom schemas
import ProductSchema from './product';
import ShoppingCartSchema from './shoppingCart';
import PromoRuleSchema from './promoRule';

const superSchema = mergeSchemas({
	schemas: [
		ProductSchema,
		ShoppingCartSchema,
		PromoRuleSchema
	]
});

export default superSchema;