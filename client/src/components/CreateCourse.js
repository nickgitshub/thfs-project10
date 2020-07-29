import React, { Component } from 'react';
import FormInput from './FormInput.js'

export default class CreateCourse extends Component{
	state = {
		title: "",
		description: "",
		estimatedTime: "",
		materialsNeeded:"",
		errors: []
	}

	componentDidMount() {
		//sets the name of the author that will be displayed on the FormInput to be authenticatedUser's name
		const authUser = this.props.context.authenticatedUser
		const userName = authUser.firstName + " " + authUser.lastName
		this.setState({
			author: userName
		})
	}

	//function for sending a POST request to the API to create a new course
	createCourse = async(event) => {
		event.preventDefault()

		const authUser = this.props.context.authenticatedUser
		
		const emailAddress = authUser.emailAddress
		const password = authUser.password

		const currentState = this.state

		//request body will be sent to Data.js and onto the API
		const requestBody = {
			"userId": authUser.userId,
			"title": currentState.title,
			"description": currentState.description,
			"estimatedTime": currentState.estimatedTime,
			"materialsNeeded":currentState.materialsNeeded
		}
		
		//uses Data.js(via Context) to call the API using a POST request
		await this.props.context.data.createCourse(emailAddress, password, requestBody)
			.then(data=> {
				if(data.errors){
					//form validation errors are passed to FormInput and displayed at the top of the form
					this.setState({
						errors: data.errors
					})
				} else if (data.fiveHundred){
					//server errors are redirected to the error page
					this.props.history.push('/error')
				} else {
					//return to course if creation is successful
					this.props.history.push(data.courseLocation)
				}
			})
	}

	//when an input field is updated, state is updated using the name of the input as a key
	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	//handler that returns the user to home, which is the courses screen
	returnToCourses = () => {
		this.props.history.push('/')
	}



	render(){
		//passes state to current form
		const currentState = this.state

		//FormInput contains JSX for form fields
		return(
			<FormInput
				currentState={currentState}
				createOrUpdate={"Create"}
	      		courseFunction={this.createCourse}
	      		errors={currentState.errors}
	      		handleInputChange={this.handleInputChange}
	      		cancel={this.returnToCourses}
          	/>
		)
	}
}