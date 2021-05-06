import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchFamily } from "../actions";
import { markSeen } from "../actions";

import "@fortawesome/fontawesome-free/css/all";

class Family extends Component {
  componentDidMount() {
    this.props.fetchFamily(this.props.match.params.familyName);
  }

  handleClick = (scientific_name) => {
    this.props.markSeen(scientific_name);
  };

  render_bird({ scientific_name, english_name, swedish_name, seen }) {
    let seenClasses = "far fa-";
    seenClasses += seen ? "check-square" : "square hover-pointer hover-opacity";

    let iconProps = {
      className: seenClasses,
      ...(!seen && { onClick: () => this.handleClick(scientific_name) }), // add click event only for birds not seen yet
    };

    return (
      <li className="list-group-item" key={scientific_name}>
        <i {...iconProps} />
        <div>
          <p>{english_name}</p>
          <p>{swedish_name}</p>
        </div>
      </li>
    );
  }

  render() {
    const { birds, totalSeen, totalBirds, englishName } = this.props;

    return (
      <div>
        <h1>
          {englishName} ({totalSeen}/{totalBirds})
        </h1>
        <a className="mb-3" href="/families">
          Go Back
        </a>

        <ul className="list-group">
          {birds.map((bird) => {
            return this.render_bird(bird);
          })}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFamily, markSeen }, dispatch);
}

function mapStateToProps(state) {
  return {
    scientificName: state.selectedFamilyData.family_scientific_name,
    englishName: state.selectedFamilyData.family_english_name,
    swedishName: state.selectedFamilyData.family_swedish_name,
    totalSeen: state.selectedFamilyData.total_seen,
    totalBirds: state.selectedFamilyData.total_birds,
    birds: state.selectedFamilyData.birds
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Family);
