import React from 'react';


//Header Component that will be  at the top of every page
const Header = (props) => {

	const { context } = props
	const authUser = context.authenticatedUser

	//sign-in and sign-up capabilities will be available when there is no authenticatedUser
	//sign-out capability will be available when there is an authenticatedUser
	return(
		<div className="header">
			<div className="bounds">
				<a href='/'><h1 className="header--logo">Courses</h1></a>
				{authUser
					?<nav><span>Welcome {authUser.firstName} {authUser.lastName}!</span><a className="signout" href="/signout">Sign Out</a></nav>
					:<nav><a className="signin" href="/signin">Sign In</a><a className="signup" href="/signup">Sign Up</a></nav>
				}
			</div>
		</div>
  	)
}

export default Header;