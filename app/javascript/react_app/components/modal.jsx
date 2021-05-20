import React, { Component } from 'react';

class Modal extends Component {
  handleClick = () => {
    this.props.action();
    this.props.close()
  };

  checkBackdropClick = (event) => {
    if (event.target == event.currentTarget) this.props.close();
  }

  render () {
    const { title, confirmButtonText, close } = this.props;

    return (
      <div className="modal-component-backdrop" onClick={this.checkBackdropClick}>
        <div className="modal-component">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" aria-label="Close" onClick={close}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary hover-pointer" onClick={this.handleClick}>
                {confirmButtonText}
              </button>
              <button type="button" className="btn btn-secondary hover-pointer" onClick={close}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
