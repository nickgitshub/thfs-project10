import React, {Component}  from 'react';
import Cookies from 'js-cookie'
import Data from './Data'

const Context = React.createContext()

export class Provider extends Component{

	//importing the use of Data so that Context Consumers can access Context functions
	constructor() {
		super();
		this.data = new Data();
	}

	//get the authenticatedUser from the client cookie or setting it to null if no cookie exists
	state = {
		authenticatedUser: Cookies.getJSON('authenticatedUser') || null
	}

	render() {
		const { authenticatedUser } = this.state

		//passing Context State and Functions to an object consumed by provider
		const value = {
			authenticatedUser,
			data: this.data,
			actions: {
				signIn: this.signIn,
				signOut: this.signOut
			}
		}

		//use the value object in Provider to share Context state with the entire app
		return (
			<Context.Provider value={value}>
				{this.props.children}
			</Context.Provider>
		)
	}

	//using Data.js to sign in user on API
	//sets cookie with User credential to be used at a later date
	signIn = async(email, password) => {
		const user = await this.data.getUser(email, password)

		if(user.userId){
			//sets the User password to plain text in the Cookie so that it can be re-encrypted on future API requests
			user.password = password
			//sets the user object as the authenticatedUser
			//no accessible across the entire app
			this.setState(()=> {
				return{
					authenticatedUser: user,
				}
			})
			//stores yser credentials in the Cookie
			Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1})
		}
		return user;
	}

	//removes the ability to access the API by clearing out authenticatedUser
	//will change the routing behavior in React when no user is signed in
	signOut = () => {
		this.setState({
			authenticatedUser: null
		})
		Cookies.remove('authenticatedUser')
	}
}

//export Consumer for external use
export const Consumer = Context.Consumer


//enables a Component to easily be transformed into a Consumer of Context
//used within App.js
export default function withContext(Component) {
	return function ContextComponent(props) {
		return(
			<Context.Consumer>
				{context => <Component {...props} context={context} />}
			</Context.Consumer>
		);
	}
}