
import React from 'react'

const ListButton = (props) => {
	return(
		<div className="grid-33">
			<a className="course--module course--link" href={`/courses/${props.courseId}`}>
	            <h4 className="course--label">Course</h4>
	            <h3 className="course--title">{props.courseTitle}</h3>
         	</a>
      	</div>
	)
}

export default ListButton; 