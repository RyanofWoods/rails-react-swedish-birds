import React from 'react';
import { Link } from 'react-router-dom';

import { nameContent } from '../utils';

const Group = (props) => {
  const {
    scientific_name,
    english_name,
    swedish_name,
    total_seen,
    total_birds,
    groupedBy,
    langPref,
  } = props;

  const progress = (total_seen / total_birds) * 100;
  const progressStyle = {
    width: `${progress}%`,
  };

  return (
    <Link to={`/${groupedBy}/${scientific_name}`}>
      <li
        className="list-group-item group-item-with-progress"
        id={scientific_name}
      >
        <div className="progress sighting-progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={progressStyle}
            aria-label="progress"
            aria-valuenow={Math.floor(progress)}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
        <p className="list-item-start">
          <span>{total_seen}</span>/{total_birds}
        </p>
        {nameContent({ scientific_name, english_name, swedish_name }, langPref)}
      </li>
    </Link>
  );
};

export default Group;
