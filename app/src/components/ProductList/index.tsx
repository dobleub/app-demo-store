import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions, promoActions } from '../../actions';

import Product from '../Product';
import AddProduct from '../AddProduct';

import styles from './styles.module.scss';

function RenderProducts({ products }):JSX.Element {
	if (products.length === 0) {
		return <Fragment> <Product /> </Fragment>;
	} else {
		return <Fragment> {
			products.map((item, idx) => <Product key={item._id} idx={idx} product={item} /> )
		} </Fragment>
	}
}

const ProductList = ({ products, productActions, promoActions }):JSX.Element => {
	useEffect(() => {
		productActions.fetchProducts();
		promoActions.fetchPromos();
	}, []);
	
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
	productActions: bindActionCreators(productActions, dispatch),
	promoActions: bindActionCreators(promoActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);