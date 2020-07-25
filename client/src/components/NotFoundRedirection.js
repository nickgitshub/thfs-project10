import React from 'react'
import { Redirect } from 'react-router-dom';

const NotFoundRedirection = () => {
	return(
		<Redirect to={{pathname: '/notfound'}} />
	)
}

export default NotFoundRedirection;