import React, { Component } from "react";
import Modal from './modal';

class Settings extends Component {
  state = {
    showModal: true,
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    const modalProps = {
      title: 'Settings',
      confirmButtonText: 'Save',
      close: this.toggleModal,
      action: () => this.props.markSeen(scientific_name)
    };

    return (
      this.state.showModal && (
        <Modal {...modalProps}>
          <p>Save your settings?</p>
        </Modal>  
      )
    );
  }
};

export default Settings;
