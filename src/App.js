import React from 'react';
import './App.css';
import random from './utils/randomizer'

class Column extends React.Component{

	render(){
		let name = "Column"
		let elements = []
		if(this.props.column != null){
			name = this.props.column.name
			elements = this.props.column.elements
		}
		const elementsList = elements.map((element) =>
			<li>{element}</li>
		);

		// Get the list of elements
		return (
		<div>
			<div>
				{name}
			</div>
			<div>
				<ul>{elementsList}</ul>
			</div>
		</div>
				
		)}
}

class Random extends React.Component{

	render(){
		const content = random()
		return (
		<div>
			{content}
		</div>
		)}
}

class RandomizeButton extends React.Component{
	render(){
		return(
			<button onClick={this.props.updateRandom}>
				Refresh Random
			</button>
		)
	}
}

class IdeasBox extends React.Component{

	render(){
		
		let name = "Idea Box"
		let ideas = []
		if(this.props.ideas != null){
			ideas = this.props.ideas
		}
		const ideasList = ideas.map((idea) =>
			<li>{idea}</li>
		);
		return (
		<div>
			<div>
				{name}
			</div>
			<ul>
				{ideasList}
			</ul>
		</div>
		)}
}

class App extends React.Component {

	constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      boards: [],
			randoms: this.getRandom()
    }; 

		// Bind the updateRandom
		this.updateRandom = this.updateRandom.bind(this);
	}

	componentDidMount(){
		fetch("http://localhost:8000/boards")
		.then((res) => res.json())
		//.then((result)=> {console.log(result);})
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					boards: result[0]
			});
		},
		(error) => {
			console.log("Error");
			this.setState({
				isLoaded: true,
				error
			});
		})
	}

	getRandom(){
		return [random(),random(),random()]	
	}

	updateRandom(){
		this.setState({random: this.getRandom()});
	}

	render(){
		var columns;
		if(this.state.isLoaded){
			columns = this.state.boards.columns
		}
		else{
			columns = [null, null, null, null]
		}
		return (
    <div className="App">
			<header>
				<link
		rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
		integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
		crossorigin="anonymous"
				/>
			</header>

			<div class="container">
				<div class="row">
					Board: {this.state.boards.name}
				</div>
				<div class="row">
					<div class="col-sm">
						<Column column={columns[0]}/>
					</div>
					<div class="col-sm">
						<Column column={columns[1]}/>
					</div>
					<div class="col-sm">
						<Column column={columns[2]}/>
					</div>
					<div class="col-sm">
						<Column column={columns[3]}/>
					</div>
				</div>
			</div>
			<div class="row">
					<div class="col-sm">
						<Random content={this.state.randoms[0]}/>
					</div>
					<div class="col-sm">
						<Random content={this.state.randoms[1]}/>
					</div>
					<div class="col-sm">
						<Random content={this.state.randoms[1]}/>
				</div>
			</div>
			<div class="row">
				<div class="col-sm">
					<RandomizeButton updateRandom={this.updateRandom}/>
				</div>
			</div>
			<div class="row">
				<div class="col-xl">
					<IdeasBox ideas={this.state.boards.ideas}/>
				</div>
			</div>
    </div>
  );
	}
}

export default App;
