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
    return (
      this.state.showModal && (
        <Modal
          title="Settings"
          confirmButtonText={"Save"}
          close={this.toggleModal}
          action={() => this.props.markSeen(scientific_name)}
        >
          <p>Save your settings?</p>
        </Modal>
        
      )
    );
  }
};

export default Settings;
