import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFamilies } from '../actions';

class FamilyList extends Component {
  componentDidMount() {
    this.props.fetchFamilies();
  }

  render_family ({ scientific_name, english_name, swedish_name }) {
    return (
      <a href={`/families/${scientific_name}`} key={scientific_name}>
        <li className="list-group-item">
          <p>
            {english_name} / {swedish_name}
          </p>
        </li>
      </a>
    );
  }

  render() {
    const { families, totalFamilies, totalBirds, totalSeen } = this.props;

    return (
      <div>
        <h1>All {totalFamilies} Swedish families: </h1>
        <h3 className="mb-3">Birds seen: ({totalSeen}/{totalBirds})</h3>

        <ul className="list-group">
          {families.map((family) => {
            return this.render_family(family);
          })}
        </ul>
      </div>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFamilies }, dispatch);
}

function mapStateToProps(state) {
  return {
    families: state.familiesData.families,
    totalFamilies: state.familiesData.total_families,
    totalBirds: state.familiesData.total_birds,
    totalSeen: state.familiesData.total_seen
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyList);
