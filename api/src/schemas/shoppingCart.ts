import { makeExecutableSchema, PubSub } from 'apollo-server';

const typeDefs = `
	type Item {
	    _id: String
	    code: String
	}

	type Cart {
		_id: String
		username: String
		items: [Item]
		total: Float
		status: Boolean
		processed: Boolean
		createdAt: String
		updatedAt: String
	}

	type Query {
		carts(data: InputCartNew): [Cart]
	}
	type Mutation {
		newCart(data: InputCartNew): Cart
		addItemToCart(data: InputCartItem): Cart
		delItemFromCart(data: InputCartItem): Cart
		calcCart(data: InputCartId): Cart
		delCart(data: InputCartId): Cart
	}

	input InputCartNew {
		_id: String
		username: String!
        status: Boolean
	}
	
    input InputCartItem {
		_id: String
		code: String
	}
	
    input InputCartId {
		_id: String!
	}
`;

const resolvers = {
	Query: {
		carts: async (_:any, { data }:any, { dataSources }:any) => {
			const carts = await dataSources.ShoppingCartDS.find(data || {});
			return carts;
		},
	},
	Mutation: {
		newCart: (_:any, { data }:any, { dataSources }:any) => {
			return dataSources.ShoppingCartDS.create(data);
		},
        addItemToCart: (_:any, data:any, { dataSources }:any) => {
            return dataSources.ShoppingCartDS.addItem(data);
        },
        delItemFromCart: (_:any, data:any, { dataSources }:any) => {
            return dataSources.ShoppingCartDS.delItem(data);
        },
        calcCart: (_:any, data:any, { dataSources }:any) => {
            return dataSources.ShoppingCartDS.calcCart(data);
        },
		delCart: (_:any, data:any,{ dataSources }:any) => {
			return dataSources.ShoppingCartDS.delete(data);
		}
	}
};

const ShoppingCartSchema = makeExecutableSchema({
  typeDefs, 
  resolvers
});

export default ShoppingCartSchema;