import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { markSeen, setFlashMessage } from '../../actions';
import '../../helpers/extend_string_class';
import nameContent from '../../helpers/utils';

import Modal from './modal';
import DetailsModal from './details_modal';
import Checkbox from './checkbox';

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
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleMarkSeen() {
    this.props.markSeen(this.props.scientific_name);
    this.props.setFlashMessage('Bird marked as seen!');
  }

  handleConfirm() {
    this.handleMarkSeen();
    this.toggleSeenModal();
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
      <li id={scientific_name.dashify()} className="list-group-item">
        <div className="list-item-start-small-mobile d-flex align-items-center justify-content-center">
          <Checkbox {...checkboxProps} />
        </div>

        {nameContent({ scientific_name, english_name, swedish_name }, langPref)}

        <small className="list-item-end text-muted hover-pointer" onClick={this.toggleDetailsModal}>{details}</small>

        {
          this.state.showSeenModal && (
            <Modal title="Confirm sighting" close={this.toggleSeenModal}>
              <div className="modal-body">
                <p>Are you sure you want to mark this bird as seen? This cannot be reversed.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary hover-pointer" onClick={this.handleConfirm}>
                  Confirm
                </button>
                <button type="button" className="btn btn-dark hover-pointer" onClick={this.toggleSeenModal}>
                  Close
                </button>
              </div>
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
