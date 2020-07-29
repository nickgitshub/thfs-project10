import React from 'react'

//component receives are array of errors and displays them using the below JSX 
//used throughout the app to display errors at the tops of forms
const ErrorDisplay = (props) => {
	//extracting the errors from props
	const { errors } = props

	//ensuring that the JSX only loads when errors have been passed to the ErrorDisplay
	if(errors.length>0){
		return(
			<div>
		        <h2 className="validation--errors--label">Errors</h2>
		        <div className="validation-errors">
		          <ul>

		            {//maps each of the errors to a list element
		            	errors.map(error => 
			            	<React.Fragment key={errors.findIndex(e=> e === error )}>
				            	<li key={errors.findIndex(e=> e === error )}>{error}</li>
				            	<br></br>  
			            	</React.Fragment>
	        		)}
		          </ul>
		        </div>
      		</div>
		)
	} else {
		return null;
	}
}

export default ErrorDisplay;