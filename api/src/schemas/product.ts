import { makeExecutableSchema, PubSub } from 'apollo-server';

const typeDefs = `
	type Product {
		_id: String
		code: String
		name: String
		price: Float
		status: Boolean
		createdAt: String
		updatedAt: String
	}

	type Query {
		products(data: InputProduct): [Product]
	}
	type Mutation {
		newProduct(data: InputProduct): Product
		updateProduct(data: InputProduct): Product
		delProduct(data: InputProductId): Product
	}

	input InputProduct {
		_id: String
		code: String
		name: String
		price: Float
		status: Boolean
	}
	
    input InputProductId {
		_id: String!
	}
`;

const resolvers = {
	Query: {
		products: async (_:any, { data }:any, { dataSources }:any) => {
			const products = await dataSources.ProductDS.find(data || {});
			return products;
		},
	},
	Mutation: {
		newProduct: (_:any, { data }:any, { dataSources }:any) => {
			return dataSources.ProductDS.create(data);
		},
        updateProduct: (_:any, data:any, { dataSources }:any) => {
            return dataSources.ProductDS.update(data);
        },
		delProduct: (_:any, data:any,{ dataSources }:any) => {
			return dataSources.ProductDS.delete(data);
		}
	}
};

const ProductSchema = makeExecutableSchema({
  typeDefs, 
  resolvers
});

export default ProductSchema;