import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context'

const PrivateRoute = ({component: Component, ...rest}) => {
	//if there is an authenticatedUser signed-in, the passed in component will be rendered when route is hit
	//if there is no authenticatedUser, the client will redirect to the '/signin' route
	return(
		<Consumer>
			{context => (
				<Route 
					{...rest}
					render={props => 
						context.authenticatedUser? 
						(
							<Component {...props} />
						) : (
							<Redirect to={{
								pathname: '/signin',
								state: {from: props.location }
							}} />
						)
					}
				/>
			)}
		</Consumer>
	)
}

export default PrivateRoute;