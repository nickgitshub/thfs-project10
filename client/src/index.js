import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from './Context.js';
import withContext from './Context.js'

const AppWithContext= withContext(App)

ReactDOM.render(
	<Provider>
		<AppWithContext />
	</Provider>,
	document.getElementById('root')
)
