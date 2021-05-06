import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchFamily } from "../actions";
import { HashLink } from "react-router-hash-link";
import Bird from "./bird";

class BirdList extends Component {
  componentDidMount() {
    this.props.fetchFamily(this.props.match.params.familyName);
  }

  render() {
    const { birds, totalSeen, totalBirds, englishName, scientificName } = this.props;

    return (
      <div>
        <h1>
          {englishName} ({totalSeen}/{totalBirds})
        </h1>
        <HashLink to={`/families#${scientificName}`}>Go Back</HashLink>
        <ul className="list-group mt-3">
          {birds.map((birdProps) => {
            return <Bird key={birdProps.scientific_name} {...birdProps} />;
          })}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    scientificName: state.selectedFamilyData.family_scientific_name,
    englishName: state.selectedFamilyData.family_english_name,
    swedishName: state.selectedFamilyData.family_swedish_name,
    totalSeen: state.selectedFamilyData.total_seen,
    totalBirds: state.selectedFamilyData.total_birds,
    birds: state.selectedFamilyData.birds
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFamily }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdList);
