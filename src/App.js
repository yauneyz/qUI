import React from 'react';
import random from './utils/randomizer'
import './App.css';
import {Random, RandomizeButton} from './components/Random'
import Column from './components/Column'
import LoginButton from './components/LoginButton'
import IdeasBox from './components/IdeasBox'

const baseURL = "http://localhost:8000/"; 
class App extends React.Component {
constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      boards: [],
			randoms: this.getRandom(),
			token: null
    }; 

		// Bind methods
		this.updateRandom = this.updateRandom.bind(this);
	}

	componentDidMount(){ fetch(baseURL+"boards", {credentials: 'include'})
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
		// Loading
		if(!this.state.isLoaded){
			return (
				<div>
					Loading
				</div>
				)
		}
		// Data returned
		else{
			// Not logged in
			console.log("Boards",this.state.boards)
			if(!this.state.boards || this.state.boards.length===0){
				return (
					<div>
						<LoginButton />
						Please log in
					</div>
					)
			}
			// Logged in, proceed normally
			columns = this.state.boards.columns
		}
		return (
    <div className="App">
			<header>
				<link
		rel="stylesheet"
		href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
		integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
		crossOrigin="anonymous"
				/>
			</header>


			<div className="container">
				<div className="app-title">
					Idea Editor
				</div>
				<div className="row">
					<div className="board-name">
						Board: {this.state.boards.name}
					</div>
				</div>
				<div className="row pt-1">
					<div className="col-sm">
						<Column column={columns[0]}/>
					</div>
					<div className="col-sm">
						<Column column={columns[1]}/>
					</div>
					<div className="col-sm">
						<Column column={columns[2]}/>
					</div>
					<div className="col-sm">
						<Column column={columns[3]}/>
					</div>
				</div>
				<div className="row pt-4">
						<div className="col-xs">
							Random Inputs:
						</div>
						<div className="col-sm border border-primary">
							<Random content={this.state.randoms[0]}/>
						</div>
						<div className="col-sm border border-primary">
							<Random content={this.state.randoms[1]}/>
						</div>
						<div className="col-sm border border-primary">
							<Random content={this.state.randoms[1]}/>
					</div>
				</div>
				<div className="row top-buffer">
					<div className="col-sm">
						<RandomizeButton updateRandom={this.updateRandom}/>
					</div>
				</div>
				<div className="row top-buffer">
					<div className="col-xl">
						<IdeasBox ideas={this.state.boards.ideas}/>
					</div>
				</div>
			</div>
    </div>
  );
	}
}

export default App;
