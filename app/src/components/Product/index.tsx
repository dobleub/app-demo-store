import React, { Fragment } from 'react';

import styles from './styles.module.scss';


const Product = ({product}) => {
  return (
  	<Fragment>
  		{ product ? 
		    <div className={styles.Product} data-id={product.code}>
		    	<div className={styles.Title}>{product.name}</div>
		    	<div className={styles.Desc}>{product.desc}</div>
		    	<div className={styles.Price}>{product.price}</div>
		    </div>
	    :
			<div className={styles.Product}>
		    	<div className={styles.Title}>No products</div>
		    </div>    
		}
	</Fragment>
  );
};

export default Product;
