import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { fetchGroup } from "../actions";
import { HashLink } from "react-router-hash-link";
import Bird from "./bird";

class BirdList extends Component {
  componentDidMount() {
    const { groupedBy, groupName } = this.props.match.params;

    this.props.fetchGroup(groupedBy, groupName);
  }

  render() {
    const { birds, totalSeen, totalBirds, englishName, scientificName } = this.props;

    const title = englishName || scientificName;

      return (
        <div>
          <h1>
            {title} ({totalSeen}/{totalBirds})
          </h1>
          <HashLink to={`/groups#${scientificName}`}>Go Back</HashLink>
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
    scientificName: state.selectedGroupData.group_scientific_name,
    englishName: state.selectedGroupData.group_english_name,
    swedishName: state.selectedGroupData.group_swedish_name,
    totalSeen: state.selectedGroupData.total_seen,
    totalBirds: state.selectedGroupData.total_birds,
    birds: state.selectedGroupData.birds
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdList);
