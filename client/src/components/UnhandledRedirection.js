import React from 'react'
import { Redirect } from 'react-router-dom';

const UnhandledRedirection = (props) => {
	console.log("TEST", props.currentLocation)
	return(
		<Redirect to={{
			pathname: '/error',
			//currentLocation in component will be this.props.location.pathname
			state: {from: {pathname: props.currentLocation || "/"} }
		}} />
	)
}

export default UnhandledRedirection;