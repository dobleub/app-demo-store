import { Schema, model } from 'mongoose';

/*
	promo: '2+1'			promo: '3t',			promo: '-10%'
	type: promo,			type: mayority,			type: discount,
	minPieces: 2,			minPieces: 3,			minPieces: 0,
	maxPieces: null,		maxPieces: null,		maxPieces: null,
	value: 1,				value: 19.00,			value: 0.10,
	validFrom: now,			validFrom: now,			validFrom: now,
	validTo: null,			validTo: null,			validTo: null,
	status: true			status: true			status: true
 */

const PromoRuleSchema = new Schema({
    promo: {
    	type: String,
    	unique: true,
    	required: true,
    	dropDups: true
    },
    type: String,
	minPieces: {
		type: Number,
		required: true
	},
	maxPieces: Number,
	value: {
		type: Number,
		required: true
	},
	validFrom: {
		type: Date,
		default: Date.now
	},
	validTo: Date,
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

const PromoRule = model('promoRules', PromoRuleSchema);

export default PromoRule;