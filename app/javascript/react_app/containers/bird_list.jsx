/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashLink } from 'react-router-hash-link';
import { fetchGroup } from '../actions';

import Wrapper from '../components/wrapper';
import Bird from './bird';

class BirdList extends Component {
  componentDidMount() {
    const { groupedBy, groupName } = this.props.match.params;

    this.props.fetchGroup(groupedBy, groupName, this.props.popThres);
  }

  render() {
    const {
      birds, totalSeen, totalBirds, englishName, scientificName, langPref,
    } = this.props;

    const title = englishName || scientificName;

    return (
      <Wrapper>
        <h1>
          {title} ({totalSeen}/{totalBirds})
        </h1>
        <HashLink to={`/groups#${scientificName}`}>Go Back</HashLink>
        <ul className="list-group mt-3">
          {
            birds.map((birdProps) => (
              <Bird key={birdProps.scientific_name} langPref={langPref} {...birdProps} />
            ))
          }
        </ul>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  scientificName: state.selectedGroupData.group_scientific_name,
  englishName: state.selectedGroupData.group_english_name,
  swedishName: state.selectedGroupData.group_swedish_name,
  totalSeen: state.selectedGroupData.total_seen,
  totalBirds: state.selectedGroupData.total_birds,
  birds: state.selectedGroupData.birds,
  langPref: state.settingsData.language,
  popThres: state.settingsData.populationThreshold,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchGroup }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BirdList);
