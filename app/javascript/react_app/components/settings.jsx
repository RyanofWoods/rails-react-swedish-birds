import React, { Component } from "react";
import Modal from './modal';

class Settings extends Component {
  state = {
    showModal: true,
    settings: { confirm: true,
                groupBy: 'order'
              }
  };

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

    const { confirm, groupBy } = this.state.settings;

    return (
      this.state.showModal && (
        <Modal {...modalProps}>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" defaultChecked={confirm} onChange={(event) => this.settingsChange('confirm', event.target.checked)} />
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
