import React, { Component } from "react";
import Modal from './modal';

class Settings extends Component {
  constructor(props) {
    super(props);

    // defaults
    let groupBy = 'family' 
    let seenConfirmation = true;

    if (localStorage.getItem("settings") !== null) {
      const parsedSettings = JSON.parse(localStorage.getItem("settings"))

      // set it if it exists, otherwise use default
      groupBy = parsedSettings.groupBy || groupBy;

      // cannot do shorthand || for this as it could be falsy
      if (parsedSettings.seenConfirmation !== undefined) {
        seenConfirmation = localStorage.getItem("settings").seenConfirmation;
      }
    }
  
    this.state = {
      showModal: true,
      settings: { seenConfirmation, groupBy },
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
    localStorage.setItem("settings", JSON.stringify(this.state.settings));
  }

  render() {
    const modalProps = {
      title: "Settings",
      confirmButtonText: "Save",
      close: this.toggleModal,
      action: this.saveSettings
    };

    const { seenConfirmation, groupBy } = this.state.settings;

    return (
      this.state.showModal && (
        <Modal {...modalProps}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" defaultChecked={seenConfirmation} onChange={(event) => this.settingsChange('seenConfirmation', event.target.checked)} />
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
