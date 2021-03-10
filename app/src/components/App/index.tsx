import React, {Fragment, useState} from 'react';

import styles from './styles.module.scss';


const App = ():JSX.Element => {
	const [value, setValue] = useState<string>("");
	
	return (
		<Fragment>
			<h1>Todo list</h1>
			<form>
				<input type="text" required/>
				<button type="submit">Add Todo</button>
			</form>
		</Fragment>
	);
};

export default App;
