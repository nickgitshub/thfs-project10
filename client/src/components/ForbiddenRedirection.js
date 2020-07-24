import React from 'react'
import { Redirect } from 'react-router-dom';

const ForbiddenRedirection = (props) => {
	return(
		<Redirect to={{
			pathname: '/forbidden',
			state: {from: { id: props.courseId } }
		}} />
	)
}

export default ForbiddenRedirection;