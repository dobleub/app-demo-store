import React from 'react';

import Header from '../Header';
import ProductList from '../ProductList';
import Cart from '../Cart';

import styles from './styles.module.scss';

const App = ():JSX.Element => {
	return (
		<div className={styles.App}>
			<Header />
			<div className={styles.Content}>
				<ProductList />
				<Cart />
			</div>
		</div>
	);
};

export default App;
