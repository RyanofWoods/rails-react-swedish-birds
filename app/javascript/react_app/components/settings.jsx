import React, { Component } from "react";
import Modal from './modal';

class Settings extends Component {
  constructor(props) {
    super(props);

    // defaults
    let groupBy = 'family' 
    let confirmationOnSeen = true;

    if (localStorage.getItem("settings")) {
      confirmationOnSeen = localStorage.getItem("settings").groupBy || confirmationOnSeen;

      // cannot do shorthand || for this as it could be falsy
      if (localStorage.getItem("settings").confirmOnSeen !== undefined) {
        confirmationOnSeen = localStorage.getItem("settings").confirmOnSeen;
      }
    }
  
    this.state = {
      showModal: true,
      settings: { confirmationOnSeen, groupBy },
    };
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  settingsChange = (id, value) => {
    const settingsCpy = this.state.settings;
    settingsCpy[id] = value;
  
    this.setState({ settings: settingsCpy })
  }

  saveSettings = () => {
    console.log(this.state)
  }

  render() {
    const modalProps = {
      title: "Settings",
      confirmButtonText: "Save",
      close: this.toggleModal,
      action: this.saveSettings
    };

    const { confirmationOnSeen, groupBy } = this.state.settings;

    return (
      this.state.showModal && (
        <Modal {...modalProps}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" defaultChecked={confirmationOnSeen} onChange={(event) => this.settingsChange('confirm', event.target.checked)} />
            <label className="form-check-label" >
              Confirmation when marking a bird as seen?
            </label>
          </div>

          <label className="mr-2" >Group birds by:</label>
          <select defaultValue={groupBy} className="custom-select mb-3 mr-sm-2" onChange={(event) => this.settingsChange('groupBy', event.target.value)}>
            <option value="family">Family</option>
            <option value="order">Order</option>
          </select>
        </Modal>  
      )
    );
  }
};

export default Settings;
