/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { markSeen, setFlashMessage } from '../actions';
import Modal from '../components/modal';
import DetailsModal from '../components/details_modal';

class Bird extends Component {
  state = {
    showSeenModal: false,
    showDetailsModal: false
  }

  toggleSeenModal = () => {
    this.setState({ showSeenModal: !this.state.showSeenModal });
  }

  toggleDetailsModal = () => {
    this.setState({ showDetailsModal: !this.state.showDetailsModal });
  }

  handleMarkSeen = () => {
    this.props.markSeen(this.props.scientific_name);
    this.props.setFlashMessage("Bird marked as seen!");
  }

  render() {
    const {
      scientific_name, english_name, swedish_name, details, seen, seenConfirmation, markSeen, langPref,
    } = this.props;

    let seenClasses = 'list-item-start far fa-';
    seenClasses += seen ? 'check-square' : 'square hover-pointer hover-opacity';

    const iconProps = {
      className: seenClasses,
      // add click event only for birds not seen yet
      ...(!seen && seenConfirmation && { onClick: this.toggleSeenModal }), // confirmation modal
      ...(!seen && !seenConfirmation && { onClick: this.handleMarkSeen }), // no confirmation modal
    };

    const textContent = () => {
      switch (langPref) {
        case 'en':
          return <p className="list-item-grow">{english_name}</p>;
        case 'se':
          return <p className="list-item-grow">{swedish_name}</p>;
        default:
          return (
            <div className="list-item-grow">
              <p>{english_name}</p>
              <p>{swedish_name}</p>
            </div>
          );
      }
    };

    return (
      <li className="list-group-item">
        <i {...iconProps} />
        {textContent()}

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

const mapDispatchToProps = (dispatch) => bindActionCreators({ markSeen, setFlashMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Bird);
