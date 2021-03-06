import { DataSource } from 'apollo-datasource';
import PromoRule from '../models/promoRule';
import { isset } from '../utils/index';

class PromoRuleDS extends DataSource {
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
		if (isset(data.promo)) {
			match.promo = data.promo;
		}
		if (isset(data.type)) {
			match.type = new RegExp(data.type, 'i');
		}
		return await PromoRule.find(match).sort({_id: -1});
	}

	async create(data:any) {
		var newProduct = new PromoRule(data);
		let saved = await newProduct.save();

		return isset(saved._id) ? saved : null;
	}

    async update(data: any) {
        if (isset(data._id)) {
            return PromoRule.findOne({ _id: data._id })
                .then(async (promo: any) => {
                    if (promo) {
                        if (isset(data.promo)) {
                            promo.promo = data.promo;
                        }
                        if (isset(data.type)) {
                            promo.type = data.type;
                        }
                        if (isset(data.minPieces)) {
                            promo.minPieces = data.minPieces;
                        }
                        if (isset(data.maxPieces)) {
                            promo.maxPieces = data.maxPieces;
                        }
                        if (isset(data.value)) {
                            promo.value = data.value;
                        }
                        if (isset(data.validFrom)) {
                            promo.validFrom = data.validFrom;
                        }
                        if (isset(data.validTo)) {
                            promo.validTo = data.validTo;
                        }
                        
                        promo.updatedAt = new Date();
                        await promo.save();
                    }
                    return promo ? promo : null;
                });
        } else {
            return null;
        }
    }

	async delete(data:any) {
		if (isset(data._id)) {
			return PromoRule.findOne({_id: data._id, status: true})
				.then(async (promo:any) => {
					const tmpPromo = promo;
					if (promo) {
						// promo.remove();
						promo.status = false;
						promo.deletedAt = new Date();
						await promo.save();
					}
					return promo ? tmpPromo : null;
				});
		} else {
			return null;
		}
	}
}

export default PromoRuleDS;