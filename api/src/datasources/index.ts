import ProductDS from './product';
import ShoppingCartDS from './shoppingCart'

const dataSources = {
	ProductDS: new ProductDS(),
	ShoppingCartDS: new ShoppingCartDS()
};

export default dataSources;