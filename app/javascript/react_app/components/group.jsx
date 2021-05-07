import React, { Component } from "react";

class Group extends Component {
  render() {
    const { scientific_name, english_name, swedish_name, total_seen, total_birds } = this.props;
  
    const progress = (total_seen / total_birds) * 100;
    const progressStyle = {
      width: `${progress}%`,
    };

    return (
      <a href={`/groups/${scientific_name}`}>
        <li className="list-group-item" id={scientific_name}>
          <div className="progress sighting-progress">
            <div className="progress-bar" role="progressbar" style={progressStyle} aria-valuenow={Math.floor(progress)} aria-valuemin="0" aria-valuemax="100"></div>
          </div>
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

export default Group;
