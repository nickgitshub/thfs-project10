import React from 'react'
import ErrorDisplay from './ErrorDisplay.js'

//compoment used both to Create and Update courses
//State for fields will be empty strings for Create and populated for Update
//Terinaries are used to alternate between "Create Course" and "Update Course" buttons
const FormInput = (props) => {
	return(
		<div className="bounds course--detail">
        	<h1>{props.createOrUpdate === "Create"
            		?"Create Course"
            		:"Update Course"
            	}	
			</h1>
	        <div>
	          <ErrorDisplay errors={props.currentState.errors} /> 
	          <form 
	          	onSubmit={props.courseFunction}
          	  >
	          	<div className="grid-66">
	              <div className="course--header">
	                <h4 className="course--label">Course</h4>
	                <div><input 
		                	id="title" 
		            		name="title" 
		        			type="text" 
		        			className="input-title course--title--input" 
		        			placeholder="Course title..."
		                    value={props.currentState.title || ''}
		                    onChange={props.handleInputChange} 
	                    />
	                </div>
	                <p>By {props.currentState.author}</p>
	              </div>
	              <div className="course--description">
	                <div><textarea 
		            		id="description" 
		            		name="description" 
		            		className="" 
		            		placeholder="Course description..."
		            		value={props.currentState.description || ''}
		            		onChange={props.handleInputChange}
	            		/>
	        		</div>
	              </div>
	            </div>
	            <div className="grid-25 grid-right">
	              <div className="course--stats">
	                <ul className="course--stats--list">
	                  <li className="course--stats--list--item">
	                    <h4>Estimated Time</h4>
	                    <div><input 
		                    	id="estimatedTime" 
		                		name="estimatedTime" 
		                		type="text" 
		                		className="course--time--input"
		                        placeholder="Hours" 
		                        value={props.currentState.estimatedTime || ''}
		                        onChange={props.handleInputChange}
	                        />
	                    </div>
	                  </li>
	                  <li className="course--stats--list--item">
	                    <h4>Materials Needed</h4>
	                    <div>
		                    <textarea 
		                    	id="materialsNeeded" 
		                    	name="materialsNeeded" 
		                    	className="" 
		                    	placeholder="List materials..."
		                    	value={props.currentState.materialsNeeded || ''}
		                    	onChange={props.handleInputChange}
	                    	/>
	                	</div>
	                  </li>
	                </ul>
	              </div>
	            </div>
	          	

	            <div className="grid-100 pad-bottom">
	            	<button 
	            		className="button" 
	            		type="submit">
	            		{props.createOrUpdate === "Create"
		            		?"Create Course"
		            		:"Update Course"
	            		}
            		</button>
            		<button 
            			className="button button-secondary" 
            			onClick={props.cancel}>
        			Cancel
        			</button>
    			</div>

	          </form>
	        </div>
	    </div>
	)
}

export default FormInput;