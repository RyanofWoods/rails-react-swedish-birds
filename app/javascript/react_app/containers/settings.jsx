import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveSettings } from "../actions";
import SETTING_DEFAULTS from "../setting_defaults";

class Settings extends Component {
  state = {
    settingsHasInitialized: false,
    settings: SETTING_DEFAULTS,
  }
  componentDidMount () {
    // override state.settings defaults with user settings
    const settingsCopy = { ...this.state.settings };

    for (const [key, value] of Object.entries(this.props.settings)) {
      settingsCopy[key] = value;
    }

    const newState = {
      settingsHasInitialized: true,
      settings: settingsCopy,
    };

    this.setState(newState);
  }

  settingsChange = (id, value) => {
    // do not need to force a re-render
    const settingsCopy = { ...this.state.settings};

    settingsCopy[id] = value;
    this.setState({ settings: settingsCopy })
  }

  saveSettings = (event) => {
    event.preventDefault();
    this.props.saveSettings(this.state.settings)
    alert("Settings saved!");
  }

  render() {
    const { groupBy, seenConfirmation } = this.state.settings;

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
          <label className="mr-2" >Group birds by:</label>
          <select value={groupBy} className="custom-select mb-3 mr-sm-2" onChange={(event) => this.settingsChange('groupBy', event.target.value)}>
            <option value="family">Family</option>
            <option value="order">Order</option>
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