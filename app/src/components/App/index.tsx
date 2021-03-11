import React from 'react';

import Header from '../Header';
import Product from '../Product';
import Cart from '../Cart';

import styles from './styles.module.scss';

const App = ():JSX.Element => {
	return (
		<div className={styles.App}>
			<Header />
			<Product />
			<Cart />
		</div>
	);
};

export default App;
