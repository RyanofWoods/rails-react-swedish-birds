import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { markSeen } from "../actions";

import "@fortawesome/fontawesome-free/css/all";

class Bird extends Component {
  handleClick = (scientific_name) => {
    this.props.markSeen(scientific_name);
  };

  render() {
    const { scientific_name, english_name, swedish_name, seen } = this.props;

    let seenClasses = "far fa-";
    seenClasses += seen ? "check-square" : "square hover-pointer hover-opacity";

    let iconProps = {
      className: seenClasses,
      ...(!seen && { onClick: () => this.handleClick(scientific_name) }), // add click event only for birds not seen yet
    };

    return (
      <li className="list-group-item">
        <i {...iconProps} />
        <div>
          <p>{english_name}</p>
          <p>{swedish_name}</p>
        </div>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ markSeen }, dispatch);
}

export default connect(null, mapDispatchToProps)(Bird);
