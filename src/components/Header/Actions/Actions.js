import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './style.css'

class Actions extends Component {
  renderLoading() {
    return (
      <ul className="changes-btns">
        <li>
          <img src="/assets/loading.gif" alt="loading" />
        </li>
      </ul>
    )
  }

  renderEditAction() {
    const { toggleEditMode, editLabel } = this.props

    return (
      <ul className="changes-btns">
        <li>
          <button
            className="border-btn"
            onClick={toggleEditMode}
          >
            {editLabel}
          </button>
        </li>
      </ul>
    )
  }

  renderActions() {
    const { undoChanges, saveChanges, isMobile } = this.props
    const cssButton = classNames('border-btn', { 'icon-btn': isMobile, 'remove-btn': isMobile })
    return (
      <ul className="changes-btns">
        <li>
          <button
            data-header-cancel="true"
            className={cssButton}
            onClick={undoChanges}
          >
            Cancel
          </button>
        </li>
        <li>
          <button
            data-header-save="true"
            className="border-btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const { canEdit, editMode, loading } = this.props

    if (loading) {
      return this.renderLoading()
    }

    if (editMode && canEdit) {
      return this.renderActions()
    }

    if (canEdit) {
      return this.renderEditAction()
    }

    return null
  }
}

Actions.defaultProps = {
  loading: false,
  canEdit: false,
  editMode: false
}

Actions.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  canEdit: PropTypes.bool,
  editLabel: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  toggleEditMode: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  undoChanges: PropTypes.func.isRequired
}

export default Actions
