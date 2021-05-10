import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups } from '../actions';
import Group from '../components/group';

class GroupList extends Component {
  componentDidMount() {
    const { groupedBy, fetchGroups} = this.props;
    const URLGroupPlural = this.props.match.params.groupBy;
    let URLGroupSingular = '';

    if (URLGroupPlural === 'orders') {
      URLGroupSingular = 'order'
    } else {
      URLGroupSingular = 'family'
    }

     if (URLGroupSingular !== groupedBy) {
       fetchGroups(URLGroupSingular);
     } 
  }

  render() {
    const { groups, totalGroups, totalBirds, totalSeen, match } = this.props;

    return (
      <div>
        <h1>All {totalGroups} {match.params.groupBy}: </h1>
        <h3 className="mb-3">
          Birds seen: ({totalSeen}/{totalBirds})
        </h3>

        <ul className="list-group">
          {groups.map((group) => {
            return <Group key={group.scientific_name} {...group}/>;
          })}
        </ul>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGroups }, dispatch);
}

const mapStateToProps = (state) => {
  return {
    groupedBy: state.groupsData.grouped_by,
    groups: state.groupsData.groups,
    totalGroups: state.groupsData.total_groups,
    totalSeen: state.groupsData.total_seen,
    totalBirds: state.groupsData.total_birds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
