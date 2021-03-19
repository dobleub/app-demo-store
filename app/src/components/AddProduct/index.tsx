import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { productActions, promoActions } from '../../actions';

import styles from './styles.module.scss';

type FormElement = React.FormEvent<HTMLFormElement>;

const AddProduct = ({products, promos, productActions}):JSX.Element => {
	const dataForm = useRef<FormElement>(null);
	const dataTitle = useRef<FormElement>(null);
	const dataCode = useRef<FormElement>(null);
	const dataDesc = useRef<FormElement>(null);
	const dataPrice = useRef<FormElement>(null);
	const dataPromo = useRef<FormElement>(null);

	const handleSubmit = (e:FormElement):void => {
		e.preventDefault();

		productActions.addProduct({
			code: dataCode.current.value,
			name: dataTitle.current.value,
			description: dataDesc.current.value,
			price: parseFloat(dataPrice.current.value),
			promos: dataPromo.current.value != "" ? [{promo: dataPromo.current.value}] : undefined
		});

		dataForm.current.reset();
		dataDesc.current.focus();
	}

	return (
		<div className={styles.AddProduct}>
			<form onSubmit={handleSubmit} ref={dataForm}>
				<input type="text" className={styles.Desc} ref={dataCode} required placeholder="Code" />
				<input type="text" className={styles.Title} ref={dataTitle} required placeholder="Title" />
				<input type="text" className={styles.Desc} ref={dataDesc} placeholder="Description" />
				<select name="promos" className={styles.Desc} ref={dataPromo}>
					<option value="">Promoción</option>
					{
						promos.map((item, idx) => <option key={idx} value={item.promo}>{item.promo}</option>)
					}
				</select>
				<input type="number" className={styles.Price} ref={dataPrice} required placeholder="Price" />
				<div className={styles.Add}>
					<button className={styles.Btn} >Add</button>
				</div>
			</form>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.products,
	promos: state.promos
});
const mapDispatchToProps = (dispatch) => ({
	productActions: bindActionCreators(productActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);