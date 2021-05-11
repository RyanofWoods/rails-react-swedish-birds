import React, { Component } from "react";
import { Link, } from 'react-router-dom';
import { connect } from "react-redux";

class Group extends Component {
  render() {
    const { scientific_name, english_name, swedish_name, total_seen, total_birds, groupedBy, langPref } = this.props;
  
    const progress = (total_seen / total_birds) * 100;
    const progressStyle = {
      width: `${progress}%`,
    };

    const textContent = () => {
      switch (langPref) {
        case 'en':
          return english_name;
        case 'se':
            return swedish_name;
        default:
          return `${english_name} / ${swedish_name}`;
      }
    }

    return (
      <Link to={`/${groupedBy}/${scientific_name}`}>
        <li className="list-group-item" id={scientific_name}>
          <div className="progress sighting-progress">
            <div className="progress-bar" role="progressbar" style={progressStyle} aria-valuenow={Math.floor(progress)} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <p className="family-list-item-numbers pl-1">
            ({total_seen}/{total_birds})
          </p>
          <p>{textContent()}</p>
        </li>
      </Link>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    langPref: state.settingsData.language,
  };
};

export default connect(mapStateToProps)(Group);
