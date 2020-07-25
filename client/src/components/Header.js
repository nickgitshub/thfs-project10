import React from 'react';

const Header = (props) => {

	const { context } = props
	const authUser = context.authenticatedUser

	const signUserOut = (event) => {
		event.preventDefault()
		context.actions.signOut()
	}

	return(
		<div className="header">
			<div className="bounds">
				<a href='/'><h1 className="header--logo">Courses</h1></a>
				{authUser
					?<nav><span>Welcome {authUser.firstName} {authUser.lastName}!</span><a className="signout" href="/signin" onClick={signUserOut}>Sign Out</a></nav>
					:<nav><span></span><a className="signin" href="/signin">Sign In</a></nav>
				}
			</div>
		</div>
  	)
}

export default Header;