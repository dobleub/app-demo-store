import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions } from '../../actions';

import Product from '../Product';
import AddProduct from '../AddProduct';

import styles from './styles.module.scss';

function RenderProducts({ products }):JSX.Element {
	if (products.length === 0) {
		return <Fragment> <Product /> </Fragment>;
	} else {
		return <Fragment> {
			products.map((item, idx) => <Product key={item.code} idx={idx} product={item} /> )
		} </Fragment>
	}
}

const ProductList = ({ products, productActions }):JSX.Element => {
	useEffect(() => {
		productActions.fetchProducts();
	}, []);
	console.log('products', products);
	return (
		<section className={styles.ProductList}>
			<RenderProducts products={products} />
			<AddProduct />
		</section>
	);
};

const mapStateToProps = (state) => ({
	products: state.products
});
const mapDispatchToProps = (dispatch) => ({
	productActions: bindActionCreators(productActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);