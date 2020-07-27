import React from 'react'
import { Redirect } from 'react-router-dom';

//used for redirecting pages to '/forbidden'
const ForbiddenRedirection = (props) => {
	return(
		<Redirect to={{
			pathname: '/forbidden',
			state: {from: { id: props.courseId } }
		}} />
	)
}

export default ForbiddenRedirection;