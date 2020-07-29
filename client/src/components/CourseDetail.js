import React, { Component } from 'react';
import NotFoundRedirection from './NotFoundRedirection.js'
import Course from './Course.js'
import ErrorDisplay from './ErrorDisplay'
import SweetAlert from 'react-bootstrap-sweetalert';


export default class CourseDetail extends Component{

	state = {
		id: null,
		title: null,
		author: null,
		description: null,
		estimatedTime: null,
		materialsNeeded: null,
		errors: [],
		show: false,
		authorIsAuthUser: false,
		notFound: false

	}

	componentDidMount() {
			//pass url id to the retrieveCourse function defined below
			this.retrieveCourse(this.props.match.params.id)
  	}

  	//retrieves the course whose id is included in url ('/courses/:id')
	retrieveCourse = async(id) => {

		const course = await this.props.context.data.getCourse(id)

		//redirects to an error page if there's a server error
		if(course.fiveHundred){
			this.props.history.push('/error')
		}else {
			//if there's a course, it is retrieved from the API
			//authorIsAuthUser checks whether the current user is the author of the course and passes that to the Course.js
			if(course.id){
				const authUser = this.props.context.authenticatedUser || {userId: null} 
				this.setState({
					id: course.id,
					title: course.title,
					author: course.user.firstName + " " + course.user.lastName,
					description: course.description, 
					estimatedTime: course.estimatedTime,
					materialsNeeded: course.materialsNeeded,
					authorIsAuthUser: course.user.id === authUser.userId
				})
			} else {
				//if there's not a course, notFound is set to true so that the page will be re-routed to a 404 message
				this.setState({
					notFound: true
				})	
			}
		}
	}

	
	//deletes the course whose id is provided
	deleteCourse = async(id) => {

		//calls a 'GET' to API to retrieve the authenticatedUser
		const authUser = this.props.context.authenticatedUser
		await this.props.context.data.deleteCourse(authUser.emailAddress, authUser.password, this.state.id)
			.then(data => {
				if(data.errors){
					this.setState({
						errors: data.errors
					})
				} else if(data.fiveHundred){
					this.props.history.push('/error')
				} else {
					this.props.history.push('/')
				}
			})
	}

	/*** confirmDeletion and cancelDeletion are used to toggle the appearance of the SweetAlert ***/

	//triggered when 'Yes' is clicked on prompt
	confirmDeletion = (event) => {
		event.preventDefault()
		this.setState({
			show: true
		})
	}

	//removes SweetAlert from page when 'Cancel' is clicked
	cancelDeletion = () => {
		this.setState({
			show: false
		})
	}

	render(){

		//calls a Redirection component if the course is unable to be retrieved
		if (this.state.notFound === true){
			return(
				<NotFoundRedirection /> 
			)
		} else {
			return(
		      	<div>
		      		<ErrorDisplay errors={this.state.errors}/>
		      		{/*** SweetAlert used to confirm user actually wants to delete course ***/}
		      		<SweetAlert
					  warning
					  showCancel
					  confirmBtnText="Yes"
					  confirmBtnBsStyle="danger"
					  title="Are you sure you want to delete this course?"
					  onConfirm={this.deleteCourse}
					  onCancel={this.cancelDeletion}
					  focusCancelBtn
					  show={this.state.show}
					>
					  You will not be able to recover this course once it is deleted.
					</SweetAlert>
					<Course 
						fields={this.state} 
						deleteCourse={this.confirmDeletion}
						authorIsAuthUser={this.state.authorIsAuthUser}
					/>
	      	   </div>
	    	)
		}
	}
}

 