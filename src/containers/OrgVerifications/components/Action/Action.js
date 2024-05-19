import React from 'react'
import PropTypes from 'prop-types'
import Form from 'components/Abstract/Form'
import './style.css'

class Action extends Form {
  onClickVerify = () => {
    const { id, onVerify } = this.props
    onVerify(id)
  }

  render() {
    const { showReason, reasonError, toggle, onConfirm } = this.props

    if (showReason) {
      return (
        <div className="Action">
          <div>
            <button
              data-cancel="true"
              className="btn dark-btn"
              onClick={toggle}
            >
              Cancel
            </button>
            <br />
            <button
              data-confirm="true"
              className="btn red-btn"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
          {reasonError &&
            <div className="message has-error">
              Please provide at least 1 reason for rejecting this claim
            </div>
          }
        </div>
      )
    }

    return (
      <div className="Action">
        <button
          data-verify="true"
          className="btn green-btn"
          onClick={this.onClickVerify}
        >
          Verify this claim
        </button>
        <button
          data-reject="true"
          className="btn red-btn"
          onClick={toggle}
        >
          Reject this claim
        </button>
      </div>
    )
  }
}

Action.propTypes = {
  id: PropTypes.number.isRequired,
  onVerify: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  reasonError: PropTypes.bool.isRequired,
  showReason: PropTypes.bool.isRequired
}

export default Action
