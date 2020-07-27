import React from 'react';


//Header Component that will be  at the top of every page
const Header = (props) => {

	const { context } = props
	const authUser = context.authenticatedUser

	//signIn capability will be available when routed to '/signin'
	//signOut capability will be available when routed to '/signout'
	return(
		<div className="header">
			<div className="bounds">
				<a href='/'><h1 className="header--logo">Courses</h1></a>
				{authUser
					?<nav><span>Welcome {authUser.firstName} {authUser.lastName}!</span><a className="signout" href="/signout">Sign Out</a></nav>
					:<nav><span></span><a className="signin" href="/signin">Sign In</a></nav>
				}
			</div>
		</div>
  	)
}

export default Header;