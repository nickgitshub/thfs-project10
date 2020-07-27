import React, { Component } from 'react';
import FormInput from './FormInput.js'
import NotFoundRedirection from './NotFoundRedirection.js'
import ForbiddenRedirection from './ForbiddenRedirection.js'

export default class UpdateCourse extends Component{
	state={
		id: null,
		title: null,
		author: null,
		description: null, 
		estimatedTime: null,
		materialsNeeded: null,
		userId: null,
		notFound: false,
		forbidden: false, 
		errors: []
	}

	componentDidMount() {
		//loads course when component mounts
		this.retrieveCourse(this.props.match.params.id)
  	}

  	retrieveCourse = async(paramsId) => {

  		//retrieves courses via Context which uses Data.js to interact with API
		const course = await this.props.context.data.getCourse(paramsId)

		//handles 500 (Server) Errors by redirecting traffic
		if(course.fiveHundred){
			this.props.history.push('/error')
		}else {
			//populates the coures with data from the API call
			//forbidden will prevent non-authors of the course from accessing the page
			if(course.id){
			this.setState({
				id: course.id,
				title: course.title,
				author: course.user.firstName + " " + course.user.lastName,
				description: course.description, 
				estimatedTime: course.estimatedTime,
				materialsNeeded: course.materialsNeeded,
				userId: course.user.id,
				forbidden: course.id !== this.props.context.authenticatedUser.userId
				})
			} else {
				this.setState({
					notFound: true
				})
			}
		}
		

	}

	//
	updateCourse = async(event) => {
		event.preventDefault()

		const authUser = this.props.context.authenticatedUser
		const emailAddress = authUser.emailAddress
		const password = authUser.password
		const courseId = this.props.match.params.id

		const currentState = this.state

		//create requestBody for API update to database
		const requestBody = {
			"title": currentState.title,
			"description": currentState.description,
			"estimatedTime": currentState.estimatedTime,
			"materialsNeeded":currentState.materialsNeeded
		}

		//'POST' call to API via Context which uses Data.js
		await this.props.context.data.updateCourse(emailAddress, password, courseId, requestBody)
			.then(data=> {
				if(data.errors){
					this.setState({
						errors: data.errors
					})
				} else if (data.fiveHundred){
					this.props.history.push('/error')
				}else {
					this.returnToCourse()
				}
			})
	}


	//changes state on every keystroke within a input field
	//the 'name' of the input matches the key in the state object
	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	//function for going back to the course page
	returnToCourse = () => {
		this.props.history.push(`/courses/${this.props.match.params.id}`)
	}

	render(){
		console.log(this.state.userId, this.props.context.authenticatedUser.userId, this.state.userId !== this.props.context.authenticatedUser.userId)
		
		if(this.state.notFound === true){
			//if no Course is found for current id, it redirects to a 404 page
			return <NotFoundRedirection /> 
		} else if (this.state.forbidden){
			//if author of current course doesn't match authenticatedUser, it redirects to forbidden
			return(<ForbiddenRedirection courseId={this.props.match.params.id} />)
		} else {
			return(
				//FormInput renders JSX for form with current state being passed into it
				<FormInput 
					currentState={this.state}
					createOrUpdate={"Update"}
		      		courseFunction={this.updateCourse}
		      		errors={this.state.errors}
		      		handleInputChange={this.handleInputChange}
		      		cancel={this.returnToCourse}
			 	 />
			)
		}
	}
}