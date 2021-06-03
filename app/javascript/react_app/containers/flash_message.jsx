/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearFlashMessage } from '../actions';

class FlashMessage extends Component {
  componentDidMount() {
    const unMountAlert = async () => {
      await setTimeout(() => {
        this.props.clearFlashMessage();
      }, 5000);
    };
    unMountAlert();
  }

  render() {
    const { message, isInfo } = this.props;

    return (
      <div className={`alert alert-dismissible ${isInfo ? 'alert-info' : ''} m-1`}>
        {message}

        <button type="button" className="close" aria-label="Close" onClick={this.props.clearFlashMessage}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ clearFlashMessage }, dispatch);

export default connect(null, mapDispatchToProps)(FlashMessage);
