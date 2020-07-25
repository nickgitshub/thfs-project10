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

	handleInputChange = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	submitSignUp = (event) => {
		event.preventDefault()
	    
	    const { context } = this.props;

	    const newUser = {
	    	"firstName": this.state.firstName,
	    	"lastName": this.state.lastName, 
	    	"emailAddress": this.state.emailAddress, 
	    	"password": this.state.password
	    }

	    if( this.state.password !== this.state.confirmPassword){
	    	this.setState({
				formErrors: ["Password and Confirm Password must match"]
			})
	    }else{
	    	context.data.createUser(newUser)
	    	.then(data => {
	    		if(data.errors){
	    			this.setState({
	    				formErrors: data.errors
	    			})
	    		} else if (data.fiveHundred){
					this.props.context.actions.setFiveHundredError(true, this.props.location.pathname)
				} else {
					context.actions.signIn(this.state.emailAddress, this.state.password)
	    			.then( (data)=> {
	    				if(data.errors){
	    					this.setState({
								formErrors: data.errors
							})
	    				} else if (data.fiveHundred){
							this.props.context.actions.setFiveHundredError(true, this.props.location.pathname)
						}else{
	    					this.props.history.push('/')
	    				}
					})
				}

	    	})
	    } 
	}

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
