import ProductDS from './product';
import ShoppingCartDS from './shoppingCart'
import PromoRuleDS from './promoRule'

const dataSources = {
	ProductDS: new ProductDS(),
	ShoppingCartDS: new ShoppingCartDS(),
	PromoRuleDS: new PromoRuleDS()
};

export default dataSources;