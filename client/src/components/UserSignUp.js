import React, { Component } from 'react';
import ErrorDisplay from './ErrorDisplay.js'


export default class SignUp extends Component{

	state = {
		firstName: "",
		lastName: "",
		emailAddress: "",
		password: "",
		confirmPassword: "",
		formErrors: []
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

	//event handler for the form submission
	submitSignUp = (event) => {
		event.preventDefault()
	    
	    const { context } = this.props;

	    //object that will be passed to the API as the body of the request
	    const newUser = {
	    	"firstName": this.state.firstName,
	    	"lastName": this.state.lastName, 
	    	"emailAddress": this.state.emailAddress, 
	    	"password": this.state.password
	    }

	    //confirming that the passords type into the password input and confirmPassword input match
	    if( this.state.password !== this.state.confirmPassword){
	    	this.setState({
				formErrors: ["Password and Confirm Password must match"]
			})
	    }else{
	    	//calling a POST request to the API for the creation of a new user
	    	context.data.createUser(newUser)
	    	.then(data => {
	    		if(data.errors){
	    			//displays form validation errors at the top of the form
	    			this.setState({
	    				formErrors: data.errors
	    			})
	    		} else if (data.fiveHundred){
	    			//redirects users to the error page when there's a server error
					this.props.history.push('/error')
				} else {
					context.actions.signIn(this.state.emailAddress, this.state.password)
	    			.then( (data)=> {
	    				if(data.errors){
	    					//displays potential email or password issues at the top of form after a failed sign in
	    					this.setState({
								formErrors: data.errors
							})
	    				} else if (data.fiveHundred){
	    					//redirects to error page when there's a server error
							this.props.history.push('/error')
						}else{
							//redirects user back to home after a successful user sign up
	    					this.props.history.push('/')
	    				}
					})
				}

	    	})
	    } 
	}

	//event handler for when the ancel button is pushed
	//sends user back to the home page
	cancel = (event) => {
		event.preventDefault()
		this.props.history.push('/')
  	}

	render(){
		return(
			<div className="bounds">
		        <div className="grid-33 centered signin">
		          <h1>Sign Up</h1>
		          <ErrorDisplay errors={this.state.formErrors} /> 
		          <div>
		            <form onSubmit={this.submitSignUp}>
		              <div><input 
		              	id="firstName" 
		              	name="firstName" 
		              	type="text" 
		              	placeholder="First Name"
		              	onChange={this.handleInputChange}
		              	/>
		              </div>
		              <div><input 
		              	id="lastName" 
	              		name="lastName" 
	              		type="text" 
	              		placeholder="Last Name"
	              		onChange={this.handleInputChange} />
	              		
	              	  </div>
		              <div><input 
		              	id="emailAddress" 
	              		name="emailAddress" 
	              		type="text" className="" 
	              		placeholder="Email Address"
	              		onChange={this.handleInputChange} />
	              	  </div>
		              <div>
		              	<input 
		              		id="password" 
	              			name="password" 
	              			type="password" 
	              			placeholder="Password"
	              			onChange={this.handleInputChange} />
	              	  </div>
		              <div><input 
		              	id="confirmPassword" 
		              	name="confirmPassword" 
		              	type="password" className="" 
		              	placeholder="Confirm Password"
		              	onChange={this.handleInputChange} />
		               </div>
		              <div 
		              	className="grid-100 pad-bottom">
		              	<button 
		              		className="button" 
		              		type="submit"
		              		>
		              		Sign Up
		              	</button>
		              	<button 
		              		className="button button-secondary" 
		              		onClick={this.cancel}>
		              		Cancel
	              		</button>
	              	   </div>
		            </form>
		          </div>
		          <p>&nbsp;</p>
		          <p>Already have a user account? <a href="/signin">Click here</a> to sign in!</p>
		        </div>
		      </div>
		)
	}
}
