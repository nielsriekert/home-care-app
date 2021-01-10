import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Cookies from 'cookies.js';

// TODO: token should be checked against api
const authorizationToken = Cookies.get('authorization-token');

const PrivateRoute = ({ children, redirectComponents, ...props }) => (
	<Route {...props} >
		{authorizationToken ?
			children : redirectComponents || <Redirect to='/login' />}
	</Route>
);

export default PrivateRoute;