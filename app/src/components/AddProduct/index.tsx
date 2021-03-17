import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions } from '../../actions';

import styles from './styles.module.scss';

type FormElement = React.FormEvent<HTMLFormElement>;

const AddProduct = ({products, productActions}):JSX.Element => {
	const dataForm = useRef<FormElement>(null);
	const dataTitle = useRef<FormElement>(null);
	const dataDesc = useRef<FormElement>(null);
	const dataPrice = useRef<FormElement>(null);

	const handleSubmit = (e:FormElement):void => {
		e.preventDefault();

		productActions.addProduct({
			code: (new Date()).getTime(),
			name: dataTitle.current.value,
			desc: dataDesc.current.value,
			price: dataPrice.current.value,
			status: true
		});

		dataForm.current.reset();
	}

	return (
		<div className={styles.AddProduct}>
			<form onSubmit={handleSubmit} ref={dataForm}>
				<input type="text" className={styles.Title} ref={dataTitle} required placeholder="Title" />
				<input type="text" className={styles.Desc} ref={dataDesc} required placeholder="Description" />
				<input type="number" className={styles.Price} ref={dataPrice} required placeholder="Price" />
				<div className={styles.Add}>
					<button className={styles.Btn} >Add</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.products
});
const mapDispatchToProps = (dispatch) => ({
	productActions: bindActionCreators(productActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);