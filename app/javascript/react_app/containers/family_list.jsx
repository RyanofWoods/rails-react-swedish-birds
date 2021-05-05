import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchFamilies } from '../actions';

class FamilyList extends Component {
  componentDidMount() {
    this.props.fetchFamilies();
  }

  getRGB(numerator, denominator) {
    const deci = numerator / denominator; // percentage as decimal
    const startColor = [235, 55, 40] // color at 0% - rgb -> red
    const endColor = [55, 235, 40]  // color at 100% - rgb -> green
    const colorArray = []

    for (let i = 0; i < 3; i++) {
      // if they are the same number push immediately
      if (startColor[i] === endColor[i]) {
        colorArray.push(startColor[i]);
      } else {
        // calculate difference
        const diff = endColor[i] - startColor[i];
        
        // add difference * percent onto lowest number
        colorArray.push(startColor[i] + (Math.floor(diff * deci)));
      }
    }


    return `rgb(${colorArray.join(',')})`;
  }

  render_family({ scientific_name, english_name, swedish_name, total_seen, total_birds }) {
    const progressStyle = {
      backgroundColor: this.getRGB(total_seen, total_birds)
    }

    return (
      <a href={`/families/${scientific_name}`} key={scientific_name}>
        <li className="list-group-item">
          <div className="progress-indicator" style={progressStyle} />
          <p className="family-list-item-numbers pl-1">
            ({total_seen}/{total_birds})
          </p>
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
        <h1>All {totalFamilies} families: </h1>
        <h3 className="mb-3">
          Birds seen: ({totalSeen}/{totalBirds})
        </h3>

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
    totalSeen: state.familiesData.total_seen,
    totalBirds: state.familiesData.total_birds
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FamilyList);
