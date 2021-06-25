import React from 'react';

const Modal = (props) => {
  const {
    title, confirmButtonText, action, close, children,
  } = props;

  const handleClick = () => {
    action();
    close();
  };

  const checkBackdropClick = (event) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <div className="modal-component-backdrop" onClick={checkBackdropClick}>
      <div className="modal-component">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button type="button" className="close" aria-label="Close" onClick={close}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            {
              action && (
                <button type="button" className="btn btn-primary hover-pointer" onClick={handleClick}>
                  {confirmButtonText}
                </button>
              )
            }
            <button type="button" className="btn btn-dark hover-pointer" onClick={close}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
