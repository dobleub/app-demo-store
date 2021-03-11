import React from 'react';

import styles from './styles.module.scss';


const Header = props => {
  return (
    <React.Fragment>
    	<div className={styles.topnav}>
			<a className={styles.active} href="#home">Home</a>
		</div>
    </React.Fragment>
  );
};

export default Header;
