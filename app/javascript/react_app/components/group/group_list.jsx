import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { capitalize } from '../../helpers/utils';
import { fetchGroups, sortGroups, setGroupListScrollPos } from '../../actions';

import Group from './group';
import SearchBar from './search_bar';
import GroupHeader from '../shared/group_header';
import PageTitle from '../shared/page_title';
import OptionsBar from '../shared/options_bar';

class GroupList extends Component {
  componentDidMount() {
    const {
      groupedBy, populationThreshold, groupSingular, userPopThres, prevScrollPos,
    } = this.props;

    // check if we need to re-fetch the groups based on the url && user settings
    if (groupedBy !== groupSingular || userPopThres !== populationThreshold) {
      this.props.fetchGroups(groupSingular, userPopThres);
    }

    // scroll back to the last position on this page
    window.scrollTo(prevScrollPos.x, prevScrollPos.y);
  }

  componentWillUnmount() {
    this.props.setGroupListScrollPos(window.scrollX, window.scrollY);
  }

  render() {
    const {
      sortedGroups, totalGroups, totalBirds, totalSeen, groupPlural, userLangPref, sortedBy,
    } = this.props;

    const groupHeaderProps = {
      sortedBy,
      action: this.props.sortGroups,
      userLangPref,
      columns: [
        { title: 'Seen', sortRef: 'seen' },
        { title: 'Names', sortRef: 'name' },
      ],
    };
    const titleProps = {
      title: `${totalGroups} ${capitalize(groupPlural)}`,
      totalSeen,
      totalAmount: totalBirds,
    };

    return (
      <>
        <PageTitle {...titleProps} />
        <SearchBar />
        <OptionsBar />

        <ul className="list-group mt-4">
          <GroupHeader {...groupHeaderProps} />

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

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGroups, sortGroups, setGroupListScrollPos }, dispatch);
};

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
  prevScrollPos: state.groupListScrollPos,
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
