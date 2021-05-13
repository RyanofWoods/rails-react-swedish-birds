import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveSettings } from "../actions";
import SETTING_DEFAULTS from "../setting_defaults";
import Modal from "../components/modal";

class Settings extends Component {
  constructor(props) {
    super(props);

    // setting defaults overriden with user settings
    this.state = this.loadSettings();;    
  }

  loadSettings() {
    // load setting defaults
    const settingsCopy = { ...SETTING_DEFAULTS };
    
    // override settings defaults with user settings
    for (const [key, value] of Object.entries(this.props.settings)) {
      settingsCopy[key] = value;
    }

    return { settings: settingsCopy};
  }

  settingsChange = (id, value) => {
    // do not need to force a re-render
    const settingsCopy = { ...this.state.settings };

    settingsCopy[id] = value;
    this.setState({ settings: settingsCopy });
  };

  saveSettings = (event) => {
    event.preventDefault();
    this.props.saveSettings(this.state.settings);
    alert("Settings saved!");
  };

  render() {
    const { groupBy, seenConfirmation, language } = this.state.settings;

    return (
      <form onSubmit={this.saveSettings}>
        <h2>Settings:</h2>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" checked={seenConfirmation} value={seenConfirmation} onChange={(event) => this.settingsChange('seenConfirmation', event.target.checked)} />
          <label className="form-check-label" >
            Confirmation when marking a bird as seen?
          </label>
        </div>

        <div className="form-group">
          <label className="mr-2">Group birds by:</label>
          <select value={groupBy} className="custom-select mb-3 mr-sm-2" onChange={(event) => this.settingsChange('groupBy', event.target.value)}>
            <option value="family">Family</option>
            <option value="order">Order</option>
          </select>
        </div>

        <div className="form-group">
          <label className="mr-2">Language preference with names:</label>
          <select value={language} className="custom-select mb-3 mr-sm-2" onChange={(event) => this.settingsChange('language', event.target.value)}>
            <option value="en">English</option>
            <option value="se">Swedish</option>
            <option value="both">Both</option>
          </select>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    settings: state.settingsData
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveSettings }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
