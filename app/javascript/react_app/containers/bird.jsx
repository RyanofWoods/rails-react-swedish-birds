/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable quotes */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { markSeen, setFlashMessage } from '../actions';
import Modal from '../components/modal';
import DetailsModal from '../components/details_modal';
import Checkbox from '../components/checkbox';

import { dashify, nameContent } from '../utils';

class Bird extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSeenModal: false,
      showDetailsModal: false,
    };
    this.toggleSeenModal = this.toggleSeenModal.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
    this.handleMarkSeen = this.handleMarkSeen.bind(this);
  }

  toggleSeenModal() {
    this.setState({ showSeenModal: !this.state.showSeenModal });
  }

  toggleDetailsModal() {
    this.setState({ showDetailsModal: !this.state.showDetailsModal });
  }

  handleMarkSeen() {
    this.props.markSeen(this.props.scientific_name);
    this.props.setFlashMessage("Bird marked as seen!");
  }

  render() {
    const {
      scientific_name, english_name, swedish_name, details, seen, seenConfirmation, langPref,
    } = this.props;

    const checkboxProps = {
      checked: seen,
      id: scientific_name,
      // add click event only for birds not seen yet
      ...(!seen && seenConfirmation && { onClick: this.toggleSeenModal }), // confirmation modal
      ...(!seen && !seenConfirmation && { onClick: this.handleMarkSeen }), // no confirmation modal
    };

    return (
      <li id={dashify(scientific_name)} className="list-group-item">
        <div className="list-item-start">
          <Checkbox {...checkboxProps} />
        </div>

        {nameContent({ scientific_name, english_name, swedish_name }, langPref)}

        <small className="list-item-end text-muted hover-pointer" onClick={this.toggleDetailsModal}>{details}</small>

        {
          this.state.showSeenModal && (
            <Modal title="Confirm sighting" confirmButtonText="Confirm" close={this.toggleSeenModal} action={this.handleMarkSeen}>
              <p>Are you sure you want to mark this bird as seen?</p>
            </Modal>
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

const mapStateToProps = (state) => ({
  seenConfirmation: state.settingsData.seenConfirmation,
});

// eslint-disable-next-line arrow-body-style
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ markSeen, setFlashMessage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Bird);
