import config from './config';

export default class Data {
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

	async createUser(user){
		try{
			const response = await this.api('/users', 'POST', user);
			if (response.status === 201) {
				return []
			} else if (response.status === 400){
				return response.json()
					.then(data=> {
						return data.errors;
					})
			} else {
				throw new Error();
			}
		}catch(error){
			console.log(error)
			return { fiveHundred: true }
		}
		
	}

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

	async deleteCourse(emailAddress, password, courseId, body){

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