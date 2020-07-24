import React, {Component} from 'react'


export default class UnhandledError extends Component {

	componentWillUnmount() {
		this.props.context.actions.setFiveHundredError(false, "/")
  	}


	render(){

		const { from } = this.props.history.location.state

		return(
			<div>
				<h2 className="validation--errors--label">A server error has occurred</h2>
				<br />
				<div className="bounds">
					<div className="grid-100">
						<span>
							<a className="button" 
								href={`${from.pathname}`}
							>
								Go back
							</a>
						</span>
						<a 
							className="button button-secondary" 
							href="/courses"
						>
							Return to Course List
						</a>
					</div>
				</div>
			</div>
		)
	}
}