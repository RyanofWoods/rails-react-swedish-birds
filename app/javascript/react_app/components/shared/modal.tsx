import React from 'react'

import ReactPortal from './react_portal'

interface ModalProps {
  title: string
  close: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = (props) => {
  const {
    title, close, children
  } = props

  const checkBackdropClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <ReactPortal wrapperId='modal-container'>
      <div className='modal-component-backdrop' onClick={checkBackdropClick}>
        <div className='modal-component'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3 className='modal-title'>{title}</h3>
              <button type='button' className='close' aria-label='Close' onClick={close}>
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </ReactPortal>
  )
}

export default Modal
