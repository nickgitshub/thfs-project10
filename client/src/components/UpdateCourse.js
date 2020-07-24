import React, { Component, Fragment } from 'react';
import FormInput from './FormInput.js'
import NotFound from './NotFound.js'
import UnhandledRedirection from './UnhandledRedirection.js'
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
		errors: []
	}

	componentDidMount() {
		this.retrieveCourse(this.props.match.params.id)
  	}

  	retrieveCourse = async(paramsId) => {

		const course = await this.props.context.data.getCourse(paramsId)
		
		if(course.id){
			this.setState({
				id: course.id,
				title: course.title,
				author: course.user.firstName + " " + course.user.lastName,
				description: course.description, 
				estimatedTime: course.estimatedTime,
				materialsNeeded: course.materialsNeeded,
				userId: course.user.id,
				redirect: false
			})
		}
		
		return course;
	}

	updateCourse = async(event) => {
		event.preventDefault()

		const authUser = this.props.context.authenticatedUser
		const emailAddress = authUser.emailAddress
		const password = authUser.password
		const courseId = this.props.match.params.id

		const currentState = this.state

		const requestBody = {
			"title": currentState.title,
			"description": currentState.description,
			"estimatedTime": currentState.estimatedTime,
			"materialsNeeded":currentState.materialsNeeded
		}
		await this.props.context.data.updateCourse(emailAddress, password, courseId, requestBody)
			.then(data=> {
				if(data.errors){
					this.setState({
						errors: data.errors
					})
				} else if (data.fiveHundred){
					this.props.context.actions.setFiveHundredError(true, this.props.location.pathname)
				}else {
					this.returnToCourse()
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

	returnToCourse = () => {
		this.props.history.push(`/courses/${this.props.match.params.id}`)
	}

	render(){

		return(
			//Two terninaries for rendering redirections
			<Fragment>
				{this.state.id !== null
					?	<Fragment>
							{this.state.userId === this.props.context.authenticatedUser.userId
								?<FormInput 
									currentState={this.state}
									createOrUpdate={"Update"}
						      		courseFunction={this.updateCourse}
						      		errors={this.state.errors}
						      		handleInputChange={this.handleInputChange}
						      		cancel={this.returnToCourse}
							 	 />
							 	:<ForbiddenRedirection courseId={this.props.match.params.id} /> 
						 	}
						</Fragment>
					:<NotFound /> 
				}
			</Fragment>
		)
	}
}