import React from 'react'


const ErrorDisplay = (props) => {
	const { errors } = props

	if(errors.length>0){
		return(
			<div>
		        <h2 className="validation--errors--label">Errors</h2>
		        <div className="validation-errors">
		          <ul>
		            {errors.map(error => 
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