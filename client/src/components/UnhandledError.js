import React from 'react'

const UnhandledError = () => {

	//JSX for '/error' route
	return(
		<div>
			<h2 className="validation--errors--label">A server error has occurred</h2>
			<br />
			<div className="bounds">
				<div className="grid-100">
					<a 
						className="button button-secondary" 
						href="/"
					>
						Return to Course List
					</a>
				</div>
			</div>
		</div>
	)
}

export default UnhandledError;