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

    this.today = new Date().toLocaleDateString('en-CA');

    this.state = {
      showSeenModal: false,
      showDetailsModal: false,
      dateUnknown: false,
      observedAt: this.today,
      note: '',
    };

    this.toggleSeenModal = this.toggleSeenModal.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
    this.handleMarkSeen = this.handleMarkSeen.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDateUnknown = this.handleDateUnknown.bind(this);
    this.handleDatePicked = this.handleDatePicked.bind(this);
    this.handleNoteChanged = this.handleNoteChanged.bind(this);
  }

  handleMarkSeen() {
    const observationDate = this.state.observedAt === '' ? 0 : this.state.observedAt;
    this.props.markSeen({
      birdScientificName: this.props.scientific_name,
      note: this.state.note,
      observedAt: observationDate,
    });
    this.props.setFlashMessage('Bird marked as observed!');
  }

  handleConfirm(event) {
    event.preventDefault();
    this.handleMarkSeen();
    this.toggleSeenModal();
  }

  handleDateUnknown() {
    this.setState((prevState) => ({ dateUnknown: !prevState.dateUnknown }));
    this.setState({ observedAt: '' });
  }

  handleDatePicked(event) {
    this.setState({ observedAt: event.target.value });
  }

  handleNoteChanged(event) {
    this.setState({ note: event.target.value });
  }

  toggleSeenModal() {
    this.setState((prevState) => ({ showSeenModal: !prevState.showSeenModal }));
  }

  toggleDetailsModal() {
    this.setState((prevState) => ({ showDetailsModal: !prevState.showDetailsModal }));
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
            <Modal title="Confirm observation" close={this.toggleSeenModal}>
              <form onSubmit={this.handleConfirm}>
                <div className="modal-body">
                  <p>
                    Are you sure you want to mark this bird as observed? This cannot be reversed.
                  </p>
                  <div className="d-flex align-items-end">
                    <div className="form-group">
                      <label>Date of observation</label>
                      <input type="date" className="form-control" value={this.state.observedAt} max={this.today} disabled={this.state.dateUnknown} onChange={this.handleDatePicked} />
                    </div>
                    <div className="form-check" id="date-unknown">
                      <input type="checkbox" className="form-check-input checkbox-input" onClick={this.handleDateUnknown} style={{ backgroundColor: 'white' }} />
                      <label className="form-check-label" style={{ lineHeight: '1.2rem' }}>I don&#39;t know</label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Note</label>
                    <textarea onChange={this.handleNoteChanged} className="form-control" placeholder="Add a note about your observation..." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary hover-pointer">
                    Confirm
                  </button>
                  <button type="button" className="btn btn-dark hover-pointer" onClick={this.toggleSeenModal}>
                    Close
                  </button>
                </div>
              </form>
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
