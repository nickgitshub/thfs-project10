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
		const authUser = this.props.context.authenticatedUser
		const userName = authUser.firstName + " " + authUser.lastName
		this.setState({
			author: userName
		})
	}

	createCourse = async(event) => {
		event.preventDefault()

		const authUser = this.props.context.authenticatedUser
		
		const emailAddress = authUser.emailAddress
		const password = authUser.password

		const currentState = this.state

		const requestBody = {
			"userId": authUser.userId,
			"title": currentState.title,
			"description": currentState.description,
			"estimatedTime": currentState.estimatedTime,
			"materialsNeeded":currentState.materialsNeeded
		}
		
		await this.props.context.data.createCourse(emailAddress, password, requestBody)
			.then(data=> {
				if(data.errors){
					this.setState({
						errors: data.errors
					})
				} else if (data.fiveHundred){
					this.props.history.push('/error')
				} else {
					this.props.history.push(data.courseLocation)
				}
			})
	}

	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	returnToCourses = () => {
		this.props.history.push('/')
	}



	render(){
		const currentState = this.state
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