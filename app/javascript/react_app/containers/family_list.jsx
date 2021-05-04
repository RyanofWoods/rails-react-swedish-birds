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
      <a href={`/families/${scientific_name}`}>
        <li className="list-group-item" key={scientific_name}>
          <p>{english_name} / {swedish_name}</p>
        </li>
      </a>
    );
  }

  render() {
    return (
      <ul className="list-group">
        {
          this.props.families.map((family) => {
            return this.render_family(family);
          })
        }
      </ul>
    );
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchFamilies }, dispatch);
}

function mapStateToProps(state) {
  return {
    families: state.families
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyList);
