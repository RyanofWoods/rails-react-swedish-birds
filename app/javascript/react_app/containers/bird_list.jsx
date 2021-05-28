/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HashLink } from 'react-router-hash-link';
import { fetchGroup, sortBirds } from '../actions';

import Bird from './bird';

class BirdList extends Component {
  componentDidMount() {
    const { groupedBy, groupName } = this.props.match.params;

    this.props.fetchGroup(groupedBy, groupName, this.props.popThres);
  }

  sortedByIndicator(header) {
    const { sortedBy } = this.props;
    if (!sortedBy) return null;

    const getSymbol = (orderedBy) => {
      switch (orderedBy) {
        case 'asc':
          return '∧';
        case 'desc':
          return '∨';
        default:
          return null;
      }
    };

    const [key] = Object.keys(this.props.sortedBy);

    if (header !== key) {
      return null;
    }

    return getSymbol(sortedBy[key]);
  }

  render() {
    const {
      sortedBirds, totalSeen, totalBirds, englishName, scientificName, userLangPref,
    } = this.props;

    const title = englishName || scientificName || '...';

    return (
      <>
        <h1>
          {title} ({totalSeen}/{totalBirds})
        </h1>
        <HashLink to={`/groups#${scientificName}`}>Go Back</HashLink>
        <ul className="list-group mt-3">
          <li key="group-header" className="list-group-item group-header bird-card">
            <div className="bird-card-info">
              <div className="hover-pointer pl-1" onClick={() => this.props.sortBirds('seen')}>
                {this.sortedByIndicator('seen') || '-'}
              </div>
              <p className="hover-pointer" onClick={() => this.props.sortBirds('name', userLangPref)}>
                Names {this.sortedByIndicator('name')}
              </p>
            </div>
            <p className="hover-pointer" onClick={() => this.props.sortBirds('details')}>
              {this.sortedByIndicator('details')} Details
            </p>
          </li>
          {
            sortedBirds.map((birdProps) => (
              <Bird key={birdProps.scientific_name} langPref={userLangPref} {...birdProps} />
            ))
          }
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  scientificName: state.selectedGroupData.group_scientific_name,
  englishName: state.selectedGroupData.group_english_name,
  swedishName: state.selectedGroupData.group_swedish_name,
  totalSeen: state.selectedGroupData.total_seen,
  totalBirds: state.selectedGroupData.total_birds,
  sortedBy: state.selectedGroupData.sortedBy,
  sortedBirds: state.selectedGroupData.sortedBirds,
  userLangPref: state.settingsData.language,
  popThres: state.settingsData.populationThreshold,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchGroup, sortBirds }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BirdList);
