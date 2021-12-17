import './four-o-four.css';
import React from 'react';

import LoggedOut from '../../templates/LoggedOut/LoggedOut';

// TODO: no 404 status http code yet
function FourOFour() {
	return (
		<LoggedOut>
			<h1>404 not found</h1>
		</LoggedOut>
	);
}

export default FourOFour;