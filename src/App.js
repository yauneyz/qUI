import React from "react";
import { connect } from "react-redux";
import "./App.css";

import { Random, RandomizeButton } from "./components/Random";
import Column from "./components/Column";
import LoginButton from "./components/LoginButton";
import DeleteBoardButton from "./components/DeleteBoardButton";
import RegisterForm from "./components/RegisterForm";
import LogoutButton from "./components/LogoutButton";
import BoardsList from "./components/BoardsList";
import Idea from "./components/Idea";
import IdeasList from "./components/IdeasList";

import {
  login,
  setIdeas,
  setStoreState,
  setLoaded,
  setRandom,
  setActiveBoard,
} from "./redux/actions";
import save from "./utils/save";

const baseURL = "http://localhost:8000/";
class App extends React.Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.updateRandom = this.updateRandom.bind(this);
    this.addIdea = this.addIdea.bind(this);
  }

  // Add idea
  addIdea() {
    let ideas = this.props.boards[this.props.active].ideas;
    ideas.push("");
    this.props.setIdeas(ideas, this.props.active);
  }

  getBoards() {
    // This only runs if we are logged in
    fetch(baseURL + "boards", { credentials: "include" })
      .then((res) => res.json())
      .then(
        (res) => {
          if (res != null) {
            const { boards, active } = res;
            this.props.setStoreState(boards);
            this.props.setActiveBoard(active);
            this.props.setLoaded(true);

            // Set a timer so we don't clobber old state with new state
            // When the timer expires after 3 seconds, start saving
            setTimeout(
              setInterval(() => save(), 100),
              3000
            );
          }
        },
        (error) => {
          this.props.setLoaded(false);
        }
      );
  }

  componentDidMount() {
    var self = this;
    fetch(baseURL + "auth/user", { credentials: "include" })
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((res) => res.json())
      .then(function (res) {
        if (res.success) {
          self.props.login(true);
        }
      });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateRandom() {
    this.props.setRandom();
  }

  render() {
    // See if we are already logged in
    if (!this.props.loggedIn) {
      return (
        <div>
          <div>
            Log In:
            <LoginButton />
          </div>
          <div>
            Register:
            <RegisterForm />
          </div>
        </div>
      );
    }

    // Loading
    if (!this.props.isLoaded) {
      this.getBoards();
      return <div>Loading</div>;
    }

    // Logged in, proceed normally

    // Set the board that is going to be used here

    // Some useful constants
    const boards = this.props.boards;
    const active = this.props.active;
    const columns = this.props.boards[active].columns;
    const ideas = this.props.boards[active].ideas;
    const randoms = this.props.randoms;

    // The column, ideas, and random blocks
    //
    const colsList = columns.map((column, index) => (
      <div className="col-sm">
        <Column id={index} key={index} />
      </div>
    ));

    const randomsList = randoms.map((random, index) => (
      <div className="col-sm border border-primary">
        <Random content={random} key={index} />
      </div>
    ));

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

        {/* List of the user's boards */}
        <BoardsList />

        <div className="main">
          <div className="container">
            {/* App Title */}
            <div className="app-title">Idea Editor</div>

            {/* Logout Button */}
            <LogoutButton />

            {/* Delete Board Button */}
            <DeleteBoardButton />

            {/* Columns */}
            <div className="row pt-1">{colsList}</div>

            {/* Randoms */}
            <div className="row pt-4">
              <div className="col-xs">Random Inputs:</div>
              {randomsList}
            </div>
            <div className="row top-buffer">
              <div className="col-sm">
                <RandomizeButton updateRandom={this.updateRandom} />
              </div>
            </div>
            <div className="row top-buffer">
              <div className="ideas-header">
                Ideas
                <button
                  className="btn btn-primary float-right"
                  onClick={this.addIdea}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="row">
              <IdeasList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, boards, randoms, isLoaded, active } = state;
  return {
    boards: boards,
    randoms: randoms,
    isLoaded: isLoaded,
    loggedIn: loggedIn,
    active: active,
  };
};

export default connect(mapStateToProps, {
  login,
  setRandom,
  setIdeas,
  setLoaded,
  setStoreState,
  setActiveBoard,
})(App);
