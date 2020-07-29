
import React, { Component } from 'react';
import ErrorDisplay from './ErrorDisplay.js'


export default class SignIn extends Component{

	state = {
		emailAddress: "",
		password: "",
		errors: []
	}

	//on each keystroke, changes in the form are saved to state
	//'name' on input element is used as the key for state object
	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	//signs user in and redirects them back to the page they were at prior to sign in
	submitSignIn = async(event) => {
		event.preventDefault()
	    
		//grabbing the path of where the user was at prior to coming to the sign in page
		//the Redirect component in PrivateRoute passed the path into the "from" state
	    const { from } = this.props.location.state || { from: { pathname: '/' } };

	    //grabbing the context
	    const { context } = this.props

	    //signs in via Context.js which uses Data.js and displays errors if any occurred
	    //pushes to page where it just came "from" if it was redirected via PrivateRoute
	    await context.actions.signIn(this.state.emailAddress, this.state.password)
	    	.then(data=> {
    			if(data.errors){
    				//validation errors returned and displayed if there are field validation errors
    				this.setState({
    					errors: data.errors
    				})
    			} else if (data.fiveHundred){
    				//redirect to error page when there's a server error
					this.props.history.push('/error')
    			} else {
    				//redirect back to the page the user came from after a successful sign-in
    				this.props.history.push(from)
    			}
    		})
	}

	//returns user to route with list of courses
	returnToCourses = () => {
		this.props.history.push('/')
	}

	render(){

		return(
			<div>
				<div className="bounds">
					<div className="grid-33 centered signin">
						<h1>Sign In</h1>
						<ErrorDisplay errors={this.state.errors} /> 
						<div>
							<form onSubmit={this.submitSignIn}>
								<div>
									<input 
										id="emailAddress" 
										name="emailAddress" 
										type="text" 
										className="" 
										placeholder="Email Address"
										onChange={this.handleInputChange}
									/>
								</div>
								<div>
									<input 
										id="password" 
										name="password" 
										type="password" 
										className="" 
										placeholder="Password"
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="grid-100 pad-bottom">
									<button 
										className="button" 
										type="submit"
									>
										Sign In
									</button>
									<button 
										className="button button-secondary" 
										onClick={this.returnToCourses}
									>
										Cancel
									</button>
								</div>
							</form>
						</div>
						<p>&nbsp;</p>
						<p>Don't have a user account? <a href="/signup">Click here</a> to sign up!</p>
					</div>
				</div>
			</div>
		)
	}
}

