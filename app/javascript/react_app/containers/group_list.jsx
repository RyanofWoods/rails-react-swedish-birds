/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups } from '../actions';

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

  render() {
    const {
      groups, totalGroups, totalBirds, totalSeen, groupPlural, userLangPref,
    } = this.props;

    return (
      <>
        <h1>{totalGroups} {groupPlural}: </h1>
        <h3 className="mb-3">
          Birds seen: ({totalSeen}/{totalBirds})
        </h3>

        <ul className="list-group">
          {
            groups.map((group) => (
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchGroups }, dispatch);

const mapStateToProps = (state) => ({
  groupedBy: state.groupsData.grouped_by, // whether the data is grouped by 'order' or 'family'
  populationThreshold: state.groupsData.population_threshold, // threshold used to filter the data
  groups: state.groupsData.groups,
  totalGroups: state.groupsData.total_groups,
  totalSeen: state.groupsData.total_seen,
  totalBirds: state.groupsData.total_birds,
  userLangPref: state.settingsData.language,
  userPopThres: state.settingsData.populationThreshold,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
