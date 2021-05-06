import React, { Component } from "react";
import { connect } from "react-redux";

class Family extends Component {

  render() {
    const { scientific_name, english_name, swedish_name, total_seen, total_birds } = this.props;
  
    const progress = (total_seen / total_birds) * 100;
    const progressStyle = {
      width: `${progress}%`,
    };

    return (
      <a href={`/families/${scientific_name}`}>
        <li className="list-group-item" id={scientific_name}>
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
}

export default Family;
