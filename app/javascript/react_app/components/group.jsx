import React, { Component } from "react";
import { Link, } from 'react-router-dom';

class Group extends Component {
  render() {
    const { scientific_name, english_name, swedish_name, total_seen, total_birds, groupedBy } = this.props;
  
    const progress = (total_seen / total_birds) * 100;
    const progressStyle = {
      width: `${progress}%`,
    };

    let groupText = '';

    if (groupedBy === 'orders') {
      groupText = `${scientific_name} / ${swedish_name}`
    } else {
      groupText = `${english_name} / ${swedish_name}`
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
          <p>
            {groupText}
          </p>
        </li>
      </Link>
    );
  }
}

export default Group;
