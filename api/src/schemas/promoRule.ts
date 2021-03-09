import { makeExecutableSchema, PubSub } from 'apollo-server';

const typeDefs = `
	type Promo {
		_id: String
		promo: String
		type: String
		minPieces: Float
		maxPieces: Float
		value: Float
		validFrom: String
		validTo: String
		status: Boolean
		createdAt: String
		updatedAt: String
	}

	type Query {
		promos(data: InputPromo): [Promo]
	}
	type Mutation {
		newPromo(data: InputPromo): Promo
		updatePromo(data: InputPromo): Promo
		delPromo(data: InputPromoId): Promo
	}

	input InputPromo {
		_id: String
		promo: String
		type: String
		minPieces: Float
		maxPieces: Float
		value: Float
		validFrom: String
		validTo: String
	}
	
    input InputPromoId {
		_id: String!
	}
`;

const resolvers = {
	Query: {
		promos: async (_:any, { data }:any, { dataSources }:any) => {
			const promos = await dataSources.PromoRuleDS.find(data || {});
			return promos;
		},
	},
	Mutation: {
		newPromo: (_:any, { data }:any, { dataSources }:any) => {
			return dataSources.PromoRuleDS.create(data);
		},
        updatePromo: (_:any, { data }:any, { dataSources }:any) => {
            return dataSources.PromoRuleDS.update(data);
        },
		delPromo: (_:any, { data }:any, { dataSources }:any) => {
			return dataSources.PromoRuleDS.delete(data);
		}
	}
};

const PromoRuleSchema = makeExecutableSchema({
  typeDefs, 
  resolvers
});

export default PromoRuleSchema;