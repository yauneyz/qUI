import React from 'react';
import { connect } from "react-redux"
import store from "./redux/store";
import './App.css';

import {Random, RandomizeButton} from './components/Random'
import Column from './components/Column'
import LoginButton from './components/LoginButton'
import IdeasBox from './components/IdeasBox'

import { login,setStoreState, setLoaded, setRandom } from './redux/actions'
import save from "./utils/save"

const baseURL = "http://localhost:8000/"; 
class App extends React.Component {
constructor(props) {
    super(props);

		// Bind methods
		this.updateRandom = this.updateRandom.bind(this);
	}

	getBoards(){ 
		// This only runs if we are logged in
		fetch(baseURL+"boards", {credentials: 'include'})
		.then((res) => res.json())
		.then(
			(res) => {
				if(res != null){
					const boards = res[0];
					this.props.setStoreState(boards);
					this.props.setLoaded(true);
					
					// Set the save timer
					this.interval = setInterval(() => save(),2000)
				}
		},
		(error) => {
			this.props.setLoaded(false);
		})
	}

	componentDidMount(){
		var self = this;
		fetch(baseURL + "auth/user",{credentials: 'include'})
			.then((res)=> {console.log(res);return res})
			.then((res)=>res.json())
			.then(function(res){
				if(res.success){
					self.props.login(true);
				}
			})
	}

	componentWillUnmount(){
		if(this.interval){
			clearInterval(this.interval)
		}
	}

	updateRandom(){
		this.props.setRandom()
	}

	render(){
		// See if we are already logged in
		if(!this.props.loggedIn){
			return (
				<div>
					<LoginButton />
					Please log in
				</div>
				)
		}

		// Loading
		if(!this.props.isLoaded){
			this.getBoards()
			return (
				<div>
					Loading
				</div>
				)
		}

		// Logged in, proceed normally
		
		// Set the board that is going to be used here
		let board = this.props.boards
		let columns = board.columns
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
						Board: {this.props.boards.name}
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
							<Random content={this.props.randoms[0]}/>
						</div>
						<div className="col-sm border border-primary">
							<Random content={this.props.randoms[1]}/>
						</div>
						<div className="col-sm border border-primary">
							<Random content={this.props.randoms[1]}/>
					</div>
				</div>
				<div className="row top-buffer">
					<div className="col-sm">
						<RandomizeButton updateRandom={this.updateRandom}/>
					</div>
				</div>
				<div className="row top-buffer">
					<div className="col-xl">
						<IdeasBox ideas={this.props.boards.ideas} getBoards={this.getBoards}/>
					</div>
				</div>
			</div>
    </div>
  );
	}
}

const mapStateToProps = state => {
	const { loggedIn, boards, randoms, isLoaded } = state;
	return { 
		boards: boards,
		randoms: randoms,
		isLoaded: isLoaded,
		loggedIn: loggedIn
	}
}

export default connect(mapStateToProps,{login,setRandom,setLoaded,setStoreState})(App);
