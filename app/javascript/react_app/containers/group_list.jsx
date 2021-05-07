import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchGroups } from '../actions';
import Group from '../components/group';

class GroupList extends Component {
  componentDidMount() {
    this.props.fetchGroups();
  }

  render() {
    const { groups, totalGroups, totalBirds, totalSeen } = this.props;

    return (
      <div>
        <h1>All {totalGroups} families: </h1>
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
    groups: state.groupsData.groups,
    totalGroups: state.groupsData.total_groups,
    totalSeen: state.groupsData.total_seen,
    totalBirds: state.groupsData.total_birds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);
