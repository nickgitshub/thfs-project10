import React from 'react';
import ReactMarkdown from 'react-markdown';

const Course = (props) => {

 	const fields = props.fields

 	return(
      <div>
        <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  <span>
                    <a className="button" href={`/courses/${fields.id}/update`}>Update Course</a>
                    <a className="button" href="/#" onClick={props.deleteCourse}>Delete Course</a>
                  </span>
                    <a className="button button-secondary" href="/courses">Return to List</a>
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