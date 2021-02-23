import React from 'react';

export default class LoginButton extends React.Component{

	async login(){
		const baseURL = "http://localhost:8000/";
		const data = {email: this.state.email}
		let res = await fetch(baseURL+"auth/login",{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {'Content-Type':'application/json'}
		});
		console.log(res.cookie);
	}

	constructor(props) {
		super(props);
		this.state = {email: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(event){
		event.preventDefault();
		this.login(this.state.email);
	}

	handleChange(event){
		event.preventDefault();
		this.setState({email: event.target.value})
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<label>
					Email:
					<input type="text" value={this.state.email} onChange={this.handleChange} />
				</label>
				<button type="submit">
					Login
				</button>
			</form>
		)
	}
}
