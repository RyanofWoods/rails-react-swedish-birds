/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';

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

  const textContent = () => {
    switch (langPref) {
      case 'en':
        return <p>{english_name}</p>;
      case 'se':
        return <p>{swedish_name}</p>;
      default:
        return (
          <div>
            <p>{english_name}</p>
            <p>{swedish_name}</p>
          </div>
        );
    }
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
        <p className="group-list-item-numbers pl-1">
          ({total_seen}/{total_birds})
        </p>
        {textContent()}
      </li>
    </Link>
  );
};

export default Group;
