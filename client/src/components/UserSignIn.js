
import React, { Component } from 'react';
import ErrorDisplay from './ErrorDisplay.js'


export default class SignIn extends Component{

	state = {
		emailAddress: "",
		password: "",
		errors: []
	}

	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	submitSignIn = async(event) => {
		event.preventDefault()
	    
	    const { context } = this.props
	    const { from } = this.props.location.state || { from: { pathname: '/' } };

	    await context.actions.signIn(this.state.emailAddress, this.state.password)
	    	.then(data=> {
    			if(data.errors){
    				this.setState({
    					errors: data.errors
    				})
    			} else if (data.fiveHundred){
					this.props.history.push('/error')
    			} else {
    				this.props.history.push(from)
    			}
    		})
	}

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

