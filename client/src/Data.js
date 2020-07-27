import config from './config';

export default class Data {
	//creating an API url and headers that can be used to send the request
	api(path, method = 'GET', body=null, requiresAuth = false, credentials = null) {
		const url = config.apiBaseUrl + path

		//creating options to be sent as API call
		//includes header type4
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		};

		//turning the body parameter into JSON
		if(body != null){
			options.body = JSON.stringify(body)
		}

		//If authentication is required, 
		if(requiresAuth){
			const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)
			options.headers['Authorization']=`Basic ${encodedCredentials}`;
		}

		return fetch(url, options)

	}


	//gets the current user and returns their profile information (GET)
	async getUser(emailAddress, password){
		try{
			const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
		    if (response.status === 200) {
		      return response.json()
		      	.then(data => data);
		    }
		    else if (response.status === 401) {
		      return response.json()
		      	.then(data => data);
		    }
		    else {
		      throw new Error();
		    }
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}

	//creates a new user using a User object (POST)
	async createUser(user){
		try{
			const response = await this.api('/users', 'POST', user);
			if (response.status === 201) {
				return []
			} else if (response.status === 400){
				return response.json()
					.then(data=> {
						return { errors: data.errors };
					})
			} else {
				throw new Error();
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}

	//gets an array of Course objects (GET)
	async getCourses(){
		try{
			const response = await this.api('/courses', 'GET')
			if(response.status === 200){
				return response.json()
					.then(data=> data)
			}else{
				throw new Error()
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}

	//gets a particular course (GET)
	async getCourse(id){
		try{
			const response = await this.api(`/courses/${id}`, 'GET')
			if(response.status === 200 || response.status === 404){
				return response.json()
					.then(data=> data)
			}else {
				throw new Error();
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}

	//create a course (POST) using the body object that's passed in
	async createCourse(emailAddress, password, body){
		try{
			const response = await this.api('/courses', 'POST', body, true, {emailAddress, password})
			if(response.status === 201){
			return response.json()	
				.then(data=> data)
			} else if(response.status === 400){
				return response.json()	
					.then(data=> {
						return { errors: data.errors };
					})
			} else {
				throw new Error(); 
			}	
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
		
	}

	//updates a Course using a PUT and returns a Success message to let the client know that the action is completed
	async updateCourse(emailAddress, password, courseId, body){
		try{
			const path = `/courses/${courseId}`
			const response = await this.api(path, 'PUT', body, true, {emailAddress, password})
			if(response.status === 204){
				return { message: "Success"}
			} else if(response.status === 400 || response.status === 403 || response.status === 404){
				return response.json()	
					.then(data=> {
						return { errors: data.errors };
					})
			} else {
				throw new Error(); 
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
	}

	//Deletes a course and returns a Success message to the client to let it know that the action has completed
	async deleteCourse(emailAddress, password, courseId){

		try{
			const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password})
			if(response.status === 204){
				return { message: "Success"}
			} else if(response.status === 403 || response.status === 404){
				return response.json()	
					.then(data=> {
						return { errors: data.errors };
					})
			} else {
				throw new Error(); 
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}


} 