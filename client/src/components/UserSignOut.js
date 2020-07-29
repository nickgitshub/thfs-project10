import React, { Fragment } from 'react';

const UserSignOut = (props) => {
	const authUser = props.context.authenticatedUser

	//uses Context to sign user out
	const signOut = () => {
		props.context.actions.signOut()
		props.history.push('/')
	}

	//redirects to Sign In page
	const goToSignIn = () => {
		props.history.push('/signin')
	}
	
	//goes to a list of courses
	const returnToCourses = () => {
		props.history.push('/')
	}

	//JSX for different options at signout
	//Terinary alter what options are available depending on whether user is current signed in
	return (
		<div className="grid-100 pad-bottom">
		{authUser !== null
			? 	
					<button 
						onClick={signOut}
						className="button" 
						type="submit"
					>
						Sign Out
					</button>
			:
				<Fragment>
					<p>Already signed out.</p>
					<button 
						onClick={goToSignIn}
						className="button" 
						type="submit"
					>
						Go To Sign In
					</button>
					<button
						onClick={returnToCourses}
						className="button" 
						type="submit"
					>
						Return to Courses
					</button>
				</Fragment>
		}
		</div>
		
	)
}

export default UserSignOut;
