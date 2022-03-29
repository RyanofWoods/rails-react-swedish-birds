import React, { Component } from 'react';

import '../../helpers/extend_string_class';
import nameContent from '../../helpers/utils';

import DetailsModal from './details_modal';
import Checkbox from './checkbox';
import ObservationModal from './observation_modal';

class Bird extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSeenModal: false,
      showDetailsModal: false,
    };

    this.toggleSeenModal = this.toggleSeenModal.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
  }

  toggleSeenModal() {
    this.setState((prevState) => ({ showSeenModal: !prevState.showSeenModal }));
  }

  toggleDetailsModal() {
    this.setState((prevState) => ({ showDetailsModal: !prevState.showDetailsModal }));
  }

  render() {
    const {
      scientific_name, english_name, swedish_name, details, seen, langPref,
    } = this.props;

    const checkboxProps = {
      classes: 'checkbox-checked-hover-pointer-none mr-3',
      checked: seen,
      id: scientific_name,
      // add click event only for birds not seen yet
      ...(!seen && { onClick: this.toggleSeenModal }),
    };

    return (
      <li id={scientific_name.dashify()} className="list-group-item">
        <div className="list-item-start-small-mobile d-flex align-items-center justify-content-center">
          <Checkbox {...checkboxProps} />
        </div>

        {nameContent({ scientific_name, english_name, swedish_name }, langPref)}

        <small className="list-item-end text-muted hover-pointer" onClick={this.toggleDetailsModal}>{details}</small>

        {
          this.state.showSeenModal && (
            <ObservationModal close={this.toggleSeenModal} scientificName={scientific_name} />
          )
        }
        {
          this.state.showDetailsModal && (
            <DetailsModal close={this.toggleDetailsModal} />
          )
        }
      </li>
    );
  }
}

export default Bird;
