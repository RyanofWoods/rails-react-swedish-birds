import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchFamily } from "../actions";

import "@fortawesome/fontawesome-free/css/all";

class Family extends Component {
  componentDidMount() {
    this.props.fetchFamily(this.props.match.params.family_name);
  }

  render_bird({ scientific_name, english_name, swedish_name, seen }) {
    let seenClasses = "far fa-";
    seenClasses += seen ? "check-square" : "square";

    return (
      <li className="list-group-item" key={scientific_name}>
        <i className={seenClasses} />
        <div>
          <p>{english_name}</p>
          <p>{swedish_name}</p>
        </div>
      </li>
    );
  }

  render() {
    return (
      <div>
        <h1>{`FamilyName (0/100)`}</h1>
        <a className="mb-3" href="/families">
          Go Back
        </a>

        <ul className="list-group">
          {this.props.birds.map((bird) => {
            return this.render_bird(bird);
          })}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFamily }, dispatch);
}

function mapStateToProps(state) {
  return {
    birds: state.selectedFamilyBirds,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Family);
