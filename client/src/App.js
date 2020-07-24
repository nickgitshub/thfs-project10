import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import withContext from './Context.js'
import PrivateRoute from './PrivateRoute.js'

import Header from './components/Header.js'
import CourseList from './components/CourseList.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import CourseDetail from './components/CourseDetail.js'
import CreateCourse from './components/CreateCourse.js'
import UpdateCourse from './components/UpdateCourse.js'
import NotFound from './components/NotFound.js'
import Forbidden from './components/Forbidden.js'
import UnhandledError from './components/UnhandledError.js'
import UnhandledRedirection from './components/UnhandledRedirection.js'
const HeaderWithContext = withContext(Header)
const CourseListWithContext = withContext(CourseList)
const SignInWithContext = withContext(SignIn)
const SignUpWithContext = withContext(SignUp)
const CourseDetailWithContext = withContext(CourseDetail)
const CreateCourseWithContext = withContext(CreateCourse)
const UpdateCourseWithContext = withContext(UpdateCourse)
const UnhandledErrorWithContext = withContext(UnhandledError)

class App extends Component{

  render(){
  	const { fiveHundredError, errorPageLocation } = this.props.context

    return (
	  <BrowserRouter>
		  <HeaderWithContext /> 
		  <Switch>
		  	<Route path="/error" component={UnhandledErrorWithContext} />
		  	{fiveHundredError &&
		  		<UnhandledRedirection currentLocation={errorPageLocation}/>
	  		}
		  	<Redirect exact from="/" to="/courses" />
		  	<Route exact path="/courses" component={CourseListWithContext} />
		  	<Route path="/signin" component={SignInWithContext}/>
		  	<Route path="/signup" component={SignUpWithContext}/>
		  	<Route path="/forbidden" component={Forbidden} />
		  	<PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
		  	<PrivateRoute exact path="/courses/:id" component={CourseDetailWithContext} />
		  	<PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
		  	<Route component={NotFound} />
		  </Switch>
	  </BrowserRouter>
    )
  }  
}

export default App;
