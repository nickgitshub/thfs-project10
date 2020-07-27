import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from './Context.js';

//setting up the App to be a Context Provider to all the components that need access to Context Functions or need to know the AuthenticatedUser
ReactDOM.render(
	<Provider>
		<App />
	</Provider>,
	document.getElementById('root')
)
