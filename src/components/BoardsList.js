import React from "react";
import { setColumn } from "../redux/actions";
import { connect } from "react-redux";

class BoardsList extends React.Component {
  constructor(props) {
    super(props);

    this.makeActive = this.makeActive.bind(this);
  }

  makeActive(event) {
    alert("Clicky clicky");
    //this.setActiveBoard(event.target.key);
  }

  render() {
    const boards = this.props.boards;
    debugger;
    const boardsList = boards.map((board, index) => (
      <li onClick={this.makeActive} key={index}>
        {board}
      </li>
    ));
    return (
      <div className="sidenav">
        <ul>{boardsList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { boards } = state;
  return {
    boards: boards,
  };
};

export default connect(mapStateToProps, { setColumn })(BoardsList);
