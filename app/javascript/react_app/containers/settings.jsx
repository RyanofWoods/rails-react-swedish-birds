import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettings, setFlashMessage } from "../actions";
import BackLink from "../components/back_link";

class Settings extends Component {
  constructor(props) {
    super(props);

    // setting defaults overriden with user settings
    this.state = { settings: props.settings }
  }

  settingsChange = (id, value) => {
    // do not need to force a re-render
    const settingsCopy = { ...this.state.settings };

    settingsCopy[id] = value;
    this.setState({ settings: settingsCopy });
  }

  saveSettings = (event) => {
    event.preventDefault();
    this.props.saveSettings(this.state.settings);
    this.props.setFlashMessage("Settings saved!");
  }

  render() {
    const {
      groupBy, seenConfirmation, language, populationThreshold,
    } = this.state.settings;

    const populationText = () => {
      switch (+populationThreshold) {
        case 5:
          return 'Include birds to the rarest of less than 100 observations in Sweden.';
        case 6:
          return 'Include yearly guest birds which do not breed here.';
        case 7:
          return 'Include birds which may be seen only once, every year or several years.';
        case 8:
          return 'Include birds which may be seen once or a few times every 10 years.';
        case 9:
          return 'Include birds which have only been seen once or few times in Sweden ever.';
        default:
          return '';
      }
    };

    return (
      <form onSubmit={this.saveSettings}>
        <h2>Settings:</h2>

        <BackLink/>

        <div className="form-check my-3">
          <input className="form-check-input" type="checkbox" checked={seenConfirmation} value={seenConfirmation} onChange={(event) => this.settingsChange('seenConfirmation', event.target.checked)} />
          <label className="form-check-label">Confirmation when marking a bird as seen? </label>
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

        <div className="form-group">
          <label className="mr-2">Population threshold:</label>
          <p><em>{populationText()}</em></p>
          <input value={populationThreshold} min="5" max="9" type="range" className="form-range w-100 hover-pointer" onChange={(event) => this.settingsChange('populationThreshold', +event.target.value)}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settingsData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ saveSettings, setFlashMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
