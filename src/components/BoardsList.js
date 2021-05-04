import React from "react";
import { setColumn, setActiveBoard, setStoreState } from "../redux/actions";
import { connect } from "react-redux";

class BoardsList extends React.Component {
  constructor(props) {
    super(props);
    this.addBoard = this.addBoard.bind(this);
  }
  makeActive(index) {
    this.props.setActiveBoard(index);
  }

  addBoard(event) {
    event.preventDefault();
    let boards = this.props.boards;
    const newBoardIndex = boards.length;
    const newBoard = {
      name: "New Board",
      columns: [],
      ideas: [],
    };
    boards.push(newBoard);
    this.props.setStoreState(boards);
    this.props.setActiveBoard(newBoardIndex);
  }

  componentDidUpdate(_prevProps, _prevState) {
    console.log("Component did update");
  }

  render() {
    const boards = this.props.boards;
    const active = this.props.active;
    const boardsList = boards.map((board, index) => (
      <li
        onClick={() => this.makeActive(index)}
        key={index}
        className={active === index ? "active" : ""}
      >
        {board.name}
      </li>
    ));
    return (
      <div className="sidenav">
        <ul>{boardsList}</ul>
        <button className="btn add-board" onClick={this.addBoard}>
          Add Board
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { boards, active } = state;
  return {
    boards: boards,
    active: active,
  };
};

export default connect(mapStateToProps, {
  setColumn,
  setActiveBoard,
  setStoreState,
})(BoardsList);
