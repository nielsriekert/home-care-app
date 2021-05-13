import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './global.css';
import App from './App';

import Highcharts from 'highcharts';

Highcharts.setOptions({
	lang: {
		decimalPoint: Intl.NumberFormat(navigator.language).formatToParts(1.1).find(part => part.type === 'decimal').value
	}
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
