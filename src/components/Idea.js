import React from "react";
import { setIdeas } from "../redux/actions";
import { connect } from "react-redux";

class Idea extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    let newIdeas = this.props.ideas;
    newIdeas[this.props.id] = event.target.value;
    this.props.setIdeas(newIdeas, this.props.active);
  }

  handleDelete(event) {
    event.preventDefault();
    let newIdeas = this.props.ideas;
    newIdeas.splice(this.props.id, 1);
    this.props.setIdeas(newIdeas, this.props.active);
  }

  render() {
    return (
      <div className="row idea">
        <div className="col-xl">
          <textarea
            rows="2"
            cols="60"
            width="100%"
            height="100%"
            value={this.props.idea}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary" onClick={this.handleDelete}>
            Remove
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const ideas = state.boards[state.active].ideas;
  const { active } = state;
  const { id } = ownProps;
  return {
    ideas: ideas,
    id: id,
    idea: ideas[id],
    active: active,
  };
};

export default connect(mapStateToProps, { setIdeas })(Idea);
