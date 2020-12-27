import './four-o-four.css';
import React from 'react';

import Header from '../../components/Header/Header';

// TODO: no 404 status http code yet
function FourOFour() {
	return (
		<div className="App">
			<Header />
			<main className="page-container">
				<h1>404 not found</h1>
			</main>
		</div>
	);
}

export default FourOFour;