import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import {
  setActiveBoard,
  setStoreState,
  renameBoard,
  deleteBoard,
} from "../redux/actions";
import { connect } from "react-redux";

class BoardsList extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      mouseX: null,
      mouseY: null,
      selected: null,
      renameFocus: null,
      boardNames: this.props.boards.map((board) => board.name),
    };
    this.state = this.initialState;
    this.addBoard = this.addBoard.bind(this);
    this.menuOpen = this.menuOpen.bind(this);
    this.menuClose = this.menuClose.bind(this);
    this.openBoardRename = this.openBoardRename.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.deleteSelectedBoard = this.deleteSelectedBoard.bind(this);
    this.handleClickAway = this.handleClickAway.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.updateBoardNames = this.updateBoardNames.bind(this);
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
    this.resetBoardNames();
  }

  openBoardRename(event) {
    this.menuClose();
    this.setState({ renameFocus: this.state.selected });
  }

  // Pick up on enter and escape presses
  handleKeyPress(event, index) {
    if (event.keyCode === 13 || event.keyCode === 27) {
      this.handleClickAway(event, index);
    }
  }

  handleClickAway(_event, index) {
    this.props.renameBoard(index, this.state.boardNames[index]);
    this.setState({ renameFocus: null });
  }

  deleteSelectedBoard() {
    this.props.deleteBoard(this.state.selected);
    this.menuClose();
    this.resetBoardNames();
  }

  resetBoardNames() {
    this.setState({ boardNames: this.props.boards.map((board) => board.name) });
  }

  menuOpen(event, index) {
    event.preventDefault();
    this.setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      selected: index,
    });
  }

  menuClose() {
    this.setState({
      ...this.initialState,
      boardNames: this.state.boardNames,
    });
  }

  updateBoardNames(event, index) {
    this.setState({
      boardNames: this.state.boardNames.map((name, i) => {
        if (i === index) {
          return event.target.value;
        } else {
          return name;
        }
      }),
    });
  }

  render() {
    const boards = this.props.boards;
    const active = this.props.active;
    const boardNames = this.state.boardNames;

    // Solve scoping issues
    const renameFocus = this.state.renameFocus;
    const makeActive = this.makeActive;
    const menuOpen = this.menuOpen;
    const handleClickAway = this.handleClickAway;
    const handleKeyPress = this.handleKeyPress;
    const updateBoardNames = this.updateBoardNames;
    debugger;

    const boardsList = boards.map(function (board, index) {
      // Return a textbox if it's in focus
      if (index === renameFocus) {
        return (
          <ClickAwayListener
            onClickAway={(event) => handleClickAway(event, index)}
          >
            <TextField
              value={boardNames[index]}
              autoFocus="true"
              onChange={(event) => updateBoardNames(event, index)}
              onKeyDown={(event) => handleKeyPress(event, index)}
              key={index}
            />
          </ClickAwayListener>
        );
      }
      // The normal listing
      else {
        return (
          <li
            onClick={() => makeActive(index)}
            onContextMenu={(event) => menuOpen(event, index)}
            key={index}
            className={active === index ? "board-name active" : "board-name"}
          >
            {board.name}
          </li>
        );
      }
    });
    return (
      <div className="sidenav">
        <ul>{boardsList}</ul>
        <Menu
          keepMounted
          open={this.state.mouseY !== null}
          onClose={this.menuClose}
          anchorReference="anchorPosition"
          anchorPosition={
            this.state.mouseY !== null && this.state.mouseX !== null
              ? { top: this.state.mouseY, left: this.state.mouseX }
              : undefined
          }
        >
          <MenuItem onClick={this.openBoardRename}>Rename</MenuItem>
          <MenuItem onClick={this.deleteSelectedBoard}>Delete</MenuItem>
        </Menu>

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
  deleteBoard,
  setActiveBoard,
  setStoreState,
  renameBoard,
})(BoardsList);
