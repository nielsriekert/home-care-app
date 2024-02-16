import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './global.css';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import App from './App';

import Highcharts from 'highcharts';

Highcharts.setOptions({
	lang: {
		decimalPoint: Intl.NumberFormat(navigator.language).formatToParts(1.1).find(part => part.type === 'decimal')?.value || ','
	}
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
