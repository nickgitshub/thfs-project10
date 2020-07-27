import React from 'react';
import ReactMarkdown from 'react-markdown';


//Component is used by CourseDetail to provide the JSX for each individual course
const Course = (props) => {

  //passes the required state
 	const fields = props.fields

 	return(
      <div>
        <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {
                  //Is only showing the Update and Delete buttons if the author of the course is the authenticatedUser
                  //Only a Return To Lists will be displayed if the current Author isn't the current User
                  props.authorIsAuthUser
                    ? <span>
                        <a className="button" href={`/courses/${fields.id}/update`}>Update Course</a>
                        <a className="button" href="/#" onClick={props.deleteCourse}>Delete Course</a>
                      </span>
                    :<span></span>
                  }
                    <a className="button button-secondary" href="/">Return to List</a>
                </div>
              </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{fields.title}</h3>
              <p>By {fields.author}</p>
            </div>
            <div className="course--description">
            	<ReactMarkdown source={fields.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{fields.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown source={fields.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
	)
 }

 export default Course;