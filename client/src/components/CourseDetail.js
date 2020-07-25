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
			this.retrieveCourse(this.props.match.params.id)
  	}

	retrieveCourse = async(id) => {

		const course = await this.props.context.data.getCourse(id)

		if(course.fiveHundred){
			this.props.context.actions.setFiveHundredError(true, this.props.location.pathname)
		}else {
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
				this.setState({
					notFound: true
				})	
			}
		}
	}

	

	deleteCourse = async(id) => {

		const authUser = this.props.context.authenticatedUser
		await this.props.context.data.deleteCourse(authUser.emailAddress, authUser.password, this.state.id)
			.then(data => {
				if(data.errors){
					this.setState({
						errors: data.errors
					})
				} else if(data.fiveHundred){
					this.props.context.actions.setFiveHundredError(true, this.props.location.pathname)
				} else {
					this.props.history.push('/')
				}
			})
	}

	confirmDeletion = (event) => {
		event.preventDefault()
		this.setState({
			show: true
		})
	}

	cancelDeletion = () => {
		this.setState({
			show: false
		})
	}

	render(){

		if (this.state.notFound === true){
			return(
				<NotFoundRedirection /> 
			)
		} else {
			return(
		      	<div>
		      		<ErrorDisplay errors={this.state.errors}/>
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

 