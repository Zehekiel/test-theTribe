import React, { ReactElement } from 'react'
import './modal.css'

type ModalProps= {
  isShowing: boolean,
  hide: ()=> void,
  title: string,
  children: ReactElement
}

function Modal  ( props: ModalProps) {
  const { isShowing,  hide, title, children } = props
  
  return (
    <div className="modal-overlay" style={{ display: isShowing ? 'block' : 'none' }} >
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <h4>{title}</h4>
            <button
              type="button"
              className="modal-close-button"
              onClick={hide}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Modal
