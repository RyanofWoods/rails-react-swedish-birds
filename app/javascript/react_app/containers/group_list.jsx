/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups, sortGroups } from '../actions';

import Group from '../components/group';

class GroupList extends Component {
  componentDidMount() {
    const {
      groupedBy, populationThreshold, groupSingular, userPopThres,
    } = this.props;

    // check if we need to re-fetch the groups based on the url && user settings
    if (groupedBy !== groupSingular || userPopThres !== populationThreshold) {
      this.props.fetchGroups(groupSingular, userPopThres);
    }
  }

  sortedByIndicator(header) {
    const { sortedBy } = this.props;
    if (!sortedBy) return '';

    const getSymbol = (orderedBy) => {
      switch (orderedBy) {
        case 'asc':
          return '∧';
        case 'desc':
          return '∨';
        default:
          return '';
      }
    };

    const getShorthand = (lang) => {
      switch (lang) {
        case 'english_name':
          return 'EN';
        case 'swedish_name':
          return 'SE';
        default:
          return '';
      }
    };

    const [key] = Object.keys(sortedBy);

    if (header === key) {
      return getSymbol(sortedBy[key]);
    } if (header === 'name' && (key === 'english_name' || key === 'swedish_name')) {
      return `(${getShorthand(key)} ${getSymbol(sortedBy[key])})`;
    }
    return '';
  }

  render() {
    const {
      sortedGroups, totalGroups, totalBirds, totalSeen, groupPlural, userLangPref,
    } = this.props;

    return (
      <>
        <h1>{totalGroups} {groupPlural}: </h1>
        <h4 className="mb-3">
          Birds seen: ({totalSeen}/{totalBirds})
        </h4>

        <ul className="list-group">
          <li key="group-header" className="list-group-item group-header">
            <p className="list-item-start hover-pointer" onClick={() => this.props.sortGroups('seen')}>
              Seen {this.sortedByIndicator('seen')}
            </p>
            <div className="hover-pointer">
              <p onClick={() => this.props.sortGroups('name', userLangPref)}>
                Names {this.sortedByIndicator('name')}
              </p>
            </div>
          </li>
          {
            sortedGroups.map((group) => (
              <Group
                key={group.scientific_name}
                groupedBy={groupPlural}
                langPref={userLangPref}
                {...group}
              />
            ))
          }
        </ul>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchGroups, sortGroups }, dispatch);

const mapStateToProps = (state) => ({
  groupedBy: state.groupsData.grouped_by, // whether the data is grouped by 'order' or 'family'
  populationThreshold: state.groupsData.population_threshold, // threshold used to filter the data
  sortedGroups: state.groupsData.sortedGroups,
  sortedBy: state.groupsData.sortedBy,
  totalGroups: state.groupsData.total_groups,
  totalSeen: state.groupsData.total_seen,
  totalBirds: state.groupsData.total_birds,
  userLangPref: state.settingsData.language,
  userPopThres: state.settingsData.populationThreshold,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
