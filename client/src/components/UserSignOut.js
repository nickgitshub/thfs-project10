import React, { Fragment } from 'react';

const UserSignOut = (props) => {
	const authUser = props.context.authenticatedUser
	console.log(authUser)

	const signOut = () => {
		props.context.actions.signOut()
	}

	const goToSignIn = () => {
		props.history.push('/signin')
	}
	
	const returnToCourses = () => {
		props.history.push('/courses')
	}

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
