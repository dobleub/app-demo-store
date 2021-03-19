import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions, cartActions } from '../../actions';

import styles from './styles.module.scss';


const Product = ({product, cart, productActions, cartActions}) => {
  return (
  	<Fragment>
  		{ product ? 
		    <div className={styles.Product} data-id={product.code}>
		    	<div className={styles.Close}> <div>
			    		<div onClick={() => cartActions.addToCart(product)}> <span>+</span> </div>
			    		<div onClick={() => productActions.delProduct(product._id)}> <span>x</span> </div> 
		    	</div> </div>
		    	<div className={styles.Title}>{product.name}</div>
		    	<div className={styles.Desc}>{product.description}</div>
		    	<div className={styles.Price}>{product.price}</div>
		    </div>
	    :
			<div className={styles.Product}>
		    	<div className={styles.NoProducts}>No products</div>
		    </div>
		}
	</Fragment>
  );
};

const mapStateToProps = (state) => ({
	cart: state.cart
});
const mapDispatchToProps = (dispatch) => ({
	productActions: bindActionCreators(productActions, dispatch),
	cartActions: bindActionCreators(cartActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);