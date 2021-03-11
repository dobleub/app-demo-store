import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions } from '../../actions';

import styles from './styles.module.scss';

function RenderProducts({ products }):JSX.Element {
	if (products.length === 0) {
		return <div>No products</div>;
	} else {
		return <div>
			{products.map((item, idx) => <div key={idx}>{item.code} - {item.name} - {item.price}</div>)}
		</div>
	}
}

const Product = ({ products, productActions }):JSX.Element => {
	useEffect(() => {
		productActions.fetchProducts();
	}, []);
	console.log('products', products);
	return (
		<section className={styles.ProductList}>
			<RenderProducts products={products} />
		</section>
	);
};

const mapStateToProps = (state) => ({
	products: state.products
});
const mapDispatchToProps = (dispatch) => ({
	productActions: bindActionCreators(productActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);