import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

/** @NOTE: React-Modal with Appii modal styling */
const styles = {
  content: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '125px',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translateX(-50%)',
    width: '570px',
    
    padding: 0,
    border: '1px solid #e6e5ed',
    borderRadius: '5px',
    backgroundColor: '#fff'
  },

  overlay: {
    position: 'fixed',
    zIndex: 200,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.55)'
  }
}

const Modal = ({ children, ...props }) => (
  <ReactModal style={styles} {...props}>
    {children}
  </ReactModal>
)

Modal.propTypes = {
  children: PropTypes.node
}

export default Modal
