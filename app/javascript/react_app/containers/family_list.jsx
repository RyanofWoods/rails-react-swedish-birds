import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFamilies } from '../actions';
import Family from './family';

class FamilyList extends Component {
  componentDidMount() {
    this.props.fetchFamilies();
  }

  render() {
    const { families, totalFamilies, totalBirds, totalSeen } = this.props;

    return (
      <div>
        <h1>All {totalFamilies} families: </h1>
        <h3 className="mb-3">
          Birds seen: ({totalSeen}/{totalBirds})
        </h3>

        <ul className="list-group">
          {families.map((family) => {
            return <Family key={family.scientific_name} {...family}/>;
          })}
        </ul>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFamilies }, dispatch);
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    families: state.familiesData.groups,
    totalFamilies: state.familiesData.total_families,
    totalSeen: state.familiesData.total_seen,
    totalBirds: state.familiesData.total_birds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyList);
