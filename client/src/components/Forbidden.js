import React from 'react'

//Component rendered for the '/forbidden' route
const Forbidden = (props) => {

	//provides a path that component can use for returning to previous course
	const { from } = props.location.state || { from: { id: '' } };

	return(
		<div>
	 		<div>
	 			  <h2 className="validation--errors--label">Only course owners can edit courses</h2>
	 			  <br />
	              <div className="bounds">
	                <div className="grid-100"><span><a className="button" href={`/courses/${from.id}`}>Return to Course</a></span><a
	                    className="button button-secondary" href="/">Return to List</a>
                    </div>
	              </div>
	        </div>
 		</div>
	)
}

export default Forbidden;