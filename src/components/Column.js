import React from "react";
import { setColumn } from "../redux/actions";
import { connect } from "react-redux";

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleDataChange(event) {
    event.preventDefault();
    this.props.setColumn(this.props.id, this.props.name, event.target.value);
  }

  handleNameChange(event) {
    event.preventDefault();
    this.props.setColumn(this.props.id, event.target.value, this.props.data);
  }

  render() {
    // Get the list of elements
    return (
      <div>
        <input
          className="form-control"
          onChange={this.handleNameChange}
          value={this.props.name}
        />
        <div>
          <textarea
            rows="15"
            cols="30"
            className="form-control"
            onChange={this.handleDataChange}
            value={this.props.data}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const column = state.boards.columns[id];

  return {
    id: id,
    name: column.name,
    data: column.data,
  };
};

export default connect(mapStateToProps, { setColumn })(Column);
