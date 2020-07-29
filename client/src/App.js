import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import withContext from './Context.js'
import PrivateRoute from './PrivateRoute.js'

import Header from './components/Header.js'
import Courses from './components/Courses.js'
import UserSignIn from './components/UserSignIn.js'
import UserSignOut from './components/UserSignOut.js'
import UserSignUp from './components/UserSignUp.js'
import CourseDetail from './components/CourseDetail.js'
import CreateCourse from './components/CreateCourse.js'
import UpdateCourse from './components/UpdateCourse.js'
import NotFound from './components/NotFound.js'
import NotFoundRedirection from './components/NotFoundRedirection'
import Forbidden from './components/Forbidden.js'
import UnhandledError from './components/UnhandledError.js'

/*** 
Adding Context Consumer (from Context.js) to the routes 
that need access to Context Functions or need to know the AuthenticatedUser 
***/

const HeaderWithContext = withContext(Header)
const CoursesWithContext = withContext(Courses)
const UserSignInWithContext = withContext(UserSignIn)
const UserSignOutWithContext = withContext(UserSignOut)
const UserSignUpWithContext = withContext(UserSignUp)
const CourseDetailWithContext = withContext(CourseDetail)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UnhandledErrorWithContext = withContext(UnhandledError)

class App extends Component{

  render(){

    return (
    	/*** 
		Router displays a Header on every page
		Redirects to the '/notfound' route if none of the routes match
		***/
	  <BrowserRouter>
		  <HeaderWithContext /> 
		  <Switch>
		  	<Route path="/error" component={UnhandledErrorWithContext} />
		  	<Redirect exact from="/courses" to="/" />
		  	<Route exact path="/" component={CoursesWithContext} />
		  	<Route path="/signin" component={UserSignInWithContext} />
		  	<Route path="/signout" component={UserSignOutWithContext} />
		  	<Route path="/signup" component={UserSignUpWithContext} />
		  	<PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
		  	<Route exact path="/courses/:id" component={CourseDetailWithContext} />
		  	<PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
	  		<Route path="/forbidden" component={Forbidden} />
		  	<Route path="/notfound" component={NotFound} />
		  	<Route component={NotFoundRedirection} />
		  </Switch>
	  </BrowserRouter>
    )
  }  
}

export default App;
