import React from 'react';

export default class IdeasBox extends React.Component{

	constructor(props){
		super(props)
		this.state = {ideas: this.props.ideas}
	}

	handleChangeFactory(key) { 
		return function(event){
		let ideas = this.state.ideas;

		// Modify the idea
		ideas[key] = event.target.value;

		// Record the changes
		this.setState({ideas: ideas})
		}
	}

	render(){
		let name = "Ideas"
		let ideas = []
		if(this.state.ideas != null){
			ideas = this.state.ideas
		}
		const ideasList = ideas.map((idea,index) =>
			<div>
				<textarea rows="2" cols="60" value={idea} onChange={this.handleChangeFactory(index).bind(this)} />
			</div>
		);
		return (
		<div>
			<div>
				{name}
			</div>
			<div>
				{ideasList}
			</div>
		</div>
		)}
}
