import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { cartActions } from '../../actions';

import styles from './styles.module.scss';

function RenderItems({ cart }):JSX.Element {
	if (cart.items.length === 0) {
		return <div>No Items</div>;
	} else {
		return <div>
			{cart.items.map((item, idx) => <div key={idx}>{item.name} - {item.price}</div>)}
		</div>
	}
}

const Cart = ({ cart, cartActions }):JSX.Element => {
	
	useEffect(() => {
		cartActions.fetchCart();
	}, []);
	
	return (
		<section className={styles.Cart}>
			<RenderItems cart={cart} />
		</section>
	);
};

const mapStateToProps = (state) => ({
	cart: state.cart
});
const mapDispatchToProps = (dispatch) => ({
	cartActions: bindActionCreators(cartActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
