import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { markSeen, setFlashMessage } from '../actions';
import { dashify, nameContent } from '../utils';

import Modal from '../components/modal';
import DetailsModal from '../components/details_modal';
import Checkbox from '../components/checkbox';

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

  handleMarkSeen() {
    this.props.markSeen(this.props.scientific_name);
    this.props.setFlashMessage('Bird marked as seen!');
  }

  toggleDetailsModal() {
    this.setState((prevState) => ({ showDetailsModal: !prevState.showDetailsModal }));
  }

  toggleSeenModal() {
    this.setState((prevState) => ({ showSeenModal: !prevState.showSeenModal }));
  }

  render() {
    const {
      scientific_name, english_name, swedish_name, details, seen, seenConfirmation, langPref,
    } = this.props;

    const checkboxProps = {
      classes: 'checkbox-checked-hover-pointer-none mr-3',
      checked: seen,
      id: scientific_name,
      // add click event only for birds not seen yet
      ...(!seen && seenConfirmation && { onClick: this.toggleSeenModal }), // confirmation modal
      ...(!seen && !seenConfirmation && { onClick: this.handleMarkSeen }), // no confirmation modal
    };

    return (
      <li id={dashify(scientific_name)} className="list-group-item">
        <div className="list-item-start d-flex align-items-center justify-content-center">
          <Checkbox {...checkboxProps} />
        </div>

        {nameContent({ scientific_name, english_name, swedish_name }, langPref)}

        <small className="list-item-end text-muted hover-pointer" onClick={this.toggleDetailsModal}>{details}</small>

        {
          this.state.showSeenModal && (
            <Modal title="Confirm sighting" confirmButtonText="Confirm" close={this.toggleSeenModal} action={this.handleMarkSeen}>
              <p>Are you sure you want to mark this bird as seen? This cannot be reversed.</p>
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
