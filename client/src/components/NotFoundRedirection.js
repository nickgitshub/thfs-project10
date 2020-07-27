import React from 'react'
import { Redirect } from 'react-router-dom';

//used for redirecting pages to '/notfound'
const NotFoundRedirection = () => {
	return(
		<Redirect to={{pathname: '/notfound'}} />
	)
}

export default NotFoundRedirection;