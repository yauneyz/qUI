import React from "react";
import Idea from "./Idea";
import {
  setActiveBoard,
  setStoreState,
  renameBoard,
  deleteBoard,
  reorderIdeas,
} from "../redux/actions";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class IdeasList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
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

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    this.props.reorderIdeas(result.source.index, result.destination.index);
  }

  render() {
    const active = this.props.active;
    const ideas = this.props.boards[active].ideas;

    const ideasList = ideas.map((idea, index) => (
      <Draggable key={idea + index} draggableId={idea + index} index={index}>
        {(provided, _snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <Idea id={index} />
            </div>
          );
        }}
      </Draggable>
    ));

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="ideasList">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {ideasList}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
  reorderIdeas,
})(IdeasList);
