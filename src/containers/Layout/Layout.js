import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Header from 'components/Header'
import Footer from 'components/Footer'
import RequestsBanner from 'components/RequestsBanner'
import './style.css'

class Layout extends Component {
  toggleEditMode = () => {
    const { editMode } = this.props
    this.props.setEditMode(!editMode)
  }

  saveChanges = () => {
    const { saveChanges } = this.props
    if (typeof saveChanges === 'function') {
      this.props.saveChanges()
    }
  }

  undoChanges = () => {
    const { undoChanges } = this.props
    this.props.setEditMode(false)
    if (typeof undoChanges === 'function') {
      this.props.undoChanges()
    }
  }

  render() {
    const {
      token,
      user,
      organisations,
      editMode,
      isLoggedIn,
      canEdit,
      editLabel,
      setMobileNavActive,
      isMobileNavActive,
      showFooter,
      responsive,
      hasNotification
    } = this.props

    const css = classNames(
      'Layout',
      { isEditMode: editMode },
      { hasNotification: hasNotification }
    )

    return (
      <div>
        <div className={css}>
          {hasNotification && <RequestsBanner requests={user.requests} />}

          <Header
            canEdit={canEdit}
            editLabel={editLabel}
            editMode={editMode}
            token={token}
            user={user}
            isLoggedIn={isLoggedIn}
            organisations={organisations}
            toggleEditMode={this.toggleEditMode}
            saveChanges={this.saveChanges}
            undoChanges={this.undoChanges}
            setMobileNavActive={setMobileNavActive}
            isMobileNavActive={isMobileNavActive}
            responsive={responsive}
            hasNotification={hasNotification}
          />
          {
            React.Children.map(this.props.children, (child) => {
              if (child && child.type !== 'div') {
                return React.cloneElement(child, {
                  editMode: this.props.editMode
                })
              }
              return child
            })
          }
        </div>

        {showFooter && <Footer />}
      </div>
    )
  }
}

Layout.defaultProps = {
  editLabel: 'Edit',
  showFooter: true,
  responsive: true
}

Layout.propTypes = {
  editMode: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool.isRequired,
  editLabel: PropTypes.string,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  organisations: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array
  ]),
  saveChanges: PropTypes.func,
  undoChanges: PropTypes.func,
  setMobileNavActive: PropTypes.func.isRequired,
  isMobileNavActive: PropTypes.bool,
  setEditMode: PropTypes.func.isRequired,
  showFooter: PropTypes.bool,
  responsive: PropTypes.bool,
  hasNotification: PropTypes.bool.isRequired
}

export default Layout
