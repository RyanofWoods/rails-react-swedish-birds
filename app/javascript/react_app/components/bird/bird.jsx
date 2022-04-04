import React, { useState } from 'react';

import '../../helpers/extend_string_class';
import nameContent from '../../helpers/utils';

import DetailsModal from './details_modal';
import Checkbox from './checkbox';
import ObservationModal from './observation_modal';

const Bird = (props) => {
  const [showSeenModal, setShowSeenModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const {
    scientific_name, english_name, swedish_name, details, seen, langPref,
  } = props;

  const toggleSeenModal = () => {
    setShowSeenModal((prevState) => !prevState);
  };

  const toggleDetailsModal = () => {
    setShowDetailsModal((prevState) => !prevState);
  };

  const checkboxProps = {
    classes: 'checkbox-checked-hover-pointer-none mr-3',
    checked: seen,
    id: scientific_name,
    // add click event only for birds not seen yet
    ...(!seen && { onClick: toggleSeenModal }),
  };

  return (
    <li id={scientific_name.dashify()} className="list-group-item">
      <div className="list-item-start-small-mobile d-flex align-items-center justify-content-center">
        <Checkbox {...checkboxProps} />
      </div>

      {nameContent({ scientific_name, english_name, swedish_name }, langPref)}

      <small className="list-item-end text-muted hover-pointer" onClick={toggleDetailsModal}>{details}</small>

      {
        showSeenModal && (
          <ObservationModal close={toggleSeenModal} scientificName={scientific_name} />
        )
      }
      {
        showDetailsModal && (
          <DetailsModal close={toggleDetailsModal} {...props} />
        )
      }
    </li>
  );
};

export default Bird;
